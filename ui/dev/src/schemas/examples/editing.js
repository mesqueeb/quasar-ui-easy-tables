import { Dialog } from 'quasar'
import DEasyForm from '../../components/DEasyForm.vue'

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
      { label: 'One', value: '1' },
      { label: 'Two', value: '2' },
      { label: 'Three', value: '3' },
    ],
  },
]
const rows = [
  {
    name: 'Luke',
    img:
      'https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=160',
    level: 90000,
    darkSide: true,
    birthdate: new Date(),
    trialsCompleted: { '1': 'One' },
  },
]

export default {
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
        },
      })
    },
  },
}
