<template>
    <!-- <div class="card" style="width: 18rem; height: 400px;"> -->
    <!-- <img v-if="!movie['poster_path']" :src="imgPath + movie['backdrop_path']"
            alt="movieImg2" class="card-img-top">
        <img v-else :src="imgPath + movie['poster_path']" class="card-img-top img-fluid" style="height: 400px; object-fit: fill"
            alt="movieImg"> -->
    <!-- <div class="card-body">
            <h5 class="card-title">{{ movie["original_title"].substring(0, 20) }} ...</h5>
            <p class="card-text mt-2">{{ movie.overview.substring(0, 100) }}...</p>
            <a href="" target=_blank class="btn btn-primary">了解更多</a>
        </div> -->
    <!-- </div> -->
    <div>
        <div class="movie-card" style="width: 18rem; height: 400px;">
            <div class="profile-img">
                <img :src="imgPath + movie['poster_path']" alt="Movie pic" />
            </div>
            <div class="card-body">
                <h2 class="title">{{ movie["original_title"].substring(0, 20) }}
                    <span v-if="movie.overview === ''"></span>
                    <span>{{ movie.overview.substring(0, 100) }}...</span>
                </h2>
                <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#modal"
                    @click="$emit('openModal', movie)">Read
                    More!</button>
            </div>
        </div>
    </div>
</template>
    
<script>

export default {
    name: "MovieCard",
    components: {
    },
    data() {
        return {
            imgPath: "https://image.tmdb.org/t/p/w500",
        }
    },
    props: {
        movie: {
            type: Object,
            default: {},
        }
    },
    mounted() {
        this.getNewsData();
    },
    methods: {
        getNewsData() {
        }
    }
}
</script>

<style scoped>
.movie-card {
    position: relative;
    overflow: hidden;
    margin-bottom: 10px;
    box-shadow: 0px 2px 3px #222;
}

.movie-card .profile-img img {
    width: 100%;
    height: auto;
    transition: transform 1s;
}

.movie-card .card-body {
    position: absolute;
    top: 0;
    left: 0;
    padding: 50% 4%;
    text-align: center;
}

.movie-card .card-body:hover {
    background-color: rgba(247, 245, 245, 0.9);
}

.movie-card .card-body .title,
button {
    opacity: 0;
    letter-spacing: 2px;
    text-transform: uppercase;
    transform: translateY(-100px);
    transition: all 300ms cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.20s;
}

.movie-card .card-body .title {
    font-size: 24px;
    color: #333;
}

.movie-card:hover .title,
.movie-card:hover button {
    opacity: 1;
    transform: translateY(0);
}

.movie-card .card-body .title>span {
    display: block;
    margin: 0;
    font-size: 14px;
    text-transform: capitalize;
}
</style>