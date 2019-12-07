<template>
  <div
    :class="['easy-cell', ...cCellClassesArray]"
    :style="cCellStyle"
  >
    <EasyField
      v-if="fieldType"
      v-model="cValue"
      v-bind="cPropsToPass"
    />
    <div
      v-else
    >{{ cValue }}</div>
  </div>
</template>

<style lang="sass">
// $
@import '../index.sass'

</style>

<script>
import { isArray, isPlainObject, isFunction, isString, isAnyObject } from 'is-what'
import commafy from 'commafy-anything'
import merge from 'merge-anything'
import { EasyField } from 'quasar-ui-easy-forms'
import { dateStamp } from '../helpers/dateHelpers'

function resolveEasyFieldProp (propValue, componentValue, component) {
  return (isFunction(propValue))
    ? propValue(componentValue, component)
    : propValue
}

export default {
  name: 'EasyCell',
  components: { EasyField },
  props: {
    value: {
      type: undefined,
      desc: 'the value unformatted',
    },
    cellStyle: {
      category: 'style',
      type: [Object, Array, String, Function],
      desc: 'Custom styling to be applied to the EasyCell. Applied like so `:style="cellStyle"`',
      examples: [`'padding: 1em;'`],
    },
    cellClasses: {
      category: 'style',
      type: [Object, Array, String, Function],
      desc: 'Custom classes to be applied to the EasyCell. Applied like so `:class="cellClasses"`',
      examples: [`['dark-theme']`],
    },
    // EasyForm props that are used here:
    formDataNested: { type: Object, category: 'easyFormProp', default: () => ({}) },
    formDataFlat: { type: Object, category: 'easyFormProp', default: () => ({}) },
    formId: { type: String, category: 'easyFormProp', },
    formMode: { type: String, category: 'easyFormProp', },
    fieldInput: { type: Function, category: 'easyFormProp', },
    // EasyField props that are used here:
    fieldType: { type: String },
    events: { type: Object, default: () => ({}), desc: `only 'click' is used for button fields` },
  },
  computed: {
    cPropsToPass () {
      const defaults = {
        size: 'md',
        rawValue: this.formMode === 'raw',
        readonly: this.formMode === 'view',
      }
      return merge(
        defaults,
        this.$attrs, {
          // force these options:
          label: null,
          subLabel: null,
          // EasyForm & EasyField props from props of EasyCell ↑:
          events: this.events,
          fieldType: this.fieldType,
          formDataNested: this.formDataNested,
          formDataFlat: this.formDataFlat,
          formId: this.formId,
          formMode: this.formMode,
          fieldInput: this.fieldInput,
        }
      )
    },
    easyFieldSimulatedContext () {
      // simulate the EasyField component to be able to resolve EvaluatedProps
      return merge(this.cPropsToPass, {
        $store: this.$store,
        $router: this.$router,
        $q: this.$q,
      })
    },
    cCellStyle () {
      const { cellStyle, cValue, easyFieldSimulatedContext } = this
      return resolveEasyFieldProp(cellStyle, cValue, easyFieldSimulatedContext)
    },
    cCellClassesArray () {
      const { cellClasses, cValue, easyFieldSimulatedContext } = this
      const classes = resolveEasyFieldProp(cellClasses, cValue, easyFieldSimulatedContext)
      if (isString(classes)) return classes.split(' ')
      if (isPlainObject(classes)) return [classes]
      return classes
    },
    cValue: {
      get () { return this.value },
      set (val) {
        this.$emit('input', val)
      },
    },
  },
  methods: {isArray},
}
</script>
