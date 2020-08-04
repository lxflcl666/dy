<template>
  <div>
    {{datalist}}
  </div>
</template>
<script>
export default {
  data () {
    return {
      datalist: []
    }
  },
  mounted () {
    let rid = this.$route.params.rid
    this.datalist = rid
  }
}
</script>
<style scoped>
  div{margin-top:120px;z-index: -1;}
</style>
