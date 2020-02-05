const description = `By default selection is implemented for both table and grid view, however, every row NEEDS an 'id' prop in order for it to work.

CSS can be overwritten with these classes:
- \`.easy-table__grid-item.selected\`

- \`.easy-table__row.selected\`
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
