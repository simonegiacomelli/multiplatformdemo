package demo.common

import kotlinx.serialization.Optional
import kotlinx.serialization.SerialId
import kotlinx.serialization.Serializable

class FancyText(private val text: String) {
    override fun toString() = "Fancy3: $text"
}


@Serializable
data class Data(@SerialId(1) val a: Int, @SerialId(2) val b: String
                //, @Optional val c: Any = "xx"
)

@Serializable
data class DataList(@SerialId(1) @Optional val list: List<Data> = emptyList())

fun test01(){
    throw Exception()
}