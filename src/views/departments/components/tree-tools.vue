<template>
  <el-row type="flex" justify="space-between" align="middle" style="height: 40px; width: 100%;">
    <!-- 左侧内容 -->
    <el-col>
      <span>{{ treeNode.name }}</span>
    </el-col>
    <!-- 右侧内容 -->
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <!-- 下拉菜单 -->
          <el-dropdown @command="operateDepts">
            <span>操作<i class="el-icon-arrow-down" /></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add" :disabled="!checkPermission('add-dept')">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit">修改部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="del">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartments } from '@/api/departments'
export default {
  props: {
    // 定义传入的属性
    treeNode: {
      required: true,
      type: Object
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 点击编辑 删除 新增时触发
    async operateDepts(type) {
      if (type === 'add') {
        // 添加子部门
        // 告诉父组件 显示弹层    this.treeNode就是当前点击的部门
        this.$emit('addDepts', this.treeNode)
      } else if (type === 'edit') {
        // 修改部门
        this.$emit('editDepts', this.treeNode)
      } else {
        // 删除部门
        const res = await this.$confirm('您确定要删除该组织部门吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err)
        if (res === 'cancel') return this.$message.info('已取消删除')
        await delDepartments(this.treeNode.id)
        // 触发自定义事件
        this.$emit('delDepts')
        this.$message.success('删除部门成功')
      }
    }
  }
}
</script>

<style>

</style>
