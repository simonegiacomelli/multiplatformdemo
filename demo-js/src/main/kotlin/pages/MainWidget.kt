package pages

import fragment.Hotkey
import fragment.ResourceWidget
import fragment.WidgetManager
import kotlinx.coroutines.experimental.async
import org.w3c.dom.*
import utils.CaldaiaRemote
import kotlin.browser.document
import kotlin.browser.window
import kotlin.js.Date

class MainWidget : ResourceWidget() {
    override val resourceName: String
        get() = "pages/MainWidget.html"


    val caldaiaCommands by lazy {
        CaldaiaRemote({ _url.value }, ::setLog, { _connected.checked = it }) //   () => _url.value, setLog, (con) => _connected.checked = con);
    }

    val _inHours get() = qs("#inHours") as HTMLInputElement
    val _inMinutes get() = qs("#inMinutes") as HTMLInputElement
    val _inDatetime get() = qs("#inDatetime") as HTMLInputElement

    val _url get() = qs("#url") as HTMLInputElement
    val _urlChoice get() = qs("#urlChoice") as HTMLSelectElement

    val _response get() = qs("#response") as HTMLElement
    val logWidget: LogWidget by lazy { manager.create(LogWidget()) }

    val _connected get() = qs("#connected") as HTMLInputElement

    override fun htmlLoaded() {

        onClick("inHDec", { HourInc(-1) })
        onClick("inHInc", { HourInc(1) })
        onClick("inMDec", { MinuteInc(-10) })
        onClick("inMInc", { MinuteInc(10) })
        onClick("inZero", { Zero() })
        onClick("onbtn", { processCommand("on") })
        onClick("offbtn", { processCommand("off") })

        onClick("clearbtn", { cronClear() })
        onClick("statusbtn", { sendCmd("status") })
        onClick("cronlistbtn", { sendCmd("cron_list") })
        onClick("rebootbtn", { rebootCommand() })
        onClick("debug", { })

        //onClick('inZero', { Zero() })
        //_urlChoice.options[0] = HTMLOptionElement()
        //println(document.createElement("option"))
        val urls = arrayOf(
                "...select one",
                "http://casa.jako.pro:90/cgi-bin/c4?cmd=",
                "http://10.0.0.122/cgi-bin/c4?cmd=",
                "http://10.0.0.137/cgi-bin/c4?cmd=",
                "http://casa.jako.pro:92/cgi-bin/c4?cmd=",
                "mqttwss://qbkzojmr:rTaeAnsujbt-@m23.cloudmqtt.com:37516?dest=ESP_0100AE&clientId=dart-client",
                "mqttwss://qbkzojmr:rTaeAnsujbt-@m23.cloudmqtt.com:37516?dest=ESP_05B65E&clientId=dart-client"
        )
        urls.forEach {
            val opt = document.createElement("option") as HTMLOptionElement
            _urlChoice.options[_urlChoice.options.length] = opt.apply { this.value = it; this.text = it }
        }
        _url.value = (window.localStorage["url"]) ?: ""
        _urlChoice.onchange = { urlChoiceChanged() }

        val message = (_urlChoice.options.get(0) as HTMLOptionElement?)!!

        onClick("log", { logWidget.show() })

        durationChanged()
        Hotkey.enable()
        Hotkey.add("ESC", { manager.closeCurrent() })
        Hotkey.add("F1", { logWidget.show() })

        _url.onblur = { caldaiaCommands.updateUrl() }

        caldaiaCommands.updateUrl()
        qs("loading").setAttribute("style", "display:none")
        qs("loaded").setAttribute("style", "")

    }

    fun rebootCommand() {
        if (!window.confirm("Sei sicuro")) return
        sendCmd("reboot")
    }

    private fun cronClear() {
        logWidget.log("cronClear to implem")
        if (!window.confirm("Sei sicuro")) return;
        sendCmd("cron_clear");
    }

    private fun urlChoiceChanged() {
        val opt = _urlChoice.selectedOptions.asList().first() as HTMLOptionElement
        _url.value = opt.value
        window.localStorage["url"] = _url.value
        caldaiaCommands.updateUrl()
    }

    fun setLog(payloadString: String) {
        //js("debugger")
        logWidget.whenReady { logWidget.log(payloadString) }
        if (!payloadString.startsWith("debug") && !payloadString.startsWith("ping"))
            _response.innerHTML = payloadString.replace("\n".toRegex(), "<br>") + "<br>"
    }

    fun processCommand(cmd: String) {

        if (getDurationInMin() == 0)
            sendCmd(cmd);
        else
            sendCmd(getCronCmd(cmd));

    }

    fun getCronCmd(cmd: String): String = "cron_add,${cmd},${getDurationInMin()}";

    fun sendCmd(command: String) {
        _response.innerHTML = "invio comando<br>in attesa della risposta..."
        logWidget.log("sending: $command")
        caldaiaCommands.send(command)
    }

    fun Zero() {
        _inHours.value = "0"
        _inMinutes.value = "0"
        durationChanged()
    }

    fun HourInc(amount: Int) {
        var h = _inHours.value.toInt() + amount;
        if (h < 0) h = 0;
        if (h > 9999) h = 9999;
        _inHours.value = "$h";
        durationChanged();
    }

    fun MinuteInc(amount: Int) {
        var m = getDurationInMin() + amount
        if (m < 0) m = 0;
        setMinAndHour(m);
        durationChanged();
    }

    fun durationChanged() {
        if (_inMinutes.value.trim().length == 0) _inMinutes.value = "0"
        if (_inHours.value.trim().length == 0) _inHours.value = "0"
        //val duration = getDuration
        //setDatetimeCntrl(DateTime.now().add(duration))
        //
        var m = getDurationInMin()
        val now = Date().asDynamic()
        now.setSeconds(now.getSeconds() + m)
        //println("$now")
        //format date as yyyy-MM-ddTHH:mm
        val str: String = now.toISOString()
        val dropLast = str.dropLast(5)
        println(dropLast)
        _inDatetime.value = dropLast
        //_inDatetime.value = "2017-12-31T23:59"
        //_inDatetime.asDynamic().valueAsDate = now
        //document.getElementById(_inDatetime.id)!!.asDynamic().valueAsDate = now
    }

    private fun getDurationInMin() = _inMinutes.value.toInt() + _inHours.value.toInt() * 60


    fun setMinAndHour(durationInMin: Int) {
        val minutePart = durationInMin % 60
        _inMinutes.value = "$minutePart"
        val hourPart = (durationInMin - minutePart) / 60
        _inHours.value = "$hourPart"
    }

}