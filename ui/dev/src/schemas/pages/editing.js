const description = `Since an \`<EasyTable />\` is based on the [EasyForms](https://quasar-easy-forms.web.app) schema system, it's possible to easily implement stuff like inline editing; popup editing; or show an editable form on a row click.`

export default {
  mode: 'edit',
  actionButtons: [],
  schema: Object.values({
    _1: {
      fieldType: 'markdown',
      src: description,
      noContainer: true,
    },
    get _2 () {
      return {
        id: 'chosenExample',
        fieldType: 'btn-toggle',
        noCaps: true,
        options: [this._3, this._4].map((field, index) => {
          return { label: field.label, value: index }
        }),
      }
    },
    _3: {
      showCondition: (value, { formDataNested }) => formDataNested.chosenExample === 0,
      fieldType: 'title',
      label: 'Editable form on row click',
    },
    _4: {
      showCondition: (value, { formDataNested }) => formDataNested.chosenExample === 1,
      fieldType: 'title',
      label: 'Editable form on button click',
    },
  }),
}
