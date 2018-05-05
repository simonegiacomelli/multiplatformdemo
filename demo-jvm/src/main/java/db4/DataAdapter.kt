package db4

import java.sql.Connection
import java.sql.ResultSet
import kotlin.reflect.KClass


class DataAdapter(val connection: Connection) {
    var sql: String? = null

    constructor(connection: Connection, sql: String) : this(connection) {
        this.sql = sql
    }

    fun fill(table: DataTable): DataTable {
        val rs = connection.createStatement().executeQuery(sql!!);
        return fill(rs, table)
    }

    fun fill(rs: ResultSet, table: DataTable): DataTable {

        table.name = rs.metaData.getTableName(1)

        val meta = fillNoMeta(connection.metaData.getPrimaryKeys(null, null, table.name), DataTable())
        //meta.print()
        val colNames = arrayOf("ORDINAL_POSITION", "key_seq")
        val pkOrder = colNames.first { meta.Columns.exists(it) }
        val list = meta.Rows
                .sortedBy { it.get<Number>(pkOrder)!!.toInt() }
                .map { it.get<String>("COLUMN_NAME")!! }

        table.primaryKey = list

        return fillNoMeta(rs, table)
    }

    private fun fillNoMeta(rs: ResultSet, table: DataTable): DataTable {
        for (idx in 1..rs.metaData.columnCount) {
            val cn = rs.metaData.getColumnName(idx)
            val ccn = rs.metaData.getColumnClassName(idx)
            //val ctn = rs.metaData.getColumnTypeName(idx)
            //val ct = rs.metaData.getColumnType(idx)
            //println("$cn $ccn $ctn $ct")
            //val type: KClass<*> = Class.forName(ccn).kotlin

            table.Columns.add(cn)
        }


        while (rs.next()) {

            val row = table.Rows.add()

            for (idx in 1..rs.metaData.columnCount) {
                val value: Any? = rs.getObject(idx)
                row[idx - 1] = value
            }
        }
        for (idx in 1..rs.metaData.columnCount) {
            val column = table.Columns[idx - 1]
            if (column.kClass == null) {
                val ccn = rs.metaData.getColumnClassName(idx)
                val type: KClass<*> = Class.forName(ccn).kotlin
                column.kClass = type
            }

        }

        table.acceptChanges()
        return table
    }

    fun save(table: DataTable) {

        class InsStuff {
            val params = StringBuilder()

            init {
                for (idx in 0 until table.Columns.size)
                    params.append("?,")
                params.setLength(params.length - 1)
            }

            val sql = "insert into ${table.name} values(${params})"
            val statement = connection.prepareStatement(sql)
            fun doRow(row: DataTable.Row) {
                //println(sql)
                for (idx in 0 until table.Columns.size)
                    statement.setObject(idx + 1, row[idx])
                statement.execute()
                row.acceptChanges()
            }
        }

        open class CommonStuff {
            val par = mutableListOf<Any?>()
            val sql = StringBuilder()
            fun clear() {
                par.clear(); sql.setLength(0)
            }

            fun appendWherePk(row: DataTable.Row) {
                sql.append(" where ")
                for (fieldName in table.primaryKey) {
                    sql.append("$fieldName=? and ")
                    if (row.hasOld(fieldName))
                        par.add(row.old[fieldName])
                    else
                        par.add(row[fieldName])
                }
                sql.setLength(sql.length - 5)
            }

        }

        class UpdStuff : CommonStuff() {
            fun doRow(row: DataTable.Row) {

                clear()
                sql.append("update ${table.name} set ")

                for (idx in 0 until table.Columns.size)
                    if (row.hasOld(idx)) {
                        val fieldName = table.Columns[idx].name
                        sql.append("$fieldName=?,")
                        par.add(row[idx])
                    }
                sql.setLength(sql.length - 1)
                appendWherePk(row)
                //print(sql)
                val stat = connection.prepareStatement(sql.toString())
                for (idx in par.indices)
                    stat.setObject(idx + 1, par[idx])
                stat.executeUpdate()
                row.acceptChanges()
            }

        }

        class DelStuff : CommonStuff() {
            fun doRow(row: DataTable.Row) {

                clear()
                sql.append("delete from ${table.name} ")

                appendWherePk(row)

                val stat = connection.prepareStatement(sql.toString())
                for (idx in par.indices)
                    stat.setObject(idx + 1, par[idx])
                stat.execute()
            }
        }


        val ins = InsStuff()
        val upd = UpdStuff()
        val del = DelStuff()
        table.Rows.forEach({
            when (it.state) {
                RowState.INSERTED -> ins.doRow(it)
                RowState.UPDATED -> upd.doRow(it)
            }
        })
        table.DeletedRows.forEach({
            del.doRow(it)
        })
        table.DeletedRows.clear()
    }


}

