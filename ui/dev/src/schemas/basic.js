
const description = `\`<EasyTable />\` is a component that allows you to easily create tables by passing an object with a schema on how you want the table to look. The only thing you need to learn is the way you can define this schema and based on this the entire table will be generated.

By default, EasyTable has buttons on the top side of the form to swap between table/grid etc... Each of these actions will $emit an event.`

export const exampleTables = [
  {
    title: 'My Lessons',
    rows: [
      {title: 'Mathematica', topic: 'Maths', subject: 'We will look at the Mathematica of the Maths √/%^×-+÷'},
      {title: 'Mathematica', topic: 'Maths', subject: 'We will look at the Mathematica of the Maths √/%^×-+÷'},
      {title: 'Mathematica', topic: 'Maths', subject: 'We will look at the Mathematica of the Maths √/%^×-+÷'},
      {title: 'Mathematica', topic: 'Maths', subject: 'We will look at the Mathematica of the Maths √/%^×-+÷'},
      {title: 'Mathematica', topic: 'Maths', subject: 'We will look at the Mathematica of the Maths √/%^×-+÷'},
      {title: 'Mathematica', topic: 'Maths', subject: 'We will look at the Mathematica of the Maths √/%^×-+÷'},
    ],
    schemaColumns: [
      {
        id: 'title',
        label: 'Lesson Title',
        fieldType: 'input',
        valueType: 'string',
      },
      {
        id: 'topic',
        label: 'Topic',
        fieldType: 'input',
        valueType: 'string',
      },
      {
        id: 'subject',
        label: 'Subject',
        fieldType: 'input',
        valueType: 'string',
      },
    ],
    get schemaGrid () { return this.schemaColumns },
    gridEasyFormOptions: {},
  }
]

export const pageForm = {
  mode: 'edit',
  actionButtons: [],
  schema: [
    {
      fieldType: 'markdown',
      src: description,
      noContainer: true,
    },
  ]
}

export default {
  pageForm,
  exampleTables,
}
