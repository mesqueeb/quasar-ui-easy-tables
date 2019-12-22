<template>
  <q-tr
    :props="qTableRowProps"
    :class="['easy-row', `easy-row__${id}`, ...cRowClassesArray]"
    :style="cRowStyle"
  >
    <slot v-bind="easyFormSimulatedContext" />
  </q-tr>
</template>

<style lang="sass" scoped>
// $
@import '../index.sass'

// .easy-row
</style>

<script>
import merge from 'merge-anything'
import copy from 'copy-anything'
import { nestifyObject } from 'nestify-anything'
import { isArray, isFunction, isString, isPlainObject } from 'is-what'
import { QTr } from 'quasar'
import flattenPerSchema from '../helpers/flattenPerSchema'

function resolveEasyFormProp (propValue, componentValue, component) {
  return isFunction(propValue) ? propValue(componentValue, component) : propValue
}

export default {
  name: 'EasyRow',
  components: { QTr },
  inheritAttrs: false,
  props: {
    qTableRowProps: {
      type: Object,
      desc: 'The QTable v-slot:body props to pass to QTr',
    },
    value: {
      type: Object,
      desc: 'The EasyForm data',
    },
    schema: {
      type: [Array, Object],
      desc: 'The EasyForm schema',
    },
    rowStyle: {
      category: 'style',
      type: [Object, Array, String, Function],
      desc: 'Custom styling to be applied to the EasyRow. Applied like so `:style="rowStyle"`',
      examples: [`'padding: 1em;'`],
    },
    rowClasses: {
      category: 'style',
      type: [Object, Array, String, Function],
      desc: 'Custom classes to be applied to the EasyRow. Applied like so `:class="rowClasses"`',
      examples: [`['dark-theme']`],
    },
    // Other EasyForm props yet to be fully implemented:
    mode: { type: String },
    id: { type: String },
  },
  computed: {
    cRowStyle () {
      const { rowStyle, value } = this
      return resolveEasyFormProp(rowStyle, value, this)
    },
    cRowClassesArray () {
      const { rowClasses, value } = this
      const classes = resolveEasyFormProp(rowClasses, value, this)
      if (isString(classes)) return classes.split(' ')
      if (isPlainObject(classes)) return [classes]
      return classes
    },
    easyFormSimulatedContext () {
      const { value: formData, schema, id: formId, mode } = this
      const schemaArray = isArray(schema) ? schema : Object.values(schema)
      const dataFlat = flattenPerSchema(formData, schema)
      const dataFlatDefaults = schemaArray.reduce((carry, { id, default: df }) => {
        // set default for formDataFlat
        carry[id] = isFunction(df) ? df(formData) : df
        return carry
      }, {})
      const formDataFlat = merge(dataFlatDefaults, copy(dataFlat))
      const fieldInput = ({ id: fieldId, value }) =>
        this.$emit('row-input', {
          rowId: formId,
          fieldId,
          value,
        })
      return {
        // make sure formData is rebuild from "flat" to have the default value
        formData: nestifyObject(formDataFlat),
        formDataFlat,
        formId,
        mode,
        fieldInput,
      }
    },
  },
  methods: {},
}
</script>
