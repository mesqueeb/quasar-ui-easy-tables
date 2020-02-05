import { Dialog } from 'quasar'
import DialogWrapper from '../../components/DialogWrapper.vue'
// For more info on this DialogWrapper see:
// https://github.com/mesqueeb/quasar-ui-easy-tables/blob/master/ui/dev/src/components/DialogWrapper.vue

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
    id: 'abc123',
    name: 'Luke',
    img:
      'https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=160',
    level: 90000,
    darkSide: true,
    birthdate: new Date(),
    trialsCompleted: [{ label: 'One', value: '1' }],
  },
  {
    id: 'def456',
    name: 'Leia',
    img:
      'https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=160',
    level: 80000,
    darkSide: false,
    birthdate: new Date('1990-01-01'),
    trialsCompleted: [{ label: 'Two', value: '2' }],
  },
]

export default {
  rows,
  schemaColumns,
  schemaGrid: schemaColumns,
  events: {
    'row-click': (event, rowData) => {
      Dialog.create({
        // tell Quasar's Dialog plugin to use DialogWrapper.vue
        component: DialogWrapper,
        parent: this,
        // tell DialogWrapper.vue to use an EasyForm
        slotComponent: 'EasyForm',
        // props bound to EasyForm via v-bind="slotProps"
        slotProps: {
          actionButtons: ['edit', 'cancel', 'save'],
          value: rowData,
          schema: schemaColumns,
          class: 'q-pa-lg',
          mode: 'edit',
        },
        // events bound to EasyForm via v-on="slotEvents"
        slotEvents: ({ hide }) => ({
          cancel: hide,
          save: ({ newData }) => {
            const { id: rowId } = rowData
            const rowToUpdate = rows.find(r => r.id === rowId)
            Object.entries(newData).forEach(([fieldId, value]) => {
              rowToUpdate[fieldId] = value
            })
            hide()
          },
        }),
      })
    },
  },
}
