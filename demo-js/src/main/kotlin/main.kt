import fragment.WidgetManager
import pages.BbxForm
import pages.HttpRequestWidget
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
    val bfm = "nomeapplicazione=Richiesta di permesso§\n" +
            "titolo=Richiesta di permesso§\n" +
            "separatore=|§\n" +
            "invianomi=no§\n" +
            "prefisso=64.§\n" +
            "pulisciform=si§\n" +
            "multirecord=no§\n" +
            "autochiusura=si§\n" +
            "invio=classe=InvioDatiGaCgi|u=http://bbx.pulitori.it:82/bbx/scripts/ga/gestioneaziendale.exe?|class=TDtmBbxSend|proc=Send§\n" +
            "campo1=classe=CampoData|filtro=DATE|formato=yyyy-MM-dd|nome=PERMESSOAL|obbligatorio=si|etichetta=Permesso per il giorno|pulisci=si§\n" +
            "campo2=classe=CampoTesto|nome=DALLEORE|obbligatorio=si|etichetta=Dalle ore|lunghezza=5|pulisci=si§\n" +
            "campo3=classe=CampoTesto|filtro=NUMERIC|nome=ORE|obbligatorio=si|etichetta=N. di ore di permesso|pulisci=si§\n" +
            "campo4=classe=CampoDatabase|filtro=INTEGER|nome=IDCAUSALE|obbligatorio=si|etichetta=Causale per il permesso|tabella=CausaliPermesso|pulisci=si§\n" +
            "campo5=classe=CampoTesto|nome=NOTE|obbligatorio=no|etichetta=Note|lunghezza=250§"
    app.create(BbxForm(bfm)).show()

}

//fun main(args: Array<String>) {
//    framework_entry_point()
//}
//
