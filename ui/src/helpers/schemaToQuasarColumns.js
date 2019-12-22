import { isArray, isUndefined, isFunction } from 'is-what'
import pathToProp from 'path-to-prop'

export default function schemaToQuasarColumns (schema) {
  const schemaArray = !isArray(schema) ? [schema] : schema
  return schemaArray.map(blueprint => {
    const { id, valueType, label, align: bpAlign, default: df } = blueprint
    const align = !isUndefined(bpAlign) ? bpAlign : valueType === 'number' ? 'right' : 'left'
    const field = row => {
      const value = pathToProp(row, id)
      // apply default value to make value sortable
      return !isUndefined(value) ? value : isFunction(df) ? df(row) : df
    }
    const quasarColumnBlueprint = {
      name: id,
      field,
      label,
      align,
      sortable: id !== 'id',

      // set parseValue to undefined to prevent conflict with Quasar's way of formatting
      // formatting is done in EasyCell!
      // parseValue,

      // not sure why i'd want to set these:
      // required,
      // sort,
      // style,
      // classes,
    }
    return quasarColumnBlueprint
  })
}
