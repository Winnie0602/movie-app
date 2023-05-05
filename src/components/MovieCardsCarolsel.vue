<template>
<div class="container my-5">
    <div class="mt-5">
        <h3 class="mt-5 text-dark fw-bolder">- {{ type }} -</h3>
        <div class="row justify-content-center bg-dark bg-opacity-50 rounded">
            <flickity ref="flickity" :options="flickityOptions" v-if="nowShowingMovies.length > 0">
                <div class="carousel-cell m-3 bg-white" v-for="(movie, index) in nowShowingMovies" :key="index">
                    <div class="card" style="width: 18rem; height: 430px;">
                        <button class="more-info-btn btn btn-light" @click="openMovieDetailPage(movie)">詳細資訊</button>
                        <div class="profile-img">
                            <img :src="$store.state.baseImgPath + movie.poster_path" alt="Movie pic" class="card-img-top img-fluid"
                                style="height: 380px; object-fit: fill" />
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">{{ movie.original_title.substring(0, 20) }}
                            </h5>
                        </div>
                    </div>
                </div>
            </flickity>
        </div>
    </div>
</div>
</template>
    
<script>
import Flickity from "vue-flickity";

export default {
    name: "MovieCardsCarolsel",
    components: {
        Flickity
    },
    data() {
        return {
            flickityOptions: {
                initialIndex: 1,
                prevNextButtons: true,
                pageDots: false,
                wrapAround: false,
                cellAlign: "left",
            }
        }
    },
    props: {
        nowShowingMovies: {
            type: Array,
            default: () => [],
        },
        type: {
            type: String,
            default: "",
        },
    },
    mounted() {
    },
    methods: {
        openMovieDetailPage(movie) {
            const selectedMovieInfo = {
                "movieId": movie.id,
            }
            localStorage.setItem("selectedMovieInfo", JSON.stringify(selectedMovieInfo));
            this.$router.push({ name: "movieDetail" })
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
    height: 430px;
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