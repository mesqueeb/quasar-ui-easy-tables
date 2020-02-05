import { isFunction } from 'is-what'

const rows = [
  { fullName: 'Taylor Roach', id: 'taylor-roach' },
  { fullName: 'Corey Carson', id: 'corey-carson' },
  { fullName: 'Alden Cantrell', id: 'alden-cantrell' },
  { fullName: 'Ezequiel Davenport', id: 'ezequiel-davenport' },
  { fullName: 'Kendrick Schultz', id: 'kendrick-schultz' },
  { fullName: 'Bradyn Arroyo', id: 'bradyn-arroyo' },
  { fullName: 'Kade Craig', id: 'kade-craig' },
  { fullName: 'Carissa Atkinson', id: 'carissa-atkinson' },
  { fullName: 'Zaire Lambert', id: 'zaire-lambert' },
  { fullName: 'Alec Villanueva', id: 'alec-villanueva' },
  { fullName: 'Sheldon Rogers', id: 'sheldon-rogers' },
  { fullName: 'Celeste Trujillo', id: 'celeste-trujillo' },
]

const table = {
  selection: 'multiple',
  title: 'My Lessons',
  rows,
  schemaColumns: [
    {
      id: 'fullName',
      label: 'Full name',
      component: 'QInput',
    },
  ],
  get schemaGrid () {
    return this.schemaColumns
  },
  selected: [],
  events: {
    'update:selected': selection => {
      table.selected = selection
    },
  },
}
export default table
