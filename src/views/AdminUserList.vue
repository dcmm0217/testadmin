<template>
  <div class="about">
    <h1>管理员列表</h1>
    <el-table :data="items">
      <el-table-column
        prop="_id"
        label="ID"
        width="220"
        align="center"
      ></el-table-column>
      <el-table-column prop="date" label="创建时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.date | timestampToTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        align="center"
      ></el-table-column>
      <el-table-column prop="identity" label="管理员类别" align="center">
        <template slot-scope="scope">
          <span>{{
            scope.row.identity == "manager" ? "超级管理员" : "普通管理员"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="loginDate" label="最后登录时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.loginDate | timestampToTime }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/admin_users/edit/${scope.row._id}`)"
            >编辑</el-button
          >
          <el-button type="text" size="small" @click="remove(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: []
    };
  },
  methods: {
    // 获取所有数据
    async fetch() {
      const res = await this.$http.get("/rest/admin_users");
      this.items = res.data;
      console.log(res.data);
    },
    // 根据id删除数据
    async remove(row) {
      if (row._id === "5cf9f7bbcec8af1f4022cbe3") {
        this.$message({
          message: "此用户是超级管理员不能删除！",
          type: "warning"
        });
        return false;
      }
      this.$confirm(`是否确定删除"${row.username}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const res = await this.$http.delete(`/rest/admin_users/${row._id}`);
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.fetch();
      });
    }
  },
  created() {
    this.fetch();
  },
  filters: {
    timestampToTime(time) {
      var date = new Date(time); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      var h = date.getHours() + ":";
      var m = date.getMinutes() + ":";
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
    }
  }
};
</script>

