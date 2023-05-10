<template>
    <header class="bg-dark py-5">
        <div class="container px-5">
            <div class="row gx-5 align-items-center justify-content-center">
                <div class="col-lg-8 col-xl-7 col-xxl-6">
                    <div class="my-5 text-center text-xl-start">
                        <h1 class="display-5 fw-bolder text-white mb-2">{{ movieDetail.original_title }}
                            <span v-if="isLoaded">
                                <span v-if="!isFavorite" class="material-symbols-outlined"
                                    style="color:red; cursor: pointer;" @click="addFavorite(movieDetail)">favorite</span>
                                <span v-else class="material-symbols-outlined" style="color:red; cursor: pointer;"
                                    @click="removeFavorite(movieDetail)">heart_check</span>
                            </span>
                        </h1>
                        <span v-if="movieDetail.release_date && !getCountDown().includes('ago')"
                            class="lead fw-normal text-white-50 mb-4">( will realse {{ getCountDown() }} ) <br></span>
                        <span v-for="tag in movieDetail.genres" class="badge rounded-pill bg-info text-dark my-2 mx-1">{{
                            tag.name }}</span>
                        <br>
                        <span class="lead fw-normal text-white-50 mb-4">Release Date: {{ movieDetail.release_date
                        }}<br></span>
                        <span v-if="movieDetail.runtime !== 0" class="lead fw-normal text-white-50 mb-4">Length: {{
                            movieDetail.runtime }} mins <br></span>
                        <span v-if="movieDetail.vote_average !== 0" class="lead fw-normal text-white-50 mb-4">Score: {{
                            movieDetail.vote_average }} (Vote Count:
                            {{ movieDetail.vote_count }})</span>
                        <div class="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start mt-3">
                            <a class="btn btn-primary btn-lg px-4 me-sm-3 d-flex justify-content-center"
                                :href="movieDetail.homepage" target="_blank">Youtube
                                <span class="material-symbols-outlined pt-1 mx-1">youtube_activity</span>
                            </a>
                            <a class="btn btn-outline-light btn-lg px-4" :href="movieDetail.homepage" target="_blank">Movie
                                Homepage</a>
                        </div>
                    </div>
                </div>
                <div v-if="movieDetail.backdrop_path" class="col-xl-5 col-xxl-6 d-none d-xl-block text-center"><img
                        class="img-fluid rounded-3 my-5" :src="$store.state.baseImgPath + movieDetail.backdrop_path"
                        alt="movie image" /></div>
            </div>
        </div>
    </header>
    <section class="pt-5 bg-light">
        <div class="container px-5 py-5 my-5">
            <div class="row gx-5 align-items-center">
                <div class="col-xxl-6 col-md-12 mb-5">
                    <iframe width="560" height="315" style="max-width:100%" v-if="youtubeHref"
                        :src="`https://www.youtube.com/embed/${youtubeHref}`" title="YouTube video player" frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen></iframe>
                </div>
                <div class="col-xxl-6 col-md-12">
                    <h2 class="fw-bolder">Movie Overview:</h2>
                    <p class="lead fw-normal text-muted mb-0">{{ movieDetail.overview }}</p>
                </div>
            </div>
        </div>
        <div class="card py-5">
            <div class="card-body">
                <div class="container">
                    <div class="text-center">
                        <h2 class="fw-bolder">Similar Movies</h2>
                        <p class="lead fw-normal text-muted mb-5">Cause you like 「
                            <span class="fw-bolder">{{ movieDetail.original_title }}</span> 」, we suggest some similar
                            movies for you!
                        </p>
                    </div>
                    <div class="row gx-5 row-cols-1 row-cols-sm-2 row-cols-xl-4 justify-content-center"
                        v-if="similarMovies.length > 0">
                        <div class="col mb-5 mb-5 mb-xl-0" v-for="(movie, index) in similarMovies" :key="index"
                            v-show="index < 4">
                            <div class="text-center">
                                <img class="img-fluid rounded-circle mb-4 px-4" style="width: 200px; height: 150px;"
                                    :src="$store.state.baseImgPath + movie.poster_path" alt="..." />
                                <h5 class="fw-bolder">{{ movie.title }}</h5>
                                <div class="fst-italic text-muted">{{ movie.overview.substring(0, 100) }}...</div>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <span class="material-symbols-outlined">error</span>
                        <p class="fw-thin">Sorry, there are no similar movies can be suggested.</p>
                    </div>
                </div>
            </div>
            <div>
            </div>
        </div>
    </section>
</template>

<script>
import moment from "moment";
import { projectFirestore } from "@/firebase/config";
import swal from 'sweetalert';

export default {
    name: "MovieDetailView",
    components: {
    },
    data() {
        return {
            movieID: {}, // 從localStorage拿取使用者選擇的movieID
            movieDetail: {},
            similarMovies: [],
            youtubeHref: "",
            isFavorite: false,
            isLoaded: false,
        }
    },
    computed: {
        accountFavoriteMovies() {
            return this.$store.state.accountFavoriteMovies;
        }
    },
    mounted() {
        this.movieID = JSON.parse(localStorage.getItem("selectedMovieInfo")).movieId;
        this.getMovieDetail();
        this.getSimilarMovies();
        this.getMovieVideos();
    },
    methods: {
        async getMovieDetail() {
            this.movieDetail = await this.$store.dispatch("getAPI", {
                endPointURL: `/movie/${this.movieID}`,
            });
            await this.$store.dispatch("getFavoriteMovies");
            this.isFavorite = this.accountFavoriteMovies.some(e => e.id === this.movieDetail.id);
            this.isLoaded = true;
        },
        async getSimilarMovies() {
            const tempSimilarMovies = await this.$store.dispatch("getAPI", {
                endPointURL: `/movie/${this.movieID}/similar`,
            });
            // 把沒有照片&簡介的電影篩選掉
            this.similarMovies = tempSimilarMovies.filter((e) => e.poster_path && e.overview);
        },
        async getMovieVideos() {
            const videoDataArr = await this.$store.dispatch("getAPI", {
                endPointURL: `/movie/${this.movieID}/videos`,
            });
            if (videoDataArr.length > 0) this.youtubeHref = videoDataArr[0].key;
        },
        getCountDown() {
            const formateDate = this.movieDetail.release_date.replace(/-/g, "");
            return moment(formateDate).fromNow();
        },
        // 整理新增的資料
        addFavorite({ id, title, poster_path }) {
            const accountFavoriteMovies = this.accountFavoriteMovies;
            accountFavoriteMovies.push({
                id: id,
                title: title,
                img: poster_path
            })
            this.firebaseAddMethod(accountFavoriteMovies, "add");
        },
        // 整理刪除資料
        removeFavorite({ id }) {
            const accountFavoriteMovies = this.accountFavoriteMovies.filter(e => e.id !== id);
            this.firebaseAddMethod(accountFavoriteMovies, "remove");
        },
        // 共用打firbase API
        async firebaseAddMethod(accountFavoriteMovies, method) {
            const docRef = projectFirestore.collection("FavoriteMovies");
            this.isFavorite = method === "add";
            swal(`${method} successfully !`, "", "success");
            await docRef.doc(this.$store.state.account).set({
                movies: accountFavoriteMovies
            })
            // 重新更新store資料
            await this.$store.dispatch("getFavoriteMovies");
        }
    }
}
</script>

<style></style>