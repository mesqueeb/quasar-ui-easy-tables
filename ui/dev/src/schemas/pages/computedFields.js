const description = `This is an example of a table with [Computed Fields](https://quasar-easy-forms.web.app/computedFields).

For this example we used a Computed Field that's not yet saved to the database and is computed on the fly when showing the table.

`

export default {
  mode: 'edit',
  actionButtons: [],
  schema: [
    {
      component: 'QMarkdown',
      src: description,
      noContainer: true,
      noLineNumbers: true,
    },
  ],
}
