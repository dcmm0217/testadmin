<template>
  <el-upload
    class="avatar-uploader"
    :action="uploadUrl"
    :headers="getAuthHeaders()"
    :show-file-list="false"
    :on-success="afterUpload"
  >
    <img v-if="img" :src="img" class="avatar" />
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>
<script>
export default {
  props: {
    img: String,
    afterUpload:Function
  },
  name: "uploadimg",
  methods:{

  }
};
</script>
