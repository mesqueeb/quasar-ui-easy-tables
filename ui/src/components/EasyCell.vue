<template>
  <div :class="['easy-cell', ...cCellClassesArray]" :style="cCellStyle">
    <EfImg
      v-if="fieldType === 'img' && cValue"
      class="easy-cell__img"
      :value="cValue"
      :limit="1"
      :deletable="false"
      alt="img"
      :contain="true"
      :ratio="1"
    />
    <EasyField
      v-else-if="fieldType === 'toggle' && mode === 'edit'"
      v-model="cValue"
      v-bind="cPropsToPass"
      v-on="cEvents"
    />
    <EfBtn
      v-else-if="fieldType === 'btn'"
      v-bind="cPropsToPass"
      v-on="cEvents"
    />
    <div
      v-else
    >{{ cValue }}</div>
  </div>
</template>

<style lang="sass">
// $
@import '../index.sass'

// .easy-cell
// .easy-cell__img
//   height: 100px
//   width: 100px
//   > *,
//   > * > *
//     height: inherit
//     width: inherit

</style>

<script>
import { isArray, isPlainObject, isFunction, isString, isAnyObject } from 'is-what'
import commafy from 'commafy-anything'
import merge from 'merge-anything'
import { EfImg, EasyField, EfBtn } from 'quasar-ui-easy-forms'
import { dateStamp } from '../helpers/dateHelpers'

function resolveEasyFieldProp (propValue, componentValue, component) {
  return (isFunction(propValue))
    ? propValue(componentValue, component)
    : propValue
}

/**
 * takes a value and returns the parsed value based on an EasyField blueprint provided.
 *
 * @export
 * @param {*} value any value. In our example blueprint `1` should be returned as `'one'`
 * @param {Object} blueprint a blueprint like eg.
 *     `{id: 'myRank', options: [{value: 1, label: 'one'}]}`
 *     Besides `options` you can also have `prefix` and `suffix` or
 *     a function passed as `format`, in which case other settings are ignored.
 * @returns {*} the parsed value
 */
export function formatEasyFieldValue (value, blueprint, component) {
  if (!blueprint) return value
  const { valueType, options, multiple, suffix, prefix, format } = blueprint
  // const { format } = blueprint
  let newValue = value
  if (isArray(options)) {
    if (valueType === 'object' && isPlainObject(value)) {
      newValue = multiple
        ? Object.values(value).filter(v => v).join(', ')
        : value.label
    } else {
      const valueArray = !isArray(value) ? [value] : value
      newValue = valueArray.map(selectedValue => {
        const option = options.find(o => o.value === selectedValue) || {}
        return option.label || selectedValue
      }).join(', ')
    }
  }
  if (isFunction(format)) newValue = format(newValue, component)
  // prevent conflicts when a custom format function is passed:
  if (valueType === 'date' && !isFunction(format)) newValue = dateStamp(newValue)
  if (valueType === 'number' && !isFunction(format)) newValue = commafy(newValue)
  if (suffix) newValue = `${newValue}${suffix}`
  if (prefix) newValue = `${prefix}${newValue}`
  return newValue
}

export default {
  name: 'EasyCell',
  components: { EfImg, EasyField, EfBtn },
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
    format: { type: Function },
    fieldType: { type: [String, Function] },
    valueType: { type: [String, Function] },
    options: { type: [Array, Function] },
    multiple: { type: Boolean },
    suffix: { type: [String, Function] },
    prefix: { type: [String, Function] },
    mode: { type: [String, Function] },
    default: { type: undefined },
    events: { type: Object, default: () => ({}), desc: `only 'click' is used for button fields` },
  },
  computed: {
    cPropsToPass () {
      const defaults = {size: 'md'}
      return merge(
        defaults,
        this.$attrs, {
          label: null,
          subLabel: null,
          fieldType: this.fieldType,
          valueType: this.valueType,
          options: this.options,
          multiple: this.multiple,
          suffix: this.suffix,
          prefix: this.prefix,
          mode: this.mode,
          default: this.default,
          // EasyForm & EasyField props:
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
    cEvents () {
      const { events, easyFieldSimulatedContext } = this
      return Object.entries(events)
        .reduce((carry, [eventName, eventFn]) => {
          carry[eventName] = e => {
            if (e && isAnyObject(e) && isFunction(e.stopPropagation)) e.stopPropagation()
            window.easyFieldSimulatedContext = easyFieldSimulatedContext
            eventFn(e, easyFieldSimulatedContext)
          }
          return carry
        }, {})
    },
    cCellStyle () {
      const { cellStyle, cValue } = this
      return resolveEasyFieldProp(cellStyle, cValue, this)
    },
    cCellClassesArray () {
      const { cellClasses, cValue } = this
      const classes = resolveEasyFieldProp(cellClasses, cValue, this)
      if (isString(classes)) return classes.split(' ')
      if (isPlainObject(classes)) return [classes]
      return classes
    },
    easyFieldBlueprintResolved () {
      const { value, easyFieldSimulatedContext, format } = this
      const propsNotToResolve = { format }
      const propsToResolve = {
        fieldType: this.fieldType,
        valueType: this.valueType,
        options: this.options,
        multiple: this.multiple,
        suffix: this.suffix,
        prefix: this.prefix,
        mode: this.mode,
      }
      return Object.entries(propsToResolve)
        .reduce((carry, [propKey, propValue]) => {
          carry[propKey] = resolveEasyFieldProp(propValue, value, easyFieldSimulatedContext)
          return carry
        }, propsNotToResolve)
    },
    cValue: {
      get () {
        const val = this.value !== undefined
          ? this.value
          : isFunction(this.default)
            ? this.default()
            : this.default
        return formatEasyFieldValue(
          val,
          this.easyFieldBlueprintResolved,
          this.easyFieldSimulatedContext
        )
      },
      set (val) {
        this.$emit('input', val)
      },
    },
  },
  methods: {isArray},
}
</script>
