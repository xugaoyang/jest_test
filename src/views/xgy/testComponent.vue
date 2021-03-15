<template>
<div>
  <child testProp="some-value"></child>
  <a href="https://www.baidu.com" style="color:red">百度link</a>
</div>
</template>

<script>
import Child from './Child'

export default {
  components: { Child }
}
</script>
