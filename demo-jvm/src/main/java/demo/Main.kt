package demo

import demo.common.FancyText

object Main {
    @JvmStatic
    fun main(args: Array<String>) {
        val fancyText = FancyText("Main")
        val string = fancyText.toString()
        println(string)
    }
}