<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside width="210px">
        <layout-menu />
      </el-aside>
      <el-container class="page">
        <el-header class="page-header">
          <layout-header />
        </el-header>
        <el-main class="page-content">
          <!-- 路由出口 路由匹配到的组件将渲染在这里 -->
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .main-content,
  .page {
    height: 100%;
  }

  .page-content {
    height: calc(100% - 48px);
  }

  .el-header,
  .el-footer {
    display: flex;
    color: #333;
    text-align: center;
    align-items: center;
  }

  .el-header {
    height: 48px !important;
  }

  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    transition: width 0.3s linear;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .el-main {
    color: #333;
    text-align: center;
    background-color: #f0f2f5;
  }
}
</style>
