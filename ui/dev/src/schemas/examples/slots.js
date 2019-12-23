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
    classes: [{ label: 'One', value: '1' }],
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
    classes: [{ label: 'One', value: '1' }],
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
    classes: [{ label: 'One', value: '1' }],
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
    classes: [{ label: 'One', value: '1' }],
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
    classes: [{ label: 'One', value: '1' }],
  },
]

export default {
  title: 'My Lessons',
  rows,
  schemaColumns: [
    {
      id: 'title',
      label: 'Lesson Title',
      component: 'QInput',
    },
    {
      id: 'topic',
      label: 'Topic',
      component: 'QInput',
    },
    {
      id: 'subject',
      label: 'Subject',
      component: 'QInput',
    },
    {
      id: 'img',
      label: 'Image',
      component: 'QImg',
      mode: 'view',
      evaluatedProps: ['src'],
      internalErrors: true,
      // component props:
      src: val => val,
    },
    {
      id: 'grade',
      label: 'Grade',
      component: 'QInput',
      // component props:
      type: 'number',
    },
    {
      id: 'passing',
      label: 'Passing',
      component: 'QToggle',
      default: false,
    },
    {
      id: 'created',
      label: 'Created at',
      component: 'QInput',
      parseInput: val => new Date(val),
      dateFormat: 'YYYY/MM/DD',
      valueType: 'date',
      // component props:
      mask: '####/##/##',
      placeholder: 'YYYY/MM/DD',
    },
    {
      id: 'classes',
      label: 'Classes',
      component: 'QSelect',
      // component props:
      multiple: true,
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
