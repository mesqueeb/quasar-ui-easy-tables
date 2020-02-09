<template>
  <q-table
    class="easy-table"
    v-bind="quasarProps"
    :selected.sync="cSelected"
    :pagination.sync="pagination"
  >
    <template v-slot:top v-if="usesTopSlot">
      <slot name="above-nav-row" />
      <div class="easy-table__nav-row">
        <slot name="top-left">
          <div class="q-table__title" v-if="title">{{ title }}</div>
        </slot>
        <slot name="top-right">
          <EfBtn v-for="btn in cActionButtons" :key="btn.btnLabel" v-bind="btn" v-on="btn.events" />
        </slot>
      </div>
      <slot name="above-table" />
    </template>
    <!-- Pass on all scoped slots -->
    <template
      v-for="slot in Object.keys($scopedSlots).filter(slot => !slot.includes('top'))"
      v-slot:[slot]="scope"
    >
      <slot :name="slot" v-bind="scope"
    /></template>

    <!-- <template v-slot:header="headerProps">
      <q-tr :props="headerProps">
        <q-th auto-width />
        <q-th v-for="col in headerProps.cols" :key="col.name" :props="headerProps">
          {{ col.label }}
        </q-th>
      </q-tr>
    </template> -->
    <template v-slot:body="rowProps">
      <!--
          EasyRow.vue's only purpose is:
          (1) to create `EasyFormSimulatedContext`
          (2) to set up the fieldInput (@row-input) listener
          (3) add row classes; style and their respective props
        -->
      <EasyRow
        :q-table-row-props="rowProps"
        :schema="schemaColumns"
        :value="rowProps.row"
        :id="rowProps.row.id"
        :row-style="rowStyle"
        :row-classes="rowClasses"
        mode="raw"
        @row-input="({ rowId, fieldId, value }) => onInputCell(rowId, fieldId, value)"
        v-slot="EasyFormSimulatedContext"
      >
        <q-td v-if="selectionMode" auto-width>
          <div class="flex flex-center">
            <q-checkbox :dense="true" v-model="rowProps.selected" />
          </div>
        </q-td>
        <q-td
          v-for="blueprint in schemaColumns"
          :key="blueprint.id"
          :props="rowProps"
          @click.native="e => onRowClick(e, rowProps.row)"
        >
          <!-- requires row, blueprint, value -->
          <EasyCell
            v-bind="merge(EasyFormSimulatedContext, blueprint)"
            :value="pathToProp(EasyFormSimulatedContext.formData, blueprint.id)"
            @input="val => onInputCell(rowProps.row.id, blueprint.id, val)"
          />
        </q-td>
      </EasyRow>
    </template>
    <!-- Grid item -->
    <template v-slot:item="gridItemProps">
      <q-card
        :class="
          flattenArray([
            'easy-table__grid-item',
            gridItemProps.selected ? 'selected' : [],
            cardClass,
          ])
        "
        :style="cardStyle"
        @click="e => onRowClick(e, gridItemProps.row, 'grid', gridItemProps)"
      >
        <EasyForm
          :key="JSON.stringify(gridItemProps.row)"
          :value="gridItemProps.row"
          :id="gridItemProps.row.id"
          v-bind="gridEasyFormProps"
          @field-input="
            ({ id: fieldId, value }) => onInputCell(gridItemProps.row.id, fieldId, value)
          "
        />
      </q-card>
    </template>
  </q-table>
</template>

<style lang="sass">
// $
@import '../index.sass'

.easy-table
  display: flex
  flex-direction: column
  th
    white-space: pre
  .q-table__top
    display: flex
    flex-wrap: nowrap
    flex-direction: column
    align-items: stretch
.easy-table__nav-row
  min-height: 42px
  display: grid
  justify-content: stretch
  align-content: start
  align-items: center
  grid-gap: $md
  grid-auto-flow: column
  grid-template-columns: 1fr
.easy-table__grid-item
  margin: $sm
  padding: $md
  transition: all 200ms
  .easy-field__sub-label
    display: none
  &.selected
    background: #efefef
    transform: scale(0.9)
