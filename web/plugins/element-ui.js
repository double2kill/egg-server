import Vue from 'vue'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'

import mandMobile from 'mand-mobile'
import 'mand-mobile/lib/mand-mobile.css'

export default () => {
  Vue.use(Element, locale)
  Vue.use(mandMobile)
}
