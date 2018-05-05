package db4

import kotlin.reflect.KClass

enum class RowState {
    DEFAULT,
    UPDATED,
    INSERTED,
}

open class DataTable {
    class Column(var name: String, var kClass: KClass<*>?)

    class ColumnCollection : AbstractList<Column>() {
        override fun get(index: Int): Column = cols[index]

        override val size: Int
            get() = cols.size
        val cols: MutableList<Column> = mutableListOf()
        private val names: MutableMap<String, Int> = mutableMapOf()

        fun add(fieldName: String, kClass: KClass<*>? = null) {
            val col = Column(fieldName, kClass)
            names[fieldName.toUpperCase()] = cols.size
            cols.add(col)
        }

        fun lookup(fieldName: String): Int = names.getOrElse(fieldName.toUpperCase(), { throw RuntimeException("field [$fieldName] not found") })
        fun exists(fieldName: String): Boolean = names.containsKey(fieldName.toUpperCase())

    }

    open val Rows: RowCollection<out Row> = RowCollection<Row>()

    open fun newInst(): Row = Row()

    inner class RowCollection<T : Row> : AbstractList<T>() {
        override fun get(index: Int): T = rows[index]

        override val size: Int
            get() = rows.size

        val rows: MutableList<T> = mutableListOf()

        fun add(vararg values: Any?): T {
            val row: T = newInst() as T
            row.tab = this@DataTable
            row.init()
            rows.add(row)
            row.assign(values)
            row.oldVals.clear()
            return row
        }

    }

    class OldValue(val value: Any?) {}

    open class Row {

        lateinit var tab: DataTable
        var state: RowState = RowState.INSERTED

        val vals: MutableList<Any?> = mutableListOf()

        fun init() {
            fillEmpty(vals)
        }

        fun assign(values: Array<out Any?>) {
            if (values.isEmpty())
                return
            if (values.size > tab.Columns.cols.size)
                throw RuntimeException("too many fields specified. Table have less columns")

            for (idx in values.indices)
                this[idx] = values[idx]

        }

        internal val oldVals: MutableList<OldValue?> = mutableListOf()

        internal val old = Old()

        inner class Old {

            operator fun <T> get(fieldName: String): T? {
                return this[tab.Columns.lookup(fieldName)]
            }

            operator fun <T> get(idx: Int): T? {
                if (!hasOld(idx)) return this@Row[idx]
                return oldVals[idx]!!.value as T?;
            }

            operator fun set(idx: Int, value: OldValue) {
                fillEmpty(oldVals)
                oldVals[idx] = value
            }

        }

        fun hasOld(fieldName: String): Boolean = hasOld(tab.Columns.lookup(fieldName))
        fun hasOld(idx: Int): Boolean = idx < oldVals.size && oldVals[idx] != null


        private fun <T> fillEmpty(mutableList: MutableList<T?>) {
            while (mutableList.size < tab.Columns.cols.size)
                mutableList.add(null)
        }

        operator fun <T> get(idx: Int): T? = if (idx >= vals.size) null else vals[idx] as T?


        operator fun set(idx: Int, value: Any?) {
            val column = tab.Columns.cols[idx]
            if (column.kClass != null) {
                if (value != null && value::class != column.kClass)
                    throw RuntimeException("bad type column ${column.name} expected:${column.kClass} actual:${value::class}")
            } else {
                if (value != null)
                    column.kClass = value::class
            }
            if (!hasOld(idx))
                old[idx] = OldValue(get(idx))
            if (state == RowState.DEFAULT)
                state = RowState.UPDATED
            fillEmpty(vals)
            vals[idx] = value
        }

        operator fun set(fieldName: String, value: Any?) {
            this[tab.Columns.lookup(fieldName)] = value
        }

        operator fun <T> get(fieldName: String): T? = get(tab.Columns.lookup(fieldName)) as T?

        fun acceptChanges() {
            oldVals.clear()
            state = RowState.DEFAULT
        }

        fun remove() {
            val indexOf = tab.Rows.rows.indexOf(this)
            tab.Rows.rows.removeAt(indexOf)
            tab.DeletedRows.add(this)
        }

    }


    val Columns = ColumnCollection()

    val DeletedRows: MutableList<Row> = mutableListOf()
    fun acceptChanges() {
        DeletedRows.clear()
        Rows.forEach({ row ->
            row.acceptChanges()
        })
    }

    var name: String? = null
    var primaryKey: List<String> = listOf()

}

fun DataTable.ColumnCollection.print() {
    for (idx in cols.indices) {
        print(cols[idx].name)
        print("\t")
    }
    println()
}

fun DataTable.Row.print() {

    vals.forEach({
        print(it)
        print("\t")
    })
    println()


}

fun DataTable.printInfo(): DataTable {
    val table = this
    println("table: ${table.name} primaryKey: ${table.primaryKey} record count: ${table.Rows.size}")
    table.Columns.print()
    return table
}

fun DataTable.print(): DataTable {
    val table = this
    table.printInfo();
    table.Rows.forEach({ it.print() })
    return table
}

fun DataTable.printHeaderAndData(): DataTable {
    this.Columns.print()
    this.Rows.forEach({ it.print() })
    return this
}
