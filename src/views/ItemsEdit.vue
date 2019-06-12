<template>
  <div class="about">
    <h1>{{ id ? "编辑" : "新建" }}物品</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-col :span="6"><el-input v-model="model.name"></el-input></el-col>
      </el-form-item>
      <el-form-item label="图标">
        <!--      <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload> -->
        <UploadImg :img="model.icon" :afterUpload="afterUpload"></UploadImg>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import UploadImg from "../components/UploadImg";
export default {
  components: {
    UploadImg
  },
  props: {
    id: {}
  },
  data() {
    return {
      model: {}
    };
  },
  methods: {
    // 保存数据（修改数据）
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`/rest/items/${this.id}`, this.model);
      } else {
        res = await this.$http.post("/rest/items", this.model);
      }
      this.$router.push("/items/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    // 根据id获取数据
    async fetch() {
      const res = await this.$http.get(`/rest/items/${this.id}`);
      this.model = res.data;
    },
    afterUpload(res) {
      this.$set(this.model, "icon", res.url);
      // this.model.icon = res.url
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>
<style>
</style>


