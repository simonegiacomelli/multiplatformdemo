import fragment.WidgetManager
import pages.BbxForm
import pages.ElementsList
import pages.bfm
import kotlin.browser.document

fun framework_entry_point() {
    //MainWidget.init.startup(document.getElementById("loading")!!)
    //MainWidget.init.startup(document.getElementById("loading")!!)
    val app = WidgetManager(document.getElementById("loading")!!)
    app.handleBack()
//    app.create(LogWidget())
//            .apply { whenReady { log("ciaoo") } }
//            .apply { whenReady { log("ciaoo2") } }
//            .show()

//    app.create(MainWidget()).show()
//    app.create(LogWidget()).show()
    //app.create(HttpRequestWidget()).show()

    //val bfmUrl = "http://servizi.pulitori.it/api1/bbx_modello?&idUtente=1&user_matricola=666&user_idsocieta=PUL001&token=t-0a29c0d6-57ab-49ac-a3ab-62cda09768ad&idModello=64"
    //app.create(BbxForm(bfm)).show()
    app.create(ElementsList()).show()

}

//fun main(args: Array<String>) {
//    framework_entry_point()
//}
//
