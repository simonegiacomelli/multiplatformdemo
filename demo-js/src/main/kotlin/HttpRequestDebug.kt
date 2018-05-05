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
}
