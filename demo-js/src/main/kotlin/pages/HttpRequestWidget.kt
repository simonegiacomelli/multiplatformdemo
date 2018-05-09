package pages

import fragment.HttpRequestDebug
import fragment.ResourceWidget
import kotlinx.coroutines.experimental.async
import org.w3c.dom.*
import org.w3c.dom.events.Event
import kotlin.browser.document
import kotlin.browser.window
import kotlin.reflect.KProperty

class HttpRequestWidget : ResourceWidget() {
    override val resourceName: String
        get() = "pages/HttpRequestWidget.html"

    val url get() = qs("url") as HTMLInputElement
    val output get() = qs("output") as HTMLTextAreaElement

    override fun htmlLoaded() {
        url.value = window.localStorage["saveurl"].orEmpty()
        qsh("close").onclick = { close() }
        qsh("submit").onclick = { makeRequest() }
        url.value = window.localStorage["saveurl"].orEmpty()
        if (url.value.isNotEmpty())
            makeRequest()

    }

    private fun makeRequest() {
        window.localStorage["saveurl"] = url.value
        HttpRequestDebug.get(url.value)
                .then {
                    output.value += "body:[${it.status} ${it.responseText}]"
                }
                .catch {
                    output.value += "exception:[$it]"
                }
    }

    val ul get () = qs("ul") as HTMLUListElement

    fun log(payloadString: String) {
        println("LogWidget.log $payloadString")
        url.innerHTML = (url.innerHTML.toInt() + 1).toString()

        var node = document.createElement("li")
        node.innerHTML = "$payloadString"
        ul.append(node)
        while (ul.childNodes.length > 30)
            ul.removeChild(ul.childNodes.asList().first())
    }
}