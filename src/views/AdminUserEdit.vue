<template>
  <div class="about">
    <h1>{{ id ? "编辑" : "新建" }}管理员</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item label="管理员类别">
        <el-select v-model="model.identity">
          <el-option label="超级管理员" value="manager"></el-option>
          <el-option label="普通管理员" value="employee"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
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
    // "5cf9f7bbcec8af1f4022cbe3"
    // "manager"
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`/rest/admin_users/${this.id}`, this.model);
      } else {
        res = await this.$http.post("/rest/admin_users", this.model);
      }
      this.$router.push("/admin_users/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    // 根据id获取数据
    async fetch() {
      const res = await this.$http.get(`/rest/admin_users/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>

