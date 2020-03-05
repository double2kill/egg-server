import Vue from 'vue'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'

import mandMobile from 'mand-mobile'
import 'mand-mobile/lib/mand-mobile.css'

import Vant from 'vant'
import 'vant/lib/index.css'

export default () => {
  Vue.use(Element, locale)
  Vue.use(mandMobile)
  Vue.use(Vant)
}
