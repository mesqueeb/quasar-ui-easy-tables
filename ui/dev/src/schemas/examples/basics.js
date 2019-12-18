const rows = [
  {
    title: 'Mathematica',
    topic: 'curriculum',
    subject: 'We will look at the Mathematica of the Maths √/%^×-+÷',
    img:
      'https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=160',
    grade: 90000,
    passing: true,
    created: new Date(),
    classes: { '1': 'One' },
  },
  {
    title: 'Mathematica',
    topic: 'split',
    subject: 'We will look at the Mathematica of the Maths √/%^×-+÷',
    img:
      'https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=160',
    grade: 90000,
    passing: false,
    created: new Date(),
    classes: { '1': 'One' },
  },
  {
    title: 'Mathematica',
    topic: 'north',
    subject: 'We will look at the Mathematica of the Maths √/%^×-+÷',
    img:
      'https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=160',
    grade: 90000,
    passing: true,
    created: new Date(),
    classes: { '1': 'One' },
  },
  {
    title: 'Mathematica',
    topic: 'hotdog',
    subject: 'We will look at the Mathematica of the Maths √/%^×-+÷',
    img:
      'https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=160',
    grade: 90000,
    passing: true,
    created: new Date(),
    classes: { '1': 'One' },
  },
  {
    title: 'Mathematica',
    topic: 'hardware',
    subject: 'We will look at the Mathematica of the Maths √/%^×-+÷',
    img:
      'https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=160',
    grade: 90000,
    passing: true,
    created: new Date(),
    classes: { '1': 'One' },
  },
]

export default {
  title: 'My Lessons',
  rows,
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
    {
      id: 'img',
      label: 'Image',
      fieldType: 'img',
    },
    {
      id: 'grade',
      label: 'Grade',
      fieldType: 'input',
      valueType: 'number',
    },
    {
      id: 'passing',
      label: 'Passing',
      fieldType: 'toggle',
      valueType: 'boolean',
    },
    {
      id: 'created',
      label: 'Created at',
      fieldType: 'input-date',
      valueType: 'date',
    },
    {
      id: 'classes',
      label: 'Classes',
      fieldType: 'select',
      multiple: true,
      valueType: 'object',
      options: [
        { label: 'One', value: '1' },
        { label: 'Two', value: '2' },
        { label: 'Three', value: '3' },
      ],
    },
  ],
  get schemaGrid () {
    return this.schemaColumns
  },
}
