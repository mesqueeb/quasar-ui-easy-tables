export const basics = {
  code: [require('./basics').default],
  string: [require('!!raw-loader!./basics').default],
}
export const editing = {
  code: [require('./editing').default, require('./editing2').default],
  string: [require('!!raw-loader!./editing').default, require('!!raw-loader!./editing2').default],
}
export const slots = {
  code: [require('./slots').default],
  string: [require('!!raw-loader!./slots').default],
}
export const computedFields = {
  code: [require('./computedFields').default],
  string: [require('!!raw-loader!./computedFields').default],
}
export const selection = {
  code: [require('./selection').default],
  string: [require('!!raw-loader!./selection').default],
}
