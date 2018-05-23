package starter

import db4.DataAdapter
import db4.DataTable
import db4.DataTableTyped
import db4.TypedRow
import fi.iki.elonen.NanoHTTPD
import java.io.File
import java.nio.file.Files
import java.nio.file.Paths
import java.sql.Connection
import java.sql.DriverManager
import java.util.*

fun <T> syncDb(block: (conn: Connection) -> T): T {
    Class.forName("org.firebirdsql.jdbc.FBDriver")
    val conn = DriverManager.getConnection("jdbc:firebirdsql://srvga.pulitori.local:3051/d:/Database/ga2/GESTIONEAZIENDALE.fdb", "sysdba", "masterkey");

    try {
        return block(conn)
    } finally {
        conn.close()
    }

//    conn.use { conn ->
//        return block(conn)
//    }

}


private fun NanoHTTPD.IHTTPSession.syncDbAuth(block: (conn: Connection) -> NanoHTTPD.Response): NanoHTTPD.Response {
    return syncDb {
        val token = this.params["token"]
        val bbxToken = DataAdapter(it, ("select * from BBX_TOKEN where ID='$token' ")).fill(DataTable())
        if (bbxToken.Rows.count() != 1)
            this.forbidden()
        else
            block(it)
    }
}

class BbxToken : TypedRow() {
    var idSocieta: String        by notNullVar
    var idCollaboratore: Int     by notNullVar
    var idUtente: Int     by notNullVar
}

data class Context(val conn: Connection, val bbxToken: BbxToken)

private fun NanoHTTPD.IHTTPSession.syncDbExt(block: (conn: Context) -> NanoHTTPD.Response): NanoHTTPD.Response {
    return syncDb {
        val token = this.params["token"]
        val bbxToken = DataTableTyped({ BbxToken() })
        DataAdapter(it, ("select * from BBX_TOKEN where ID='$token' ")).fill(bbxToken)
        if (bbxToken.Rows.count() == 1)
            block(Context(it, bbxToken.Rows[0]))
        else
            this.forbidden()
    }
}

