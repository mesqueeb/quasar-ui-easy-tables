import { version } from '../package.json'

import EasyTable from './components/EasyTable.vue'

import dependencyMap from './meta/dependencyMap'

export {
  version,

  EasyTable,

  dependencyMap,
}

export default {
  version,

  EasyTable,

  dependencyMap,

  install (Vue) {
    Vue.component(EasyTable.name, EasyTable)
  }
}
