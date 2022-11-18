<template>
  <div>
    <!-- 给action一个#号 就不会报错了 -->
    <!-- file-list时上传的文件列表 可以绑定到上传组件上，让上传组件来显示 -->
    <el-upload
      list-type="picture-card"
      :limit="1"
      action="#"
      :on-preview="preview"
      :file-list="fileList"
      :class="{disabled: fileComputed}"
      :on-remove="handleRemove"
      :on-change="changeFile"
      :before-upload="beforeUpload"
      :http-request="upload"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog title="图片预览" :visible.sync="showDialog" width="600px">
      <img :src="imgUrl" alt="" style="width: 100%">
    </el-dialog>
    <el-progress v-if="showPercent" :percentage="percent" style="width: 180px" />
  </div>
</template>

<script>
// 引入腾讯云cos包
import COS from 'cos-js-sdk-v5'
// 实例化COS对象
const cos = new COS({
  // 身份认证ID
  SecretId: 'AKIDZ2Sq9nIhz50Xv76tX0FICuNhtCqLh5Qb',
  // 身份密钥
  SecretKey: '2ujSQDoFVZSGtDMH1ZxHTREzEFB0hBQS'
})
export default {
  data() {
    return {
      fileList: [],
      showDialog: false,
      imgUrl: '',
      currentFileUid: null,
      // 当前的百分比
      percent: 0,
      showPercent: false
    }
  },
  computed: {
    // 如果它为true
    fileComputed() {
      return this.fileList.length === 1
    }
  },
  methods: {
    // 点击预览事件
    preview(file) {
      this.imgUrl = file.url
      this.showDialog = true
    },
    // 点击删除事件    file是要删除的文件，fileList是删过之后的文件
    handleRemove(file, fileList) {
      this.fileList = this.fileList.filter(item => item.uid !== file.uid)
      // this.fileList = fileList
    },
    // 点击添加事件     file是当前的文件，fileList是当前的最新数组
    changeFile(file, fileList) {
      this.fileList = fileList.map(item => item)
    },
    // 上传文件之前的钩子
    beforeUpload(file) {
      // 先检查文件的类型
      const types = ['image/jpg', 'image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (!types.some(item => item === file.type)) {
        // 如果不存在  上传终止
        this.$message.error('上传图片只能是 JPG、JPEG、GIF、BMP、PNG 格式！')
        return false
      }
      // 检查文件大小  限制5M
      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        // 超过了限制的文件大小
        this.$message.error('上传的图片大小不能大于5M')
        return false
      }
      // 已经确定当前上传的就是当前的这个file了
      this.currentFileUid = file.uid
      this.showPercent = true
      // 最后一定要return true
      return true
    },
    // 进行上传操作
    upload(params) {
      if (params.file) {
        // 执行上传操作
        cos.putObject({
          // 存储桶的名称
          Bucket: 'xx-1315151290',
          // 地域名称
          Region: 'ap-nanjing',
          // 唯一标识
          Key: params.file.name,
          // 要上传的文件对象
          Body: params.file,
          // 上传的模式类型，默认类型即可
          StorageClass: 'STANDARD',
          onProgress: (params) => {
            this.percent = params.percent * 100
          }
        }, (err, data) => {
          if (!err && data.statusCode === 200) {
            this.fileList = this.fileList.map(item => {
              if (item.uid === this.currentFileUid) {
                // upload为true 表示这张图片已经上传完毕
                return { url: 'http://' + data.Location, upload: true }
              }
              return item
            })
            // 关闭进度条，重置百分比
            setTimeout(() => {
              this.showPercent = false
              this.percent = 0
            }, 1000)
          }
        })
      }
    }
  }
}
</script>

<style>
.disabled .el-upload--picture-card {
  display: none;
}
</style>
