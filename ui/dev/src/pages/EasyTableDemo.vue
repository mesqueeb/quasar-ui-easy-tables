<template>
  <q-page class="easy-table-demo" padding>
    <EasyForm class="page-form" v-model="pageValue" v-bind="pageForm" />
    <InfoCard
      class="q-mt-lg"
      tag-name="EasyTable"
      :title="infoCardTitle"
      :prop-data.sync="exampleTables[pageValue.chosenExample]"
      :static-schema-tab="exampleTablesRaw[pageValue.chosenExample]"
      :props-schema="propsSchema"
      :style-classes="styleClasses"
      :style-classes-data="styleClassesData"
    >
      <EasyTable
        class="q-pa-md _interactive-preview"
        :key="pageValue.chosenExample"
        v-bind="exampleTables[pageValue.chosenExample]"
        v-on="exampleTables[pageValue.chosenExample].events"
      />
    </InfoCard>
  </q-page>
</template>

<style lang="sass">

.easy-table-demo
  ._interactive-preview .easy-field__label
    font-weight: 100

.page-form
  .ef-btn-toggle
    border: solid 2px $primary
    border-radius: 6px
    > *
      border-radius: 3px
</style>

<script>
import merge from 'merge-anything'
import * as demoSchemas from '../schemas/examples/index'
import * as pageForms from '../schemas/pages/index'
import { capitalCase } from 'case-anything'
import { propToPropSchema } from '../helpers/schemaBuilders'
import { dependencyMap, EasyTable } from 'ui'

const inheritedProps = dependencyMap.getPassedProps('EasyTable')
const rawProps = merge(inheritedProps, EasyTable.props)

export function getInfoCardPropsSchema (props) {
  return Object.entries(props).reduce((carry, [propKey, propInfo]) => {
    carry[propKey] = propToPropSchema(propKey, propInfo)
    return carry
  }, {})
}

export default {
  name: 'EasyTableDemo',
  props: {
    schemaId: String,
  },
  data () {
    const { schemaId } = this
    const pageForm = pageForms[schemaId]
    const exampleTables = demoSchemas[schemaId].code
    const exampleTablesRaw = demoSchemas[schemaId].string
    // const settingsSchema = getInfoCardSchema('EasyTable')
    const styleClasses = [
      '.easy-table',
      '.easy-table__nav-row',
      '.easy-table__title',
      '.easy-table__table',
      '.easy-table__grid-item',
      '.easy-row',
      '.easy-cell',
      '.easy-field',
      '.easy-field__label',
    ]
    const styleClassesData = {
      '.easy-field__label': { 'font-weight': 100 },
    }
    const propsSchema = getInfoCardPropsSchema(rawProps)
    return {
      pageValue: { chosenExample: 0 },
      pageForm,
      exampleTables: exampleTables.map(f => merge({ value: {} }, f)),
      exampleTablesRaw,
      styleClasses,
      styleClassesData,
      propsSchema,
    }
  },
  computed: {
    infoCardTitle () {
      const { pageForm, pageValue, exampleTables, schemaId } = this
      if (exampleTables.length === 1) return capitalCase(schemaId)
      const { label } = pageForm.schema[1].options[pageValue.chosenExample]
      return capitalCase(label)
    },
  },
}
</script>
