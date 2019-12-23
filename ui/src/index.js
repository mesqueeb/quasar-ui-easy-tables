import { version } from '../package.json'

import EasyTable from './components/EasyTable.vue'

import schemaToQTableColumns from './helpers/schemaToQTableColumns.js'

import dependencyMap from './meta/dependencyMap'

export { version, EasyTable, schemaToQTableColumns, dependencyMap }

export default {
  version,

  EasyTable,

  schemaToQTableColumns,

  dependencyMap,

  install (Vue) {
    Vue.component(EasyTable.name, EasyTable)
  },
}
