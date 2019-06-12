<template>
  <div class="login-container">
    <el-card header="请先登录" class="login-card">
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="text" v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "login",
  components: {},
  data() {
    return {
      model: {
        username:'admin',
        password:'12345678',
        loginDate: new Date()
      }
    };
  },
  methods: {
    login() {
      console.log()
       console.log()
       if(this.model.username=='admin'&&this.model.password=='12345678'){
         localStorage.token=this.model.password
         this.$router.push("/");
       }else{
         this.$message({
             type: 'error',
             message:'账号或者密码错误！'
         })
       }
    }
  },
  created() {
    if (localStorage.token) {
      //登陆了自动跳到首页，来阻止重复登陆
      this.$router.push("/");
    }
  }
};
</script>
<style>
.login-container {
  width: 100%;
  height: 100%;
  background-color: rgb(218, 218, 218);
  overflow: hidden;
}
.login-card {
  width: 30rem;
  margin: 6rem auto;
  background-color: #fff;
}
</style>

