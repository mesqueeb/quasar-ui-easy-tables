import { version } from '../package.json'

import EasyTable from './components/EasyTable.vue'

export {
  version,

  EasyTable
}

export default {
  version,

  EasyTable,

  install (Vue) {
    Vue.component(EasyTable.name, EasyTable)
  }
}
