package pages

import db4common.`DataTableTest`
import fragment.ResourceWidget

class ElementsList : ResourceWidget() {
    override val resourceName: String
        get() = "pages/ElementsList.html"

    override fun htmlLoaded() {


    }
}