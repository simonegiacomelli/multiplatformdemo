package fragment

import kotlinx.coroutines.experimental.Deferred
import kotlinx.coroutines.experimental.async
import kotlinx.coroutines.experimental.await
import org.w3c.dom.*
import org.w3c.dom.events.Event
import kotlin.browser.document
import kotlin.browser.window
import kotlin.js.Promise
import kotlin.reflect.KProperty

class WidgetManager(val root: Element) {
    val widgets = mutableListOf<Widget>()
    fun <T : Widget> create(widget: T): T {
        widget.manager = this
        return widget
    }

    var _historyCounter = 0

    fun show(widget: Widget) {
        widgets.add(widget);
        removeRootChild()

        append(widget);
        if (_backEnable) {
            _historyCounter++;
            window.history.pushState(JSON.parse("{\"page\":$_historyCounter}"), "title $_historyCounter", "?page=$_historyCounter");
        }
    }

    private fun removeRootChild() {
        root.innerHTML = ""
    }

    fun append(widget: Widget) {
        root.append(widget.div)
    }

    fun close(widget: Widget) {
        if (widgets.last() != widget) throw Exception("wtf!?");
        closeCurrent();
    }

    fun closeCurrent() {
        if (widgets.size == 1) return
        widgets.removeAt(widgets.size - 1)
        removeRootChild()
        if (widgets.size > 0) append(widgets.last())
    }

    private var _backEnable = false

    fun handleBack() {
        if (_backEnable) return
        _backEnable = true
        window.onpopstate = {
            println("ok gooo")
            closeCurrent()
        }
    }
}

abstract class Widget {
    val div: HTMLDivElement = document.createElement("div") as HTMLDivElement
    val elements: MutableMap<String, Element> = mutableMapOf()

    lateinit var manager: WidgetManager

    companion object {
        var _instanceCounter: Int = 0
    }

    var instanceName: String
    lateinit var cachedContent: String

    open suspend fun contentPromise(): Promise<String> {
        return Promise.Companion.resolve(content)
    }

    val loader: Deferred<Unit>
    abstract val content: String

    init {
        _instanceCounter++;
        instanceName = "inst$_instanceCounter";
        println("instance=$instanceName")

        loader = async {
            cachedContent = contentPromise().await();

            loadHtml();
            println("$instanceName async done")
        }

        println("$instanceName async after")
    }

    fun whenReady(function: () -> Unit) {
        async {
            loader.await()
            function()
        }
    }

    fun loadHtml() {
        println("loadHTML cached=${cachedContent.substring(0, 50)}")
        div.innerHTML = cachedContent
        //elements.clear()
        rename(div, instanceName);
        htmlLoaded();
    }

    open fun htmlLoaded() {

    }


    fun rename(node: Node, instanceName: String) {
        if (node is Element) {
            if (node.id.isNotEmpty()) {
                node.id = instanceId(node.id);
                elements.put(node.id, node);
            }
        }

        node.childNodes.asList().forEach { rename(it, instanceName) }
        //node.childNodes.forEach((e) => rename (e, instanceName));
    }

    fun instanceId(id: String): String {
        return instanceName + "\$" + id
    }


    fun show() {
//        if (manager == null) throw new exception ("no manager defined");
//        await loaded;
        manager.show(this);

    }

    fun qs(id: String): Element {
        var id = id
        if (id.startsWith("#")) id = id.substring(1)
        return elements[instanceId(id)]!!
    }

    fun qsh(id: String) = qs(id) as HTMLElement

    fun close() {
        if (manager == null) throw Exception("no manager defined")
        manager.close(this)
    }

    fun onClick(name: String, function: (Event) -> Unit) {
        qs(name).addEventListener("click", function)
    }

    interface docElementsInt {
        operator fun <T> getValue(thisRef: Any?, property: KProperty<*>): T
    }

    val docu = object : docElementsInt {
        override operator fun <T> getValue(thisRef: Any?, property: KProperty<*>): T {
            return qs(property.name) as T
        }
    }

}

abstract class ResourceWidget : Widget() {

    suspend override fun contentPromise(): Promise<String> {
        return HttpRequestDebug.getString(resourceName)
    }

    override val content: String
        get() = throw RuntimeException("should not be called")
    abstract val resourceName: String
}

