package db4common

import kotlin.reflect.KClass

object DataTableTest {
    fun go() {
        val tab = DataTable()
        tab.Columns.add("DirOFile", String::class)
        tab.Columns.add("Name", String::class)
        val kClass: KClass<*> = Long::class
        tab.Columns.add("Size", kClass)
        //tab.Columns.add("LastModified", Date::class)


        for (idx in 1..10)
            tab.Rows.add("F", "file-$idx", (idx * 100).toLong())

        //tab.print()
        println(tab.save())
    }
}