<template>
  <div v-loading="loading" class="dashboard-container">
    <div class="app-container">
      <!-- 组织架构的内容-头部 -->
      <el-card class="tree-card">
        <tree-tools :tree-node="company" :is-root="true" @addDepts="addDepts" />
        <!-- 放置树形结构 -->
        <el-tree :data="departs" :props="defaultProps" default-expand-all>
          <!-- 传入内容 -->
          <tree-tools slot-scope="{ data }" :tree-node="data" @addDepts="addDepts" @delDepts="getDepartments" @editDepts="editDepartments" />
        </el-tree>
      </el-card>
    </div>
    <!-- 放置新增弹层 -->
    <add-dept ref="addDept" :show-dialog.sync="showDialog" :tree-node="node" @addDepts="getDepartments" />
  </div>
</template>

<script>
import TreeTools from './components/tree-tools'
import AddDept from './components/add-dept.vue'
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils'
export default {
  components: { TreeTools, AddDept },
  data() {
    return {
      // 头部的数据结构
      company: {},
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      departs: [],
      // 默认不显示弹层
      showDialog: false,
      // 记录当前点击的node节点
      node: null,
      loading: false
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      this.loading = true
      const result = await getDepartments()
      this.company = { name: result.companyName, manager: '负责人', id: '' }
      this.departs = tranListToTreeData(result.depts, '')
      this.loading = false
    },
    // 监听tree-tools中触发的点击添加子部门事件
    addDepts(node) {
      this.showDialog = true
      this.node = node
    },
    editDepartments(node) {
      this.showDialog = true
      this.node = node
      // 应该在这里调用获取部门详情的方法
      this.$refs.addDept.getDepartDetail(node.id)
    }
  }
}
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
