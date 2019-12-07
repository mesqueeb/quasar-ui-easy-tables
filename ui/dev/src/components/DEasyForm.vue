<template>
<q-dialog ref="dialog" @hide="onDialogHide">
  <div class="d-easy-form">
    <EasyForm
      ref="formRef"
      v-bind="propsToPass"
      :value="innerValue"
      :hide="hide"
      @cancel="payload => passEventViaOk('cancel', payload)"
      @field-input="payload => passEventViaOk('field-input', payload)"
      @delete="payload => passEventViaOk('delete', payload)"
      @save="payload => passEventViaOk('save', payload)"
    />
  </div>
</q-dialog>
</template>

<style lang="stylus" scoped>
// $

.d-easy-form
  background white
  width 80vw
  pa md

</style>

<script>
import QDialogMethods from './QDialogMethods.js'

export default {
  name: 'DEasyForm',
  mixins: [ QDialogMethods ],
  inheritAttrs: false,
  props: {
    propsToPass: Object,
    value: undefined,
  },
  data () {
    return {
      innerValue: this.value || this.propsToPass.value
    }
  },
  computed: {},
  methods: {
    passEventViaOk (eventName, payload) {
      const formRef = this.$refs.formRef
      const dialogRef = this
      this.$emit('ok', {event: eventName, payload, formRef, dialogRef})
    },
  },
}
</script>
