package pages

import fragment.HttpRequestDebug
import fragment.ResourceWidget
import org.w3c.dom.*
import kotlin.browser.document
import kotlin.browser.window
import kotlin.js.Promise

class BbxForm(val bfm: String) : ResourceWidget() {
    override val resourceName: String
        get() = "pages/BbxForm.html"

    val btnInvio: HTMLButtonElement by docu
    val controls: HTMLDivElement by docu

    val conf: Map<String, String> by lazy { decodeMap(bfm, "§") }


    val titolo: String by lazy { conf.nn("titolo") }
    val prefisso: String by lazy { conf.nn("prefisso") }
    val invioSeparatore: String by lazy { conf.nn("separatore") }
    val invioConf: Map<String, String> by lazy { decodeMap(conf.nn("invio"), "|") }

    val invioClasse: String by lazy { invioConf.nn("classe") }
    val invio: InvioDati by lazy {
        val res = when (invioClasse) {
            "InvioDatiGaCgi" -> InvioDatiGaCgi()
            "InvioDatiBbxCgi" -> InvioDatiBbxCgi()
            else -> InvioDatiNotImpl()
        }
        res.invioConf = invioConf
        res
    }

    val campi = mutableListOf<Campo>()

    override fun htmlLoaded() {
        //onClick("close", { close() })
        println("starting with $bfm");

        qsh("titolo").innerHTML = titolo

        //js("debugger;")
        if (invio.ok())
            btnInvio.onclick = {
                invio.datiForm = datiForm()
                window.alert("${invio.datiForm}")
            }
        else
            btnInvio.innerHTML = "Metodo di invio non supportato! [$invioClasse]"

        for (idx in 1..99) {
            val key = "campo$idx"
            if (!conf.containsKey(key)) break
            val confString = conf.nn(key)
            val confCampo = decodeMap(confString, "|")
            val campo = campoFactory(confCampo)
            campo.confString = confString
            campo.conf = confCampo
            campo.widget = this;
            campo.configuraBase()
            campi.add(campo)
            controls.appendChild(campo.componente())
            controls.appendChild(document.createElement("br"))
            campo.clear()

        }

    }

    private fun campoFactory(confCampo: Map<String, String>): Campo =
            when (confCampo.nn("classe")) {
                "CampoLabel" -> CampoLabel()
                "CampoTesto" -> CampoTesto()
                "CampoDatabase" -> CampoDatabase()
                "CampoDocsOnline" -> CampoDocsOnline()
                "CampoSeparatore" -> CampoSeparatore()
                "CampoData" -> CampoData()
                "CampoRadio" -> CampoRadio()
                else -> CampoDebug()
            }

    private fun datiForm(): String {
        val ris = StringBuilder()
        ris.append(prefisso)

        campi.filter { !it.skip }.forEach {
            ris.append(it.valore)
            ris.append(invioSeparatore)
        }
        return ris.toString()
    }


}

private fun Map<String, String>.nn(key: String): String = this[key] ?: ""

abstract class InvioDati {

    lateinit var invioConf: Map<String, String>

    var datiForm: String = ""

    fun datiDebug(): String = "todo"

    abstract fun invia(): Promise<String>

    open fun ok() = true
}

class InvioDatiNotImpl : InvioDati() {
    override fun invia(): Promise<String> = throw Exception()
    override fun ok() = false
}

class InvioDatiGaCgi : InvioDati() {

    override fun invia(): Promise<String> {
        //http://servizi.pulitori.it/gaweb/TDtmBbxSend/Send?body=52.|||10943||||
        val cl = invioConf["class"];
        val proc = invioConf["proc"];
        val url = invioConf["u"];
        //String urlInvioDati = "${url}class=${cl}&proc=${proc}&body=$datiForm"; //ga vero
        val urlInvioDati = "http://servizi.pulitori.it/ga/gestioneaziendale.exe?class=${cl}&proc=${proc}&body=$datiForm&${datiDebug()}"; //gaweb(timbratori)
        return HttpRequestDebug.getString(urlInvioDati);
    }
}

class InvioDatiBbxCgi : InvioDati() {

    override fun invia(): Promise<String> {
        //http://servizi.pulitori.it/gaweb/TDtmBbxSend/Send?body=52.|||10943||||
        val cl = invioConf["c"];
        val proc = invioConf["p"];
        val urlInvioDati = "http://bbx.pulitori.it:82/bbx/scripts/bbxcgi.exe?class=$cl&procedure=$proc&body=$datiForm&${datiDebug()}";
        return HttpRequestDebug.getString(urlInvioDati);
    }
}

