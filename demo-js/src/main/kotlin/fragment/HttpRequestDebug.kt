package fragment

import org.w3c.xhr.XMLHttpRequest
import kotlin.js.Promise

object HttpRequestDebug {
    fun getString(url: String): Promise<String> {
        val p = Promise<String> { resolve, reject ->
            val xhr = XMLHttpRequest()
            xhr.open("GET", url)
            xhr.addEventListener("load", {
                resolve(xhr.responseText)
            })
            xhr.send()
        }
        return p
    }

    /*
    window.fetch(Request("http://caldaia.dyndns.org:90/cgi-bin/c4?cmd=status")).then(onFulfilled = {
it.text().then(onFulfilled = {
    println(it)
})
})

 */

}