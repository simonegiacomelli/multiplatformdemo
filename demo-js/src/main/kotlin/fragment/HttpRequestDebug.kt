package fragment

import org.w3c.dom.events.Event
import org.w3c.xhr.XMLHttpRequest
import kotlin.js.Promise

object HttpRequestDebug {
    fun getString(url: String): Promise<String> =
            Promise { resolve, reject ->
                val xhr = XMLHttpRequest()
                xhr.open("GET", url)
                xhr.addEventListener("load", { resolve(xhr.responseText) })
                xhr.addEventListener("error", {
                    console.log("error happened")
                    reject(EventException(xhr))
                })
                xhr.send()
            }
    fun get(url: String): Promise<XMLHttpRequest> =
            Promise { resolve, reject ->
                val xhr = XMLHttpRequest()
                xhr.open("GET", url)
                xhr.addEventListener("load", { resolve(xhr) })
                xhr.addEventListener("error", {
                    console.log("error happened")
                    reject(EventException(xhr))
                })
                xhr.send()
            }
}

class EventException(val xhr: XMLHttpRequest) : Throwable() {
    override fun toString(): String {
        return "${xhr.status} ${xhr.statusText}"
    }
}
