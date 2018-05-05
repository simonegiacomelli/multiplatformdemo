package starter

import fi.iki.elonen.NanoHTTPD
import fi.iki.elonen.NanoHTTPD.MIME_PLAINTEXT

class HttpServer : NanoHTTPD(8083) {
    val handlers: MutableMap<String, (NanoHTTPD.IHTTPSession) -> NanoHTTPD.Response> = mutableMapOf()

    init {
        handlers["/sendsms"] = {
            val number = it.params["number"]
            val message = it.params["message"]
            if (number != null && message != null) {

                NanoHTTPD.newFixedLengthResponse("success=1");
            } else
                NanoHTTPD.newFixedLengthResponse(NanoHTTPD.Response.Status.BAD_REQUEST, MIME_PLAINTEXT, "you must specify number and message")

        }

        handlers["/info"] = {
            var msg = "<html><body><h1>Hello server</h1>\n"
            if (it.params["username"] == null) {
                msg += "<form action='?' method='get'>\n" + "  <p>Your name: <input type='text' name='username'></p>\n" + "</form>\n"
            } else {
                msg += "<p>Hello, " + it.params["username"] + "!</p>"
            }

            msg += "</body></html>\n"

            NanoHTTPD.newFixedLengthResponse(msg)
        }
    }


    fun response(status: NanoHTTPD.Response.Status): NanoHTTPD.Response {
        return NanoHTTPD.newFixedLengthResponse(status, MIME_PLAINTEXT, status.description)
    }


    fun response(status: NanoHTTPD.Response.Status, content: String): NanoHTTPD.Response {
        return NanoHTTPD.newFixedLengthResponse(status, MIME_PLAINTEXT, content)
    }

    override fun serve(session: NanoHTTPD.IHTTPSession): NanoHTTPD.Response {
        val method = session.method
        val uri = session.uri

        //Log.i("httpd", method.toString() + " '" + uri + "' ")

        val handler = handlers.get(session.uri.toLowerCase())
        if (handler != null)
            return handler(session)
        else {
            return NanoHTTPD.newFixedLengthResponse(Response.Status.NOT_FOUND, NanoHTTPD.MIME_PLAINTEXT, "Error 404, file not found")
            //Log.w("httpd", "handler not found")
        }


    }


}

val NanoHTTPD.IHTTPSession.params: Map<String, String>
    get() = parms

fun NanoHTTPD.IHTTPSession.response(content: String): NanoHTTPD.Response {
    val newFixedLengthResponse = NanoHTTPD.newFixedLengthResponse(NanoHTTPD.Response.Status.OK, MIME_PLAINTEXT, content)
    newFixedLengthResponse.addHeader("Access-Control-Allow-Origin","*");
    return newFixedLengthResponse
}
