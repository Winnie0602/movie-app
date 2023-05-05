<template>
  <div>
    <!-- <img src="@/assets/cinema.jpg" class="bg"> -->
    <NavBar />
    <router-view />
    <footer class="bg-dark py-4 mt-auto">
        <div class="container px-5">
            <div class="row align-items-center justify-content-between flex-column flex-sm-row">
                <div class="col-auto"><div class="small m-0 text-white">Copyright &copy; Your Website 2023</div></div>
                <div class="col-auto">
                </div>
            </div>
        </div>
    </footer>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
// import axios from 'axios';
// import { projectFirestore } from '@/firebase/config'


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
img.bg {
  min-height: 100%;
  min-width: 1024px;
  width: 100%;
  height: auto;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -2;
}
</style>
