<template>
    <div>
        <NavBar />
        <div class="container my-5">
            <div class="mt-5">
                <h3 class="mt-5 text-dark fw-bolder">- My Favorite Movies -</h3>
                <div v-if="!isLoaded" class="spinner-border mt-5" role="status">
                    <span  class="visually-hidden">Loading...</span>
                </div>
                <div v-else>
                    <div v-if="accountFavoriteMovies.length === 0">
                    <span class="material-symbols-outlined mt-5" style="color: red;">error</span>
                    <h5 class="mt-3">Oh, You don't have favorite movies ... </h5>
                    <h5 class="mt-2">try to get some interesting movies?</h5>
                </div>
                <div v-else class="d-flex flex-wrap justify-content-center rounded mt-3">
                    <div v-for="movie in accountFavoriteMovies" :key="movie.id" class="card m-3"
                        style="width: 18rem; height: 460px;">
                        <button class="more-info-btn btn btn-light" @click="openMovieDetailPage(movie)">詳細資訊</button>
                        <div class="profile-img">
                            <img :src="$store.state.baseImgPath + movie.img" alt="Movie pic" class="card-img-top img-fluid"
                                style="height: 380px; object-fit: fill" />
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">{{ movie.title.substring(0, 48) }}
                            </h5>
                        </div>
                    </div>
                </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import { projectFirestore } from "@/firebase/config";

export default {
    name: "FavoriteMoviesView",
    components: {
        NavBar,
    },
    data() {
        return {
            isLoaded: false, // 是否讀取到firebase資料, 讀取到才渲染畫面
        }
    },
    computed: {
        accountFavoriteMovies() {
            return this.$store.state.accountFavoriteMovies;
        }
    },
    mounted() {
        this.getFavoriteMovies();
    },
    methods: {
        async getFavoriteMovies() {
            await this.$store.dispatch("getFavoriteMovies");
            this.isLoaded = true;
        },
        openMovieDetailPage(movie) {
            const selectedMovieInfo = {
                "movieId": movie.id,
            }
            localStorage.setItem("selectedMovieInfo", JSON.stringify(selectedMovieInfo));;
            this.$router.push({ name: "movieDetail" });
        }
    }
}
</script>

<style scoped>
.card {
    position: relative;
    border-radius: 1px;
}

.card:before {
    display: none;
    content: "";
    position: absolute;
    top: 0px;
    right: 0px;
    background-color: rgba(241, 227, 227, 0.3);
    height: 460px;
    width: 18rem;
    border-radius: 1px;
    transition: transform 0.5s ease-out;
}

.card:hover:before {
    display: block;
}

.more-info-btn {
    position: absolute;
    top: 45%;
    right: 35%;
    background-color: #fff;
    display: none;
}

.card:hover .more-info-btn {
    display: block;
}
</style>