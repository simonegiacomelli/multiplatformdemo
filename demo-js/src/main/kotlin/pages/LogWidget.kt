package pages

import fragment.ResourceWidget
import org.w3c.dom.HTMLElement
import org.w3c.dom.HTMLUListElement
import org.w3c.dom.asList
import kotlin.browser.document

class LogWidget : ResourceWidget() {
    override val resourceName: String
        get() = "pages/LogWidget.html"

    val counter get() = qs("#counter") as HTMLElement

    override fun htmlLoaded() {
        onClick("close", { close() })
    }

    val ul get () = qs("ul") as HTMLUListElement

    fun log(payloadString: String) {
        println("LogWidget.log $payloadString")
//        print("called: ")
        //println(counter::class.js.name)
//        var dateTime = new DateTime.now();
//        int delta = dateTime.millisecondsSinceEpoch - _lst;
//        _lst = dateTime.millisecondsSinceEpoch;
//        var node = new Element.li()..innerHtml ="$delta $payloadString";
//        node.setAttribute("myId", "$delta - ${dateTime}");
//        node.onClick.listen((e) => window.alert(node.getAttribute("myId")));
//        ul.append(node);
//        while (ul.childNodes.length > 30) ul.childNodes.first.remove();
        counter.innerHTML = (counter.innerHTML.toInt() + 1).toString()

        var node = document.createElement("li")
        node.innerHTML = "$payloadString"
        ul.append(node)
        while (ul.childNodes.length > 30)
            ul.removeChild(ul.childNodes.asList().first())
    }
}