<template>
  <div class="header-section">
    <div class="search">
      <search @search="submit_search"></search>
    </div>
    <menu-right></menu-right>
  </div>
</template>
<script type="text/javascript">
  import menuRight from './menuRight/index.vue'
  import search from 'components/search'

  export default{
    components: {
      menuRight,
      search
    },
    methods: {
      submit_search(value) {
        /*this.$message({
          message: value,
          type: 'success'
        })*/
        this.$router.push({name: "search",params: {keyword: value}})
      }
    }
  }
</script>
