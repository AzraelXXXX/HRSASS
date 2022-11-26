<template>
  <el-dropdown trigger="click" @command="changeLanguage">
    <!-- 显示图标 -->
    <div>
      <svg-icon icon-class="language" style="color: #fff; font-size: 20px" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="zh" :disabled="'zh'=== $i18n.locale ">ZH</el-dropdown-item>
      <el-dropdown-item command="en" :disabled="'en'=== $i18n.locale ">EN</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import Cookie from 'js-cookie'
export default {
  methods: {
    changeLanguage(type) {
      // 设置类型
      Cookie.set('language', type)
      // 改变当前的多语言
      this.$i18n.locale = type
      this.$message.success('切换多语言成功')
    }
  }
}
</script>

<style>

</style>
