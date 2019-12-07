import { Dialog } from 'quasar'
import DEasyForm from '../components/DEasyForm.vue'

const description = `Since an \`<EasyTable />\` is based on the [EasyForms](https://quasar-easy-forms.web.app) schema system, it's possible to easily implement stuff like inline editing; popup editing; or show an editable form on a row click.`

const schemaColumns = [
  {
    id: 'name',
    label: 'Name',
    fieldType: 'input',
    valueType: 'string',
  },
  {
    id: 'img',
    label: 'Profile picture',
    fieldType: 'img',
  },
  {
    id: 'level',
    label: 'Level',
    fieldType: 'input',
    valueType: 'number',
  },
  {
    id: 'darkSide',
    label: 'Dark side',
    fieldType: 'toggle',
    valueType: 'boolean',
  },
  {
    id: 'birthdate',
    label: 'Created at',
    fieldType: 'input-date',
    valueType: 'date',
  },
  {
    id: 'trialsCompleted',
    label: 'Trials completed',
    fieldType: 'select',
    multiple: true,
    valueType: 'object',
    options: [
      {label: 'One', value: '1'},
      {label: 'Two', value: '2'},
      {label: 'Three', value: '3'},
    ],
  },
]
const rows = [
  {name: 'Luke', img: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=160', level: 90000, darkSide: true, birthdate: new Date(), trialsCompleted: {'1': 'One'}},
]

export const exampleTables = [
  {
    rows,
    schemaColumns,
    events: {
      'row-click': (event, rowData) => {
        Dialog.create({
          component: DEasyForm,
          parent: this,
          // props forwarded to component
          propsToPass: {
            value: rowData,
            schema: schemaColumns,
            class: 'q-pa-lg',
            mode: 'edit',
          }
        })
      }
    },
  },
  {
    rows,
    schemaColumns: [
      {
        id: 'edit-btn',
        fieldType: 'btn',
        btnLabel: 'Edit',
        events: {
          click: (event, {formDataNested}) => {
            Dialog.create({
              component: DEasyForm,
              parent: this,
              // props forwarded to component
              propsToPass: {
                value: formDataNested,
                schema: schemaColumns,
                class: 'q-pa-lg',
                mode: 'edit',
              }
            })
          }
        },
      }
    ].concat(schemaColumns),
  },
]

export const pageForm = {
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
        options: [this._3, this._4]
          .map((field, index) => {
            return {label: field.label, value: index}
          }),
      }
    },
    _3: {
      showCondition: (value, {formDataNested}) => formDataNested.chosenExample === 0,
      fieldType: 'title',
      label: 'Editable form on row click',
    },
    _4: {
      showCondition: (value, {formDataNested}) => formDataNested.chosenExample === 1,
      fieldType: 'title',
      label: 'Editable form on button click',
    },
  }),
}

export default {
  pageForm,
  exampleTables,
}
