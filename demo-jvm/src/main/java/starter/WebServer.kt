package starter

import db4.DataAdapter
import db4.DataTable
import java.sql.Connection
import java.sql.DriverManager

fun <T> syncDb(block: (conn: Connection) -> T): T {
    Class.forName("org.firebirdsql.jdbc.FBDriver")
    val conn = DriverManager.getConnection("jdbc:firebirdsql://srvga.pulitori.local:3051/d:/Database/ga2/GESTIONEAZIENDALE.fdb", "sysdba", "masterkey");
    //synchronized(lock) {

    try {
        return block(conn)
    } finally {
        conn.close()
    }
//    }
}


class WebServer {
    companion object {
        @JvmStatic
        fun main(args: Array<String>) {
            println("Starting webserver...")
            val httpServer = HttpServer()

            httpServer.handlers["/api1/login"] = {
                val username = it.params["username"]
                val password = it.params["password"]
                syncDb { conn ->

                    val utente = DataAdapter(conn, ("select * from utenti where username='$username' and password='$password'")).fill(DataTable())
                    if (utente.Rows.count() == 1) {
                        val token = utente.Rows[0].get<Number>("IDUTENTE")
                        val idCollaboratore = utente.Rows[0].get<Any>("IDCOLLABORATORE")
                        val idSocieta = utente.Rows[0].get<Any>("IDSOCIETA")
                        it.response("success=1\n" +
                                "idCollaboratore=$idCollaboratore\n" +
                                "idSocieta=$idSocieta\n" +
                                "token=t-$token")
                    } else
                        it.response("success=0")

                }
                //NanoHTTPD.newFixedLengthResponse(NanoHTTPD.Response.Status.BAD_REQUEST, MIME_PLAINTEXT, "you must specify number and message")
            }
            httpServer.handlers["/api1/bbx_modello"] = {
                val idModello = it.params["idModello"]
                syncDb { conn ->
                    val modello = DataAdapter(conn, ("select * from bbx_modelli where idmodello=$idModello")).fill(DataTable())
                    if (modello.Rows.count() == 1) {
                        val dsbfm = modello.Rows[0].get<String>("dsbfm") ?: ""
                        it.response(dsbfm)
                    } else
                        it.response("")
                }
            }
            httpServer.start()
            while (true)
                Thread.sleep(10000)
        }
    }
}
