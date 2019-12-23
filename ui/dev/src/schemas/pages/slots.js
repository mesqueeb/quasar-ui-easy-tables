const description = `You can use slots with EasyTable.

### EasyTable specific slots:
- above-nav-row
- above-table

### Quasar's QTable slots:
You can use all Quasar slots "around" the table. However, EasyTable uses these slots to generate its content: \`body\` for the rows, \`item\` for the cards in grid mode.

If you find yourself in a spot where you also want to use slots for the rows or items, you are probably better off using a regular QTable, perhaps in combination with quasar-easy-forms. Feel free to look at my source code for how I built the EasyTable component. 😉

> Please note that while the examples below show slot usage in the preview, they don't correctly show the use of the slots in the source code > template yet. I still have to improve this example. 😂
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
