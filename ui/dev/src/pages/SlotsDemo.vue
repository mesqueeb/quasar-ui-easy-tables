<template>
  <q-page class="easy-table-demo" padding>
    <EasyForm class="page-form" v-model="pageValue" v-bind="pageForm" v-if="pageForm" />
    <QBtnToggle
      v-model="chosenExampleInline"
      noCaps
      spread
      :options="[
        { label: 'v-slot:above-table', value: 0 },
        { label: 'v-slot:top-right', value: 1 },
        { label: 'all top slots', value: 2 },
      ]"
    />
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
        v-if="chosenExampleInline === 0"
        class="q-pa-md _interactive-preview"
        :key="pageValue.chosenExample"
        v-bind="exampleTables[pageValue.chosenExample]"
        v-on="exampleTables[pageValue.chosenExample].events"
        :filter="filter"
      >
        <template v-slot:above-table>
          <QInput
            v-model="filter"
            outlined
            dense
            placeholder="Search for Lesson by title, topic, or subject"
            class="q-mb-md"
          >
            <template v-slot:prepend>
              <QIcon name="search" />
            </template>
          </QInput>
        </template>
      </EasyTable>
      <EasyTable
        v-if="chosenExampleInline === 1"
        class="q-pa-md _interactive-preview"
        :key="pageValue.chosenExample"
        v-bind="exampleTables[pageValue.chosenExample]"
        v-on="exampleTables[pageValue.chosenExample].events"
        :filter="filter"
      >
        <template v-slot:top-right>
          <QInput
            v-model="filter"
            outlined
            dense
            placeholder="Search for Lesson by title, topic, or subject"
            class="full-width"
          >
            <template v-slot:prepend>
              <QIcon name="search" />
            </template>
          </QInput>
        </template>
      </EasyTable>
      <EasyTable
        v-if="chosenExampleInline === 2"
        class="q-pa-md _interactive-preview"
        :key="pageValue.chosenExample"
        v-bind="exampleTables[pageValue.chosenExample]"
        v-on="exampleTables[pageValue.chosenExample].events"
        :filter="filter"
      >
        <template v-slot:above-nav-row>
          <div class="_slot-preview">
            < template v-slot:above-nav-row>< /template>
          </div>
        </template>
        <template v-slot:top-left>
          <div class="_slot-preview">
            < template v-slot:top-left>< /template>
          </div>
        </template>
        <template v-slot:top-right>
          <div class="_slot-preview">
            < template v-slot:top-right>< /template>
          </div>
        </template>
        <template v-slot:above-table>
          <div class="_slot-preview">
            < template v-slot:above-table>< /template>
          </div>
        </template>
      </EasyTable>
    </InfoCard>
  </q-page>
</template>

<style lang="sass">

.easy-table-demo
  ._interactive-preview .easy-field__label
    font-weight: 100
  ._slot-preview
    padding: 1rem
    border: thin solid goldenrod

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
    schemaId: { type: String, default: 'slots' },
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
      chosenExampleInline: 0,
      filter: '',
      pageValue: { chosenExample: 0 },
      pageForm,
      exampleTables,
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
