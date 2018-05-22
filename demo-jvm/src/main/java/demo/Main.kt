package demo

import db4common.`DataTableTest`
import demo.common.FancyText
import java.sql.DriverManager

object Main {
    @JvmStatic
    fun main(args: Array<String>) {

        DataTableTest.go()

        val fancyText = FancyText("Main")
        val string = fancyText.toString()
        println(string)

        val conn = DriverManager.getConnection("jdbc:h2:~/h2/kotlin/ktframework;AUTO_SERVER=TRUE", "sa", "");

        try {
            conn.createStatement().execute("create table log (\n" +
                    "  name varchar(40) ,\n" +
                    "  id integer,\n" +
                    "  dtecho timestamp,\n" +
                    "  dtcreate timestamp,\n" +
                    "  counter integer,\n" +
                    "primary key (name,id) )\n");
        } catch (ex: Exception) {
            println(ex)
        }


        conn.close()
    }
}