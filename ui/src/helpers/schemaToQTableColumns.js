import { isArray, isUndefined, isFunction } from 'is-what'
import pathToProp from 'path-to-prop'

export default function schemaToQTableColumns (schema) {
  const schemaArray = !isArray(schema) ? [schema] : schema
  return schemaArray.map(blueprint => {
    const { id, valueType, label, align: bpAlign, default: df } = blueprint
    const align = !isUndefined(bpAlign) ? bpAlign : valueType === 'number' ? 'right' : 'left'
    const field = row => {
      const value = pathToProp(row, id)
      const { parseValue } = row
      // todo: can I retrieve the EasyField context? should I?
      const easyFieldContext = { formData: row }
      // apply default value to make value sortable
      // todo: should we trigger default value on isUndefined AND ''?
      const valueOrDefaultValue = !isUndefined(value)
        ? value
        : isFunction(df)
        ? df(row, easyFieldContext)
        : df
      if (isFunction(parseValue)) return parseValue(valueOrDefaultValue, easyFieldContext)
      return valueOrDefaultValue
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
