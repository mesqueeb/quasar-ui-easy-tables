import { isFunction } from 'is-what'

const rows = [
  { firstName: 'Taylor', lastName: 'Roach' },
  { firstName: 'Corey', lastName: 'Carson' },
  { firstName: 'Alden', lastName: 'Cantrell' },
  { firstName: 'Ezequiel', lastName: 'Davenport' },
  { firstName: 'Kendrick', lastName: 'Schultz' },
  { firstName: 'Bradyn', lastName: 'Arroyo' },
  { firstName: 'Kade', lastName: 'Craig' },
  { firstName: 'Carissa', lastName: 'Atkinson' },
  { firstName: 'Zaire', lastName: 'Lambert' },
  { firstName: 'Alec', lastName: 'Villanueva' },
  { firstName: 'Sheldon', lastName: 'Rogers' },
  { firstName: 'Celeste', lastName: 'Trujillo' },
]

export default {
  title: 'My Lessons',
  rows,
  schemaColumns: [
    {
      id: 'fullName',
      label: 'Full name',
      component: 'QInput',
      parseValue: (val, { formData, fieldInput }) => {
        const value = `${formData.firstName || ''} ${formData.lastName || ''}`.trim()
        fieldInput({ id: 'fullName', value })
        return value
      },
    },
  ],
  get schemaGrid () {
    return this.schemaColumns
  },
}
