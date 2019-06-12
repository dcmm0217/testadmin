<template>
  <div class="about">
    <h1>{{ id ? "编辑" : "新建" }}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs value="baseInfo" type="border-card">
        <el-tab-pane label="基础信息" name="baseInfo">
          <el-form-item label="英雄名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="英雄头像">
         <!--    <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="afterUpload"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload> -->
            <UploadImg :img=model.avatar :afterUpload=afterUpload></UploadImg> 
          </el-form-item>
          <el-form-item label="英雄称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="英雄类型">
            <el-select v-model="model.categories" multiple>
              <el-option
                v-for="item of categories"
                :label="item.name"
                :value="item._id"
                :key="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate
              style="margin-top:0.6rem;"
              :max="9"
              show-score
              v-model="model.scores.difficult"
            ></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate
              style="margin-top:0.6rem;"
              :max="9"
              show-score
              v-model="model.scores.skills"
            ></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate
              style="margin-top:0.6rem;"
              :max="9"
              show-score
              v-model="model.scores.attack"
            ></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate
              style="margin-top:0.6rem;"
              :max="9"
              show-score
              v-model="model.scores.survive"
            ></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" multiple>
              <el-option
                v-for="item of items"
                :label="item.name"
                :value="item._id"
                :key="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" multiple>
              <el-option
                v-for="item of items"
                :label="item.name"
                :value="item._id"
                :key="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane v-if="model._id" label="技能" name="skills">
          <el-button type="primary" size="small" @click="model.skills.push({})"
            ><i class="el-icon-plus"></i>添加技能</el-button
          >
          <el-row type="flex" style="flex-wrap:wrap">
            <el-col
              style="margin-top: 2rem"
              :md="12"
              v-for="(item, i) in model.skills"
              :key="i"
            >
              <el-form-item style="margin-bottom:0.5rem" label="技能名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item style="margin-bottom:0.5rem" label="技能图标">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :headers="getAuthHeaders()"
                  :show-file-list="false"
                  :on-success="res => $set(item, 'icon', res.url)"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <!-- <UploadImg :img=item.icon :afterUpload=afterUpload></UploadImg> -->
              </el-form-item>
              <el-form-item style="margin-bottom:0.5rem" label="技能描述">
                <el-input v-model="item.description" type="textarea"></el-input>
              </el-form-item>
              <el-form-item style="margin-bottom:0.5rem" label="技能小提示">
                <el-input v-model="item.tips" type="textarea"></el-input>
              </el-form-item>
              <el-form-item style="margin-bottom:0.3rem">
                <el-button
                  style="margin-left:7.5rem"
                  size="small"
                  type="danger"
                  @click="model.skills.splice(i, 1)"
                  >删除</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item style="margin-top:1rem">
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
      categories: [],
      items: [],
      model: {
        name: "",
        avatar: "",
        scores: {
          difficult: 0,
          skills: 0,
          attack: 0,
          survive: 0
        }
      }
    };
  },
  methods: {
    // 保存数据（修改数据）
    async save() {
      let res;
      if (this.id) {
        // 修改数据
        res = await this.$http.put(`/rest/heroes/${this.id}`, this.model);
      } else {
        res = await this.$http.post("/rest/heroes", this.model);
      }
      this.$router.push("/heroes/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    // 根据id获取数据
    async fetch() {
      const res = await this.$http.get(`/rest/heroes/${this.id}`);
      // this.model = res.data
      this.model = Object.assign({}, this.model, res.data);
      console.log(this.model._id);
    },
    // 获取英雄类型数据
    async fetchCategories() {
      const res = await this.$http.get(`/rest/categories`);
      this.categories = res.data;
    },
    // 获取装备数据
    async fetchItems() {
      const res = await this.$http.get(`/rest/items`);
      this.items = res.data;
    },
    // 获取图片
    afterUpload(res) {
      this.$set(this.model,'avatar',res.url)
      // this.$set(item, 'icon', res.url)
   
    }
  },
  created() {
    this.fetchCategories();
    this.id && this.fetch();
    this.fetchItems();
  }
};
</script>
<style>
</style>


