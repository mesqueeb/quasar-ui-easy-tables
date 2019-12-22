const description = `Since an \`<EasyTable />\` is based on the [EasyForms](https://quasar-easy-forms.web.app) schema system, it's possible to easily implement stuff like inline editing; popup editing; or show an editable form on a row click.`

export default {
  mode: 'edit',
  actionButtons: [],
  schema: Object.values({
    _1: {
      component: 'QMarkdown',
      src: description,
      noContainer: true,
      noLineNumbers: true,
    },
    get _2 () {
      return {
        id: 'chosenExample',
        component: 'QBtnToggle',
        spread: true,
        noCaps: true,
        options: [this._3, this._4].map((field, index) => {
          return { label: field.label, value: index }
        }),
      }
    },
    _3: {
      showCondition: (value, { formData }) => formData.chosenExample === 0,
      label: 'Editable form on row click',
      span: true,
      evaluatedProps: ['showCondition'],
    },
    _4: {
      showCondition: (value, { formData }) => formData.chosenExample === 1,
      label: 'Editable form on button click',
      span: true,
      evaluatedProps: ['showCondition'],
    },
  }),
}
