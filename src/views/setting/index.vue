<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 放置内容 -->
      <el-card>
        <el-tabs>
          <el-tab-pane label="角色管理" name="first">
            <!-- 左侧的内容 -->
            <el-row style="height: 60px">
              <el-button type="primary" icon="el-icon-plus" size="small" @click="showDialog = true">新增角色</el-button>
            </el-row>
            <el-table border :data="list">
              <el-table-column type="index" align="center" label="序号" width="120" />
              <el-table-column prop="name" align="center" label="名称" width="240" />
              <el-table-column prop="description" align="center" label="描述" />
              <el-table-column label="操作" align="center">
                <template slot-scope="{ row }">
                  <el-button size="mini" type="success">分配权限</el-button>
                  <el-button size="mini" type="primary" @click="editRole(row.id)">编辑</el-button>
                  <el-button size="mini" type="danger" @click="deleteRole(row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 放置分页组件 -->
            <el-row type="flex" justify="center" align="middle" style="height: 60px">
              <el-pagination layout="prev, pager, next" :total="page.total" :page-size="page.pagesize" :current-page="page.page" @current-change="changePage" />
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息" name="second">
            <el-alert type="info" :show-icon="true" :closable="false" title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改" />
            <!-- 右侧的内容 -->
            <el-form label-width="120px" style="margin-top: 50px">
              <el-form-item label="企业名称">
                <el-input v-model="formData.name" disabled style="width: 400px" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="formData.companyAddress" disabled style="width: 400px" />
              </el-form-item>
              <el-form-item label="电话">
                <el-input v-model="formData.companyPhone" disabled style="width: 400px" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="formData.mailbox" disabled style="width: 400px" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="formData.remarks" type="textarea" :rows="3" disabled style="width: 400px" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <!-- 放置一个弹层组件 -->
    <el-dialog title="编辑部门" :visible="showDialog" @close="btnCancel">
      <el-form ref="roleForm" label-width="120px" :model="roleForm" :rules="rules">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleForm.name" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="roleForm.description" />
        </el-form-item>
      </el-form>
      <!-- 放置footer插槽 -->
      <el-row type="flex" justify="end">
        <el-col :span="6">
          <el-button size="small" @click="btnCancel">取消</el-button>
          <el-button size="small" type="primary" @click="btnOk">确定</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getRoleList, delRoleList, getRoleDetail, updateRoleDetail, addRole, getCompanyInfo } from '@/api/setting'
export default {
  data() {
    return {
      // 承接角色列表
      list: [],
      // 放置页码及相关数据
      page: {
        page: 1,
        pagesize: 10,
        total: 0
      },
      // 公司信息
      formData: {},
      showDialog: false,
      roleForm: {
        name: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  created() {
    this.getRoleList()
    this.getCompanyInfo()
  },
  methods: {
    async getCompanyInfo() {
      this.formData = await getCompanyInfo(this.companyId)
    },
    async getRoleList() {
      const { total, rows } = await getRoleList(this.page)
      this.page.total = total
      this.list = rows
    },
    changePage(newPage) {
      this.page.page = newPage
      this.getRoleList()
    },
    async deleteRole(id) {
      const res = await this.$confirm('确定删除该角色吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (res === 'cancel') return this.$message.info('已取消删除')
      await delRoleList(id)
      this.getRoleList()
      this.$message.success('删除角色成功')
    },
    async editRole(id) {
      this.roleForm = await getRoleDetail(id)
      this.showDialog = true
    },
    btnCancel() {
      this.roleForm = {
        name: '',
        description: ''
      }
      this.$refs.roleForm.resetFields()
      this.showDialog = false
    },
    btnOk() {
      this.$refs.roleForm.validate(async valid => {
        if (valid) {
          if (this.roleForm.id) {
            await updateRoleDetail(this.roleForm)
          } else {
            // 新增业务
            await addRole(this.roleForm)
          }
          // 重新拉取数据
          this.getRoleList()
          this.showDialog = false
          this.$message.success('操作成功')
        }
      })
    }
  }
}
</script>

<style></style>
