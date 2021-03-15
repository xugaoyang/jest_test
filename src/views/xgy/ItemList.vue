<template>
  <div class="item-list-view" style="height:100%">
    <item v-for="item in list" :key="item.id" :item="item"></item>

    <div class="text">{{msg}}</div>
    <child v-if="show" @child-emit-parent="msgChange()"></child>
  </div>
</template>

<script>
import fetchListData from '@/services/api'
import Item from './Item'
import Child from './Child'

export default {
  data() {
    return {
      list: [],
      msg: 'show',
      show: true
    }
  },
  components: {
    Item,
    Child
  },
  computed: {
  },
  methods: {
    msgChange() {
      this.msg = 'hide'
      this.show = false
    },
    loadItems() {
      this.$bar.start()
      fetchListData().then((data) => {
        this.list = data.data.dataList
        // setTimeout(() => {
        this.$bar.finish()
        // }, 1000)
      })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mounted() {
    this.loadItems()
  }
}
</script>