</style>

<script>
import pathToProp from 'path-to-prop'
import merge from 'merge-anything'
import { flattenArray } from 'flatten-anything'
import { isPlainObject, isFunction } from 'is-what'
import { QTable, QTd, QCheckbox, QCard, QIcon, QInput } from 'quasar'
import { EfBtn, EasyForm } from 'quasar-ui-easy-forms'
import EasyRow from './EasyRow.vue'
import EasyCell from './EasyCell.vue'
import schemaToQTableColumns from '../helpers/schemaToQTableColumns.js'
import defaultLang from '../meta/lang.js'

export default {
  name: 'EasyTable',
  inheritAttrs: false,
  components: {
    QTable,
    QTd,
    QCheckbox,
    QCard,
    QInput,
    QIcon,
    EfBtn,
    EasyForm,
    EasyRow,
    EasyCell,
  },
  desc: `EasyForms is a peer dependency!`,
  props: {
    // EasyTable props:
    schemaColumns: {
      category: 'column',
      type: Array,
      desc: 'The schema for the columns you want to generate. (EasyForm schema format)',
    },
    schemaGrid: {
      category: 'column',
      type: [Array, Object],
      desc: 'The schema for the grid cards you want to generate. (EasyForm schema format)',
    },
    rows: {
      category: 'general',
      desc:
        'Rows of data to display. Use `rows` instead of the QTables `data`. Renamed for clarity.',
      type: Array,
    },
    actionButtons: {
      category: 'content',
      type: Array,
      default: () => ['grid'],
      desc: `Action buttons to add to the table. These can be pre-set buttons you can add by passing a string, or custom ones by passing an object with {label, handler}.

Preset buttons include:
- 'add'
- 'grid'
- 'selection:duplicate' (this just does \`$emit('duplicate', selectionArray)\`, you must implement your own logic.`,
      examples: [`['add', 'grid', {btnLabel: 'do it', events: {click: console.log}}]`],
    },
    gridEasyFormOptions: {
      category: 'column',
      type: Object,
      default: () => ({}),
      desc: `The EasyForm options you want to use for the grid cards.
Please note:
- The 'schema' should be set via the 'schemaGrid' prop.
- 'value' and 'id' are set automatically.
- These are the default values, but they can be overridden:
  \`{ actionButtons: [] }\`
- See the documentation of EasyForm for more information on available props.`,
    },
    lang: {
      category: 'content',
      type: Object,
      desc: `The text used in the UI, eg. the 'add new record' buttons etc... Pass an object with keys: ....`,
      default: () => defaultLang,
      examples: [`{cancel: 'キャンセル', edit: '編集', save: '保存'}`],
    },
    rowClasses: {
      category: 'style',
      desc: 'Check the description at EasyRow.vue',
    },
    rowStyle: {
      category: 'style',
      desc: 'Check the description at EasyRow.vue',
    },
    // Inherited props used here:
    grid: {
      inheritedProp: true,
      type: Boolean,
      default: false,
    },
    selected: {
      inheritedProp: true,
      type: Array,
      default: () => [],
    },
    cardClass: { inheritedProp: true },
    cardStyle: { inheritedProp: true },
    // Inherited props with different defaults:
    // Modified inherited props:
    data: {
      inheritedProp: 'modified',
      desc: 'Use `rows` instead of the QTables `data`. Renamed for clarity.',
      type: Array,
    },
    columns: {
      inheritedProp: 'modified',
      desc:
        'Do not use this! Use `schemaColumns` instead. This is the prop QTable uses to define its columns. EasyTable uses `schemaColumns` instead.',
    },
    title: {
      inheritedProp: 'modified',
      desc: 'A title to be placed above your table.',
      type: String,
    },
    rowKey: {
      inheritedProp: 'modified',
      desc: 'This is fixed to `id` in an EasyTable and cannot be changed.',
    },
  },
  data () {
    const { lang, grid, selected } = this
    // merge user provided lang onto defaults
    const innerSelected = selected
    const innerLang = merge(defaultLang, lang)
    const innerGrid = grid
    // const innerFilter = filter
    return {
      // innerFilter,
      innerSelected,
      innerLang,
      innerGrid,
      defaultPagination: {
        rowsPerPage: 10,
      },
    }
  },
  watch: {
    grid (newValue) {
      this.innerGrid = newValue
    },
    selected (newValue) {
      this.innerSelected = newValue
    },
  },
  computed: {
    selectionMode () {
      const { quasarProps } = this
      return quasarProps.selection === 'single' || quasarProps.selection === 'multiple'
    },
    pagination: {
      get () {
        return this.quasarProps.pagination || this.defaultPagination
      },
      set (newPagination) {
        if (this.quasarProps.pagination) {
          return this.$emit('update:pagination', newPagination)
        }
        this.defaultPagination = newPagination
      },
    },
    usesTopSlot () {
      const { title, cActionButtons, $scopedSlots: slot } = this
      return (
        title ||
        cActionButtons.length ||
        slot['above-table'] ||
        slot['above-nav-row'] ||
        slot['top-left'] ||
        slot['top-right']
      )
    },
    quasarProps () {
      return merge(this.$attrs, {
        // Quasar props with modified behavior:
        data: this.rows,
        columns: this.cColumns,
        rowKey: 'id',
        grid: this.innerGrid,
        // Quasar props with modified defaults:
        // filter: this.$attrs.filter || this.innerFilter,
        // Quasar props just to pass:
      })
    },
    gridEasyFormProps () {
      const { gridEasyFormOptions, schemaGrid } = this
      const defaults = {
        actionButtons: [],
        mode: 'raw',
        schema: schemaGrid,
      }
      return merge(defaults, gridEasyFormOptions)
    },
    cSelected: {
      get () {
        return this.innerSelected
      },
      set (val) {
        this.innerSelected = val
        this.$emit('update:selected', val)
      },
    },
    cColumns () {
      return schemaToQTableColumns(this.schemaColumns)
    },
    cActionButtons () {
      const {
        actionButtons,
        innerLang,
        tapAdd,
        tapDuplicate,
        cSelected,
        innerGrid,
        enableGrid,
        disableGrid,
        schemaGrid,
      } = this
      const easyTableContext = this
      return actionButtons
        .map(btn => {
          if (btn === 'grid' && schemaGrid) {
            // return // 以下の機能は未完成
            return innerGrid
              ? { icon: 'view_list', flat: true, events: { click: disableGrid } }
              : { icon: 'view_module', flat: true, events: { click: enableGrid } }
          }
          if (cSelected.length) {
            if (btn === 'selection:duplicate') {
              return {
                btnLabel: innerLang['duplicate'],
                push: true,
                events: { click: tapDuplicate },
              }
            }
          }
          if (!cSelected.length) {
            if (btn === 'add') {
              return { btnLabel: innerLang['add'], push: true, events: { click: tapAdd } }
            }
          }
          if (isPlainObject(btn)) {
            if (!isPlainObject(btn.events)) return btn
            const { click } = btn.events
            if (isFunction(click)) btn.events.click = val => click(val, easyTableContext)
            return btn
          }
        })
        .filter(btn => isPlainObject(btn))
    },
  },
  methods: {
    flattenArray,
    pathToProp,
    merge,
    enableGrid () {
      this.innerGrid = true
    },
    disableGrid () {
      this.innerGrid = false
    },
    tapAdd () {
      this.$emit('add')
    },
    tapDuplicate () {
      this.$emit('duplicate', this.cSelected)
    },
    onRowClick (event, rowData, origin, gridItemProps) {
      const { selectionMode } = this
      if (origin === 'grid' && selectionMode) {
        gridItemProps.selected = !gridItemProps.selected
      }
      this.$emit('row-click', event, rowData)
    },
    onInputCell (rowId, colId, value) {
      this.$emit('input-cell', { rowId, colId, value })
    },
  },
}
</script>
