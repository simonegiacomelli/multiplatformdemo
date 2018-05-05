import js.externals.paho_mqtt.PahoTest
import kotlinx.coroutines.experimental.await
import org.w3c.xhr.XMLHttpRequest
import pages.MainWidget
import utils.Uri
import kotlin.browser.document
import kotlin.js.Promise


fun main(args: Array<String>) {

    MainWidget.init.startup(document.getElementById("loading")!!)

    val url = "mqttwss://qbkzojmr:rTaeAnsujbt-@m23.cloudmqtt.com:37516?dest=ESP_0100AE&clientId=dart-client"
    val conf = Uri(url)
    if (false) PahoTest.tryit(conf)

//    launch {
//        val content = HttpRequestDebug.getString("http://casa.jako.pro:90/cgi-bin/c4?cmd=status").await()
//        println(content)
//
//    }
}


suspend fun httpRequestTest() {

    fun httpRequest(url: String): Promise<String> {
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

    var res: String

    res = httpRequest("https://yesno.wtf/api").await()
    println("step1 $res")
    res = httpRequest("https://yesno.wtf/api").await()
    println("step2 $res")
    res = httpRequest("https://yesno.wtf/api").await()
    println("step3 $res")
}
