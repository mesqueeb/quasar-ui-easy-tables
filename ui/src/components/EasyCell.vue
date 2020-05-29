<template>
  <div :class="['easy-cell', ...cCellClassesArray]" :style="cCellStyle">
    <EasyField v-if="component" v-model="cValue" v-bind="easyFieldProps" />
    <div v-else>{{ cValue }}</div>
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

function resolveEasyFieldProp (propValue, componentValue, componentContext) {
  return isFunction(propValue) ? propValue(componentValue, componentContext) : propValue
}

export default {
  name: 'EasyCell',
  components: { EasyField },
  inheritAttrs: false,
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
    formData: { type: Object, category: 'easyFormProp', default: () => ({}) },
    formDataFlat: { type: Object, category: 'easyFormProp', default: () => ({}) },
    formId: { type: String, category: 'easyFormProp' },
    mode: { type: String, category: 'easyFormProp' },
    fieldInput: { type: Function, category: 'easyFormProp' },
    // EasyField props that are used here:
    component: { type: [String, Object, Function] },
    events: { type: Object, default: () => ({}), desc: `only 'click' is used for button fields` },
  },
  computed: {
    easyFieldProps () {
      return merge(
        // overwritable defaults:
        { mode: 'raw' },
        this.$attrs,
        this.$props,
        // force these options:
        { label: null, subLabel: null }
      )
    },
    easyFieldSimulatedContext () {
      // simulate the EasyField component to be able to resolve EvaluatedProps
      return merge(this.easyFieldProps, {
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
      get () {
        return this.value
      },
      /**
       * @param {any} val
       * @param {undefined | 'default'} origin
       */
      set (val, origin) {
        this.$emit('input', val, origin)
      },
    },
  },
  methods: { isArray },
}
</script>
