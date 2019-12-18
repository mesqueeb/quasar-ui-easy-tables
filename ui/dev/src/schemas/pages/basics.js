const description = `\`<EasyTable />\` is Quasar's QTable but with the allows you to define columns & grid-cards via the schema syntax of [EasyForms](https://quasar-easy-forms.web.app).

A single schema object describing the fields in your data can be used for:
- defining the columns of an EasyTable
- defining the fields to show on each card for the grid-view of the EasyTable
- an EasyForm to be show in a pop-up on eg. clicking a row

Of course you can also use all of Quasar's QTable props on <EasyTable /> and they will be passed to <QTable />.

See below the interactive demo. You can check the source code, as well as _edit_ any prop and see its effect immidiately!`

export default {
  mode: 'edit',
  actionButtons: [],
  schema: [
    {
      fieldType: 'markdown',
      src: description,
      noContainer: true,
    },
  ],
}