class WebServer {
    companion object {
        fun getocumenti_bbx_utenti(idUtente: String): String {
            return "C:\\documenti_bbx_utenti\\$idUtente";
        }

        @JvmStatic
        fun main(args: Array<String>) {
            val port = 8083
            println("Starting web server 1.1 on port $port...")
            val httpServer = HttpServer(port)

            httpServer.handlers["/api1/login"] = {
                val username = it.params["username"]
                val password = it.params["password"]
                syncDb { conn ->

                    val utente = DataAdapter(conn, ("select * from utenti where username='$username' and password='$password'")).fill(DataTable())
                    if (utente.Rows.count() == 1) {
                        val token = "t-" + UUID.randomUUID().toString()
                        val row1 = utente.Rows[0]
                        val idUtente = row1.get<Any>("IDUTENTE")
                        val idCollaboratore = row1.get<Any>("IDCOLLABORATORE")
                        val idSocieta = row1.get<Any>("IDSOCIETA")
                        val content = "success=1\n" +
                                "idUtente=$idUtente\n" +
                                "idCollaboratore=$idCollaboratore\n" +
                                "idSocieta=$idSocieta\n" +
                                "token=$token"
                        val dataAdapter = DataAdapter(conn, ("select first 0 * from BBX_TOKEN "))
                        val tokenTab = dataAdapter.fill(DataTable())
                        val row = tokenTab.Rows.add()
                        row["ID"] = token
                        row["IDUTENTE"] = idUtente.toString().toInt()
                        row["IDSOCIETA"] = row1.get<String>("IDSOCIETA")
                        row["IDCOLLABORATORE"] = row1.get<Int>("IDCOLLABORATORE")
                        row["DTCREAZIONE"] = java.sql.Timestamp(java.util.Date().time)
                        row["DSDATA"] = content;
                        dataAdapter.save(tokenTab)


                        it.response(content)

                    } else
                        it.response("success=0")

                }
                //NanoHTTPD.newFixedLengthResponse(NanoHTTPD.Response.Status.BAD_REQUEST, MIME_PLAINTEXT, "you must specify number and message")
            }
            httpServer.handlers["/api1/bbx_modello"] = {
                val idModello = it.params["idModello"]
                it.syncDbExt { ctx ->
                    val modello = DataAdapter(ctx.conn, ("select * from bbx_modelli where idmodello=$idModello")).fill(DataTable())
                    if (modello.Rows.count() == 1) {
                        val dsbfm = modello.Rows[0].get<String>("dsbfm") ?: ""
                        it.response(dsbfm)
                    } else
                        it.response("")
                }
            }

            httpServer.handlers["/api1/bbx_modelli_utenti"] = {
                it.syncDbExt { ctx ->
                    val table = DataAdapter(ctx.conn, ("select m.idmodello,m.DSTITOLO from bbx_modelli_utenti mu left outer join bbx_modelli m on mu.idmodello = m.idmodello\n" +
                            "where mu.idutente=${ctx.bbxToken.idUtente}")).fill(DataTable())
                    it.response(tableToBbxString(table))
                }
            }
            httpServer.handlers["/api1/bbx_modelli_dinamici"] = {
                it.syncDbExt { ctx ->
                    val table = DataAdapter(ctx.conn, ("select IDMODELLODINAMICO,DSTITOLO from BBX_MODELLIDINAMICI  \n" +
                            "where FLCHIUSO='NO' AND IDMATRICOLA = ${ctx.bbxToken.idCollaboratore}")).fill(DataTable())
                    it.response(tableToBbxString(table))
                }
            }
            httpServer.handlers["/api1/menu"] = {
                it.syncDbExt { ctx ->
                    val table = DataAdapter(ctx.conn, ("select DSVALORE from INI WHERE dspath='ga' and DSSEZIONE='DataManager' and DSCHIAVE='menu' ")).fill(DataTable())
                    it.response(table.Rows[0].get<String>(0)!!)
                }
            }
            httpServer.handlers["/api1/docs_utente"] = {
                it.syncDbExt { ctx ->
                    val idUtente = ctx.bbxToken.idUtente.toString();
                    //DirOFile|Name|Size|LastModified
                    //F|ordine-fornitore-45566.pdf|111513|2018-03-07-16-08-44
                    val tab = DataTable()
                    tab.Columns.add("DirOFile", String::class)
                    tab.Columns.add("Name", String::class)
                    tab.Columns.add("Size", Long::class)
                    tab.Columns.add("LastModified", String::class)

                    Files.list(Paths.get(getocumenti_bbx_utenti(idUtente)))
                            .forEach {
                                val file = it.toFile()
                                tab.Rows.add(if (file.isDirectory) "D" else "F"
                                        , file.name, file.length(), "2000-12-31-23-58-59")
                            }

                    it.response(tableToBbxString(tab))
                }
            }
            httpServer.handlers["/api1/docs_utente_download"] = {
                it.syncDbExt { ctx ->
                    val idUtente = ctx.bbxToken.idUtente.toString()
                    val path = it.params["path"]!!
                    val file = File(getocumenti_bbx_utenti(idUtente), path)
                    val inputstream = file.inputStream()
                    val response = NanoHTTPD.newChunkedResponse(NanoHTTPD.Response.Status.OK, "application/octet-stream", inputstream)
                    //newFixedLengthResponse.addHeader("Access-Control-Allow-Origin","*");
                    print("filename=${file.name}")
                    response.addHeader("Content-Disposition", "attachment; filename=\"${file.name}\"")
                    response
                }
            }
            httpServer.start()
            while (true)
                Thread.sleep(10000)
        }

        private fun tableToBbxString(table: DataTable): String {
            val result = StringBuilder()
            result.append(table.Columns.map { it.name }.joinToString("|"))
            result.append("\n")
            table.Rows.forEach {
                result.append(it.vals.map { "$it" }.joinToString("|"))
                result.append("\n")
            }
            return result.toString()
        }
    }
}

