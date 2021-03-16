<template>
  <div class="progress-bar" :class="{'hidden':hidden}" :style="`width:${percent}%`">
  </div>
</template>

<script>

export default {
  data() {
    return {
      hidden: true,
      percent: 0,
      timer: null
    }
  },
  components: {},
  methods: {
    start() {
      this.hidden = false
      this.percent = 0
      this.timer = setInterval(() => {
        this.percent += 1
      }, 100)
    },
    finish() {
      this.hidden = true
      this.percent = 100
      clearInterval(this.timer)
    }
  },
  created() {

  },
  destroyed() {

  }
}
</script>

<style scoped>
.progress-bar {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  height: 2px;
  width: 0%;
  transition: width 0.2s, opacity 0.4s;
  opacity: 1;
  background-color: #ffca2b;
  z-index: 999999;
}
.hidden {
  opacity: 0;
}
.error {
  background-color: #ff0000;
}
</style>
