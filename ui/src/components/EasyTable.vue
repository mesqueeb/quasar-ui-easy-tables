<template>
  <div class="easy-table">
    <div class="easy-table__nav-row" v-if="title || cActionButtons.length">
      <div class="easy-table__title">{{ title }}</div>
      <EfBtn
        v-for="btn in cActionButtons"
        :key="btn.btnLabel"
        v-bind="btn"
        v-on="btn.events"
      />
    </div>
    <q-table
      class="easy-table__table"
      v-bind="quasarProps"
      :selected.sync="cSelected"
      :pagination.sync="tablePagination"
    >
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

          @row-input="({rowId, fieldId, value}) => onInputCell(rowId, fieldId, value)"
          v-slot="EasyFormSimulatedContext"
        >
          <q-td auto-width v-if="quasarProps.selection">
            <q-checkbox :dense="true" v-model="rowProps.selected" />
          </q-td>
          <q-td
            auto-width
            v-for="blueprint in schemaColumns"
            :key="blueprint.id"
            :props="rowProps"
            @click.native="e => onRowClick(e, rowProps.row)"
          >
            <!-- requires row, blueprint, value -->
            <EasyCell
              v-bind="merge(blueprint, EasyFormSimulatedContext)"
              :value="pathToProp(EasyFormSimulatedContext.formDataNested, blueprint.id)"
              @input="val => onInputCell(rowProps.row.id, blueprint.id, val)"
            />
          </q-td>
        </EasyRow>
      </template>
      <!-- Grid item -->
      <template v-slot:item="gridItemProps">
        <q-card
          :class="flattenArray(['easy-table__grid-item', cardClass])"
          :style="cardStyle"
          @click="e => onRowClick(e, gridItemProps.row)"
        >
          <EasyForm
            :value="gridItemProps.row"
            :id="gridItemProps.row.id"
            v-bind="gridEasyFormProps"
            @field-input="({id: fieldId, value}) => onInputCell(gridItemProps.row.id, fieldId, value)"
          />
        </q-card>
      </template>
    </q-table>
  </div>
</template>

<style lang="sass">
// $
@import '../index.sass'

.easy-table
  display: flex
  flex-direction: column
  th
    white-space: pre
.easy-table__nav-row
  min-height: 42px
  display: grid
  justify-content: stretch
  align-content: start
  align-items: center
  grid-gap: $md
  grid-auto-flow: column
  margin-bottom: $md
  grid-template-columns: 1fr
.easy-table__grid-item
  margin: $sm
  padding: $md
  .easy-field__sub-label
    display: none
.easy-table__title
  font-size: 20px

</style>

<script>
import pathToProp from 'path-to-prop'
import merge from 'merge-anything'
import { flattenArray } from 'flatten-anything'
import { isPlainObject, isFunction } from 'is-what'
import { QTable, QTd, QCheckbox, QCard } from 'quasar'
import { EfBtn, EasyForm } from 'quasar-ui-easy-forms'
import EasyRow from './EasyRow.vue'
import EasyCell from './EasyCell.vue'
import schemaToQuasarColumns from '../helpers/schemaToQuasarColumns.js'
import defaultLang from '../meta/lang.js'

export default {
  name: 'EasyTable',
  inheritAttrs: false,
  components: { QTable, QTd, QCheckbox, QCard, EfBtn, EasyForm, EasyRow, EasyCell },
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
      desc: 'Rows of data to display. Use `rows` instead of the QTables `data`. Renamed for clarity.',
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
      default: () => []
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
      desc: 'Do not use this! Use `schemaColumns` instead. This is the prop QTable uses to define its columns. EasyTable uses `schemaColumns` instead.',
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
    return {
      innerSelected,
      innerLang,
      innerGrid,
      tablePagination: {
        rowsPerPage: 10,
      }
    }
  },
  watch: {
    grid (newValue) { this.innerGrid = newValue },
    selected (newValue) { this.innerSelected = newValue },
  },
  computed: {
    quasarProps () {
      return merge(this.$attrs, {
        // Quasar props with modified behavior:
        data: this.rows,
        columns: this.cColumns,
        rowKey: 'id',
        grid: this.innerGrid,
        // Quasar props with modified defaults:
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
      get () { return this.innerSelected },
      set (val) { this.innerSelected = val; this.$emit('update:selected', val) },
    },
    cColumns () {
      return schemaToQuasarColumns(this.schemaColumns)
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
      return actionButtons.map(btn => {
        if (btn === 'grid' && schemaGrid) {
          // return // 以下の機能は未完成
          return (innerGrid)
            ? {icon: 'view_list', flat: true, events: {click: disableGrid}}
            : {icon: 'view_module', flat: true, events: {click: enableGrid}}
        }
        if (cSelected.length) {
          if (btn === 'selection:duplicate') {
            return {btnLabel: innerLang['duplicate'], push: true, events: {click: tapDuplicate}}
          }
        }
        if (!cSelected.length) {
          if (btn === 'add') {
            return {btnLabel: innerLang['add'], push: true, events: {click: tapAdd}}
          }
        }
        if (isPlainObject(btn)) {
          if (!isPlainObject(btn.events)) return btn
          const { click } = btn.events
          if (isFunction(click)) btn.events.click = val => click(val, easyTableContext)
          return btn
        }
      }).filter(btn => isPlainObject(btn))
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
    tapAdd () { this.$emit('add') },
    tapDuplicate () { this.$emit('duplicate', this.cSelected) },
    onRowClick (event, rowData) { this.$emit('row-click', event, rowData) },
    onInputCell (rowId, colId, value) { this.$emit('input-cell', {rowId, colId, value}) },
  }
}
</script>
