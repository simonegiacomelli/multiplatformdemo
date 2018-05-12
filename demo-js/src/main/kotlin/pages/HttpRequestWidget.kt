package pages

import fragment.HttpRequestDebug
import fragment.ResourceWidget
import org.w3c.dom.*
import kotlin.browser.document
import kotlin.browser.window


class HttpRequestWidget : ResourceWidget() {
    override val resourceName: String
        get() = "pages/HttpRequestWidget.html"

    val url: HTMLInputElement by docu
    val output: HTMLTextAreaElement by docu
    val ul: HTMLUListElement by docu
    val btntest1: HTMLButtonElement by docu

    override fun htmlLoaded() {
        url.value = window.localStorage["saveurl"].orEmpty()
        qsh("close").onclick = { close() }
        qsh("submit").onclick = { makeRequest() }
        url.value = window.localStorage["saveurl"].orEmpty()
        if (url.value.isNotEmpty())
            makeRequest()

        btntest1.onclick = {
            manager.create(LogWidget()).show()
        }
    }

    private fun makeRequest() {
        window.localStorage["saveurl"] = url.value
        HttpRequestDebug.get(url.value)
                .then {
                    output.value += "body:[${it.status} ${it.responseText}]"
                    log("body:[${it.status} ${it.responseText}]")
                }
                .catch {
                    output.value += "exception:[$it]"
                }
    }


    fun log(payloadString: String) {
        println("LogWidget.log $payloadString")
        //url.innerHTML = (url.innerHTML.toInt() + 1).toString()

        var node = document.createElement("li")
        node.innerHTML = "$payloadString"
        ul.append(node)
        while (ul.childNodes.length > 30)
            ul.removeChild(ul.childNodes.asList().first())
    }
}