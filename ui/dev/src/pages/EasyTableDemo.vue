<template>
  <q-page padding>
    <EasyForm
      class="page-form"
      v-model="pageValue"
      v-bind="pageForm"
    />
    <InfoCard
      class="q-mt-lg"
      tag-name="EasyTable"
      :title="infoCardTitle"
      :prop-data.sync="exampleTables[pageValue.chosenExample]"
      :props-schema="propsSchema"
      :style-classes="styleClasses"
      :props-separate-tab="['schemaColumns', 'schemaGrid', 'rows']"
    >
      <EasyTable
        class="q-pa-md"
        :key="pageValue.chosenExample"
        v-bind="exampleTables[pageValue.chosenExample]"
      />
    </InfoCard>
  </q-page>
</template>

<style lang="sass" scoped>

</style>

<script>
import merge from 'merge-anything'
import * as demoSchemas from '../schemas/index'
import { capitalCase } from 'case-anything'
import { propToPropSchema } from '../helpers/schemaBuilders'
import { dependencyMap, EasyTable } from 'ui'

const inheritedProps = dependencyMap.getPassedProps('EasyTable')
const rawProps = merge(
  inheritedProps,
  EasyTable.props,
)

export function getInfoCardPropsSchema (props) {
  return Object.entries(props)
    .reduce((carry, [propKey, propInfo]) => {
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
    const { pageForm, exampleTables } = demoSchemas[this.schemaId]
    // const settingsSchema = getInfoCardSchema('EasyTable')
    const styleClasses = [
      'easy-table',
      'easy-table__nav-row',
      'easy-table__table',
      'easy-table__grid-item',
      'easy-row',
      'easy-cell',
    ]
    const propsSchema = getInfoCardPropsSchema(rawProps)
    return {
      pageValue: { chosenExample: 0 },
      pageForm,
      exampleTables: exampleTables.map(f => merge({value: {}}, f)),
      styleClasses,
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
