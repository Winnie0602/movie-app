<template>
  <div class="home">
    <NavBar />
    <div class="container my-5">
      <div class="mt-5">
        <h3 class="mt-5">熱門電影排行</h3>
        <div class="row justify-content-center">
            <div class="col-auto my-3" v-for="movie in moviesArr" :key="movie.id">
              <MovieCard :movie="movie" @openModal="openModal" />
            </div>
        </div>
          <!-- <div class="row justify-content-center">
            <div class="col-auto" v-for="movie in moviesArr" :key="movie.id">
              <MovieCard :movie="movie" />
            </div>
          </div> -->
      </div>
  </div>
  <Modal :movie="selectedMovie" />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import ChartTab from '@/components/ChartTab.vue';
import axios from 'axios';
import MovieCard from '@/components/MovieCard.vue';
import Modal from '@/components/Modal.vue';
// import { projectFirestore } from '@/firebase/config'


export default {
  name: 'HomeView',
  components: {
    ChartTab,
    MovieCard,
    NavBar,
    Modal,
},
  data() {
    return {
      moviesArr: [],
      apiURL: "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=4c23b7c5b770be132a4c04fcca54c52e&page=2",
      searchURL: "https://api.themoviedb.org/3/search/movie?api_key=4c23b7c5b770be132a4c04fcca54c52e&query='",
      selectedMovie: false,
    }
  },
  mounted() {
    this.getMovieApi()
  },
  methods: {
    getMovieApi() {
      axios.get(this.apiURL)
      .then((res) => {
        this.moviesArr = res.data.results;
      }).catch((err) => {
        console.log(err)
      })
    },
    openModal(movie) {
      this.selectedMovie = movie
    }
  }
}
</script>
