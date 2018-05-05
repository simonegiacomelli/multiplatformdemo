import fragment.WidgetManager
import pages.LogWidget
import pages.MainWidget
import kotlin.browser.document

fun framework_entry_point(){
    //MainWidget.init.startup(document.getElementById("loading")!!)
    //MainWidget.init.startup(document.getElementById("loading")!!)
    val app = WidgetManager(document.getElementById("loading")!!)
    app.handleBack()
//    app.create(LogWidget())
//            .apply { whenReady { log("ciaoo") } }
//            .apply { whenReady { log("ciaoo2") } }
//            .show()

//    app.create(MainWidget()).show()
    app.create(LogWidget()).show()

}

//fun main(args: Array<String>) {
//    framework_entry_point()
//}
//
