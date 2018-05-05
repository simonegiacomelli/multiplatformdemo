package utils

import fragment.HttpRequestDebug
import js.externals.paho_mqtt.Paho
import kotlinx.coroutines.experimental.async
import kotlinx.coroutines.experimental.await
import kotlin.js.Date

class CaldaiaRemote(val urlProvider: () -> String
                    , val setLog: (log: String) -> Unit
                    , val onConnectChange: (con: Boolean) -> Unit) {

    var mqtt: Paho.MQTT.Client? = null
    var destination: String = ""
    lateinit var _baseUrl: String

    fun updateUrl() {
        _baseUrl = urlProvider()
        println("url changed to $_baseUrl")
        try {
            mqtt?.disconnect();
            onConnectChange(false);
        } catch (ex: Exception) {
            println(ex)
        }
        mqtt = null;

        if (isMqttUrl) startMqtt()

    }

    val isMqttUrl: Boolean get() = _baseUrl.startsWith("mqttws")

    private fun startMqtt() {
        val uri = Uri(_baseUrl)
        val clientId = "${uri.params.get("clientId")}${Date().getMilliseconds() % 100}"
        println("${uri.protocol} ${uri.hostname} ${uri.username} $clientId")

        destination = uri.params["dest"]!!
        mqtt = Paho.MQTT.Client(uri.hostname, uri.port, clientId)
        setLog("debug:mqtt params host=${uri.hostname} port=${uri.port} clientId=$clientId");

        val opt: Paho.MQTT.ConnectOptions = js("({})")
        opt.userName = uri.username
        opt.password = uri.password
        opt.onSuccess = {
            onConnectChange(true)
            setLog("debug:mqtt connection success");
            mqtt!!.subscribe(destination + "-out");
        }
        opt.onFailure = { println("mqtt FAILURE ${it.errorCode} ${it.errorMessage}") }
        opt.reconnect = true
        opt.useSSL = true

        mqtt!!.onMessageArrived = {
            setLog(it.payloadString)
        }

        mqtt!!.onConnectionLost = {
            setLog("mqtt CONN LOST ${it.errorCode} ${it.errorMessage}")
        }

        mqtt!!.connect(opt)
    }


    fun send(command: String) {
        if (isMqttUrl) {
            mqtt!!.send(Paho.MQTT.Message(command)
                    .also { it.destinationName = destination })

        } else {
            var url = _baseUrl + command;
            setLog("debug: $url");
            //String str = await HttpRequest.getString(url);
            async {
                val str = HttpRequestDebug.getString(url).await()
                setLog(str);
            }
        }
    }
}