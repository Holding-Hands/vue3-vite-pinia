<template>
  <dragTable :table="tableList" :headers="initialHeaders" @row-sort="handleRowSort" />
</template>

<script setup lang="ts">
import dragTable from '@/components/DraggableTable/DraggableTable.vue'

const tableList = [
  {
    id: '1',
    name: 'name1',
    icon: '',
    thumb: 'thumb1',
  },
  {
    id: '2',
    name: 'name3',
    icon: '',
    thumb: 'thumb2',
  },
]
let initialHeaders = reactive([
  {
    id: '1',
    property: 'id',
    width: '88',
    label: 'ID',
    show: true,
  },
  {
    id: '2',
    property: 'name',
    width: '121',
    label: '111',
    show: true,
  },
  {
    id: '3',
    property: 'thumb',
    width: '139',
    label: '222',
    show: true,
  },
  {
    id: '4',
    property: 'icon',
    width: '99',
    label: '333',
    show: true,
  },
])
const handleRowSort = () => {
  console.log('应用的.Vue 文件做相应的操作')
}
</script>

<style scoped lang="scss"></style>
