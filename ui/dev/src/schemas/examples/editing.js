import { Dialog } from 'quasar'
import DEasyForm from '../../components/DEasyForm.vue'

const schemaColumns = [
  {
    id: 'name',
    label: 'Name',
    component: 'QInput',
  },
  {
    id: 'img',
    label: 'Profile picture',
    component: 'QImg',
    mode: 'view',
    evaluatedProps: ['src'],
    internalErrors: true,
    // component props:
    src: val => val,
  },
  {
    id: 'level',
    label: 'Level',
    component: 'QInput',
    // component props:
    type: 'number',
  },
  {
    id: 'darkSide',
    label: 'Dark side',
    component: 'QToggle',
    default: false,
  },
  {
    id: 'birthdate',
    label: 'Created at',
    component: 'QInput',
    parseInput: val => new Date(val),
    valueType: 'date',
    // component props:
    mask: '####/##/##',
    placeholder: 'YYYY/MM/DD',
    dateFormat: 'YYYY/MM/DD',
  },
  {
    id: 'trialsCompleted',
    label: 'Trials completed',
    component: 'QSelect',
    // component props:
    multiple: true,
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
    trialsCompleted: [{ label: 'One', value: '1' }],
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
