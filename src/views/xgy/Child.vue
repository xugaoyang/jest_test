<template>
  <div>
    <button @click="$emit('child-emit-parent')">button</button>
  </div>
</template>
<script>
export default {
  props: ['testProp'],
  methods: {}
}
</script>
