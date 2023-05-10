<template>
  <div>
    <NavBar />
    <router-view/>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";


export default {
  name: 'MainPageView',
  components: {
    NavBar,
  },
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>
<style scoped>
</style>