fun decodeMap(content: String, separator: String): Map<String, String> {
    val c2 = content.replace("\r", "")
    val c3 = c2.replace("\n", "")

    val res = mutableMapOf<String, String>()

    c3.split(separator).forEach {
        val keyVal = it.split("=", limit = 2)
        if (keyVal.size == 2)
            res[keyVal[0]] = keyVal[1]

    }

    return res
}


abstract class Campo {

    fun clear() {
        valore = valoreDefault
    }

    lateinit var confString: String
    lateinit var conf: Map<String, String>
    lateinit var widget: BbxForm

    val etichetta: String by lazy { conf.nn("etichetta") }
    val nome: String by lazy { conf.nn("nome") }
    val obbligatorio: Boolean by lazy { conf.nn("obbligatorio") == "si" }
    val valoreDefault: String by lazy { conf.nn("default") }
    val daPulire: Boolean by lazy { conf.nn("pulisci") == "si" }

    lateinit open var valore: String


    fun configuraBase() {
        valore = valoreDefault
        configura()
    }

    abstract fun configura()
    abstract fun componente(): Node

    open val motivoInvalidita: String? get() = null
    open val skip: Boolean get() = false
    open fun focus() {}

}

class CampoLabel : Campo() {
    override fun configura() {

    }

    override fun componente(): Node = document.createElement("span").apply { innerHTML = etichetta }

}

open class CampoDebug : Campo() {
    override fun configura() {
        conf.forEach { println("debug: ${it.key}=${it.value}") }
    }

    override fun componente(): Node = document.createElement("span").apply { innerHTML = "DEBUG: ${conf.nn("classe")} ${conf.nn("etichetta")}" }

}

class CampoSeparatore : Campo() {
    override fun configura() {}
    override fun componente(): Node = document.createElement("br")
    override val skip: Boolean get() = true
}

class CampoRadio : Campo() {
    val radios = mutableListOf<HTMLInputElement>()
    override fun configura() {}
    override fun componente(): Node {
        val valStr = confString.substringAfter("||")
        val container = document.createElement("div") as HTMLDivElement
        val span = document.createElement("span") as HTMLSpanElement
        span.innerHTML = etichetta
        container.appendChild(span)
        container.appendChild(document.createElement("br"))
        var map = decodeMap(valStr, "|")
        radios.clear()
        map.forEach {
            val radio = document.createElement("input") as HTMLInputElement
            radio.type = "radio"
            radios.add(radio)
            radio.name = nome
            radio.value = it.key

            container.append(radio)
            container.append(document.createTextNode(it.value))
            container.append(document.createElement("br"))
        }
        radios.first().checked = true
        return container
    }

    override var valore: String = ""
        get() {
            for (radio in radios) {
                if (radio.checked)
                    return radio.value
            }
            return ""
        }

}

open class CampoTesto : Campo() {
    val input: HTMLInputElement by lazy { document.createElement("input") as HTMLInputElement }
    val lunghezza: Int by lazy { conf.getOrElse("lunghezza", { "20" }).toInt() }

    override fun configura() {}

    override fun componente(): Node {
        val container = document.createElement("div") as HTMLDivElement
        container.appendChild(document.createElement("span").apply { innerHTML = etichetta + "<br>" })
        container.appendChild(input)
        return container
    }

    override var valore: String = ""
        get() = input.value
}

class CampoDatabase : CampoTesto() {

    override fun componente(): Node {
        val div = super.componente()
        val cerca = document.createElement("button") as HTMLButtonElement
        cerca.innerHTML = "..."
        cerca.onclick = {
            //val c = widget.manager.create(BbxCercaTabella(conf.nn("tabella")))
            //c.show()
            window.alert("not impl3")
            true
        }
        div.appendChild(cerca)
        return div
    }

}

class CampoDocsOnline : CampoDebug()

class CampoData : Campo() {
    val input: HTMLInputElement by lazy { document.createElement("input") as HTMLInputElement }
    override fun configura() {

    }

    override fun componente(): Node {
        val container = document.createElement("div") as HTMLDivElement
        container.appendChild(document.createElement("span").apply { innerHTML = etichetta + "<br>" })
        input.type = "date"
        container.appendChild(input)
        return container
    }

    override val motivoInvalidita: String?
        get() =
            if (valore == null || valore.isEmpty())
                "devi compilare la data"
            else
                null

    override fun focus() {
        input.focus()
    }

    override var valore: String = ""
        get() = input.value
}

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