import fragment.WidgetManager
import pages.LogWidget
import pages.MainWidget
import kotlin.browser.document


fun main(args: Array<String>) {
    //MainWidget.init.startup(document.getElementById("loading")!!)
    //MainWidget.init.startup(document.getElementById("loading")!!)
    val app = WidgetManager(document.getElementById("loading")!!)
    app.handleBack()
    app.create(LogWidget())
            .apply { whenReady { log("ciaoo") } }
            .apply { whenReady { log("ciaoo2") } }
            .show()


}

