<template>
  <q-dialog ref="dialog" @hide="onDialogHide()" v-bind="dialogProps">
    <div class="dialog-wrapper">
      <component :is="slotComponent" v-bind="innerSlotProps" v-on="innerSlotEvents" />
      <q-btn
        v-if="showCloseButton"
        @click="hide"
        class="_close"
        icon="close"
        color="primary"
        size="lg"
        flat
      />
    </div>
  </q-dialog>
</template>

<style lang="sass" scoped>
// $

.dialog-wrapper
  position: relative
  background: white
  min-width: 50vw
  ._close
    position: absolute
    top: 0
    right: 0
</style>

<script>
import { isFunction } from 'is-what'
import QDialogMethods from './QDialogMethods'

export default {
  name: 'DWrapper',
  mixins: [QDialogMethods],
  props: {
    showCloseButton: {
      desc: 'Display a generic `✗` close button on the top-right.',
      type: Boolean,
      default: false,
    },
    dialogProps: {
      desc: 'The props that will be bound to the dialog component (with `v-bind="dialogProps"`)',
      type: Object,
    },
    slotComponent: {
      desc:
        'The component to show in the dialog. Can be a direct Vue component instance or a string with the component name (if registered).',
      type: undefined,
    },
    slotProps: {
      desc:
        'The props that will be bound to the slot component (with `v-bind="slotProps"`). When passed a function it will receive the DialogWrapper context `(this)` as param and must return an object (with `this` you can use the context to do `hide()` etc.)',
      type: [Object, Function],
    },
    slotEvents: {
      desc:
        'The events that will be listened to, on the slot component (with `v-on="slotEvents"`). When passed a function it will receive the DialogWrapper context `(this)` as param and must return an object (with `this` you can use the context to do `hide()` etc.)',
      type: [Object, Function],
    },
  },
  data () {
    const { slotProps, slotEvents } = this
    const innerSlotProps = isFunction(slotProps) ? slotProps(this) : slotProps
    const innerSlotEvents = isFunction(slotEvents) ? slotEvents(this) : slotEvents
    return {
      innerSlotProps,
      innerSlotEvents,
    }
  },
  computed: {},
  methods: {},
}
</script>
