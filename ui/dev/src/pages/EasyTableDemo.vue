<template>
  <q-page padding>
    <EasyForm
      class="page-form"
      v-model="pageValue"
      v-bind="pageForm"
    />
    <EasyTable
      :key="pageValue.chosenExample"
      v-bind="exampleTables[pageValue.chosenExample]"
    />
  </q-page>
</template>

<style lang="sass" scoped>

</style>

<script>
import merge from 'merge-anything'
import * as demoSchemas from '../schemas/index'

export default {
  name: 'EasyTableDemo',
  props: {
    schemaId: String
  },
  data () {
    const { pageForm, exampleTables } = demoSchemas[this.schemaId]
    // const settingsSchema = getInfoCardSchema('EasyTable')
    return {
      pageValue: { chosenExample: 0 },
      pageForm,
      exampleTables: exampleTables.map(f => merge({value: {}}, f)),
      // settingsSchema,
    }
  },
}
</script>
