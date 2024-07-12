<template>
  <div ref="table_ref" class="t-table">
    <el-table
      ref="tables"
      class="draggable"
      :data="state.tableData"
      row-key="normId"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <!-- 拖拽 -->
      <el-table-column align="center" label="" width="80">
        <template #default>
          <el-icon class="icon">
            <!--  使用自动导入图标要加 在Menu组件前面加上 i-ep- 就行了   -->
            <i-ep-Menu />
          </el-icon>
        </template>
      </el-table-column>
      <template v-for="item in state.tableHeaders" :key="item.id">
        <el-table-column :property="item.property" :min-width="item.width" align="center" show-overflow-tooltip>
          <template #header>
            <p style="margin: 0; display: flex; justify-content: center">
              {{ item.label }}
            </p>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>
<script setup lang="ts">
import Sortable, { SortableEvent } from 'sortablejs'

const props = defineProps<{
  // 列表数据
  table: any
  // 表头数据
  headers: {
    id: string
    property: string
    width: string
    label: string
    show: boolean
  }[]
}>()
// 初始化数据
const state = reactive({
  tableData: props.table,
  tableHeaders: props.headers,
})
// 获取el-table ref
const tables: any = ref<HTMLElement | null>(null)
// 获取t-table ref
const table_ref: any = ref<HTMLElement | null>(null)
// 抛出事件 在 应用的.Vue 文件做相应的操作
const emits = defineEmits(['rowSort'])
// 监听移动的 表格数据 重新赋值
watch(
  () => props.table,
  (val) => {
    state.tableData = val
  },
  { deep: true }
)
onMounted(() => {
  initSort()
})
// 行拖拽
const initSort = () => {
  const el = table_ref.value.querySelector('.el-table__body-wrapper .el-table__body tbody')
  Sortable.create(el, {
    animation: 150, // 动画
    //  可被拖拽的子元素
    // draggable: '.draggable .el-table__row',
    handle: '.icon',
    onEnd: (event: SortableEvent) => {
      console.log(event, 'event')
      if (event.oldIndex !== undefined && event.newIndex !== undefined) {
        const curRow = state.tableData.splice(event.oldIndex, 1)[0]
        state.tableData.splice(event.newIndex, 0, curRow)
        emits('rowSort', state.tableData)
      }
    },
  })
}
</script>
