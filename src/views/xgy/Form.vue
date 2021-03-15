<template>
  <div>
    <div>
      <span>用户名：</span>
      <input type="text" v-model="name" />
    </div>
    <div>
      <span>密码：</span>
      <input type="password" v-model="password" />
    </div>
    <div>
      <span>记住密码：</span>
      <input type="checkbox" v-model="rememberPwd" value="记住密码" />
    </div>
    <div>
      <button @click="submit()">提交</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      password: '',
      rememberPwd: false
    }
  },
  components: {},
  methods: {
    submit() {
      this.axios.post('http://www.baidu.com', { name: this.name, password: this.password, remenberPwd: this.rememberPwd })
    }
  },
  created() {
  },
  destroyed() {

  }
}
</script>
