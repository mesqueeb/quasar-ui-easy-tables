import { version } from '../package.json'

import EasyTable from './components/EasyTable.vue'

import schemaToQuasarColumns from './helpers/schemaToQuasarColumns.js'

import dependencyMap from './meta/dependencyMap'

export { version, EasyTable, schemaToQuasarColumns, dependencyMap }

export default {
  version,

  EasyTable,

  schemaToQuasarColumns,

  dependencyMap,

  install (Vue) {
    Vue.component(EasyTable.name, EasyTable)
  },
}
