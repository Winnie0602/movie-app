<template>
    <MovieCardsCarolsel :nowShowingMovies="nowShowingMovies" :type="'現正熱映'" />
    <MovieCardsCarolsel :nowShowingMovies="comingSoonMovies" :type="'即將上映'" />
    <section class="pt-3 bg-light">
        <div class="container px-5 my-5">
            <div class="row gx-5 align-items-center">
                <div class="col-xxl-6 col-md-12 mb-5" v-if="nowShowingMovies.length > 0">
                    <img class="rounded" :src="$store.state.baseImgPath + nowShowingMovies[0].backdrop_path" style="max-width:100%"
                        alt="The Most Popular IMG">
                </div>
                <div class="col-xxl-6 col-md-12" v-if="nowShowingMovies.length > 0">
                    <h2 class="fw-bolder">The Most Popular!</h2>
                    <h3 class="fw-bolder text-muted mb-0">{{ nowShowingMovies[0].original_title }}</h3>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import MovieCardsCarolsel from '@/components/MovieCardsCarolsel.vue';

export default {
    name: "MoviesBoardView",
    components: {
        MovieCardsCarolsel,
    },
    data() {
        return {
            nowShowingMovies: [], // 現正熱映電影
            comingSoonMovies: [], // 即將上映電影
        }
    },
    props: {
        movie: {
        }
    },
    mounted() {
        this.getNowShowingMoviesApi();
        this.getComingSoonMoviesApi();
    },
    methods: {
        async getNowShowingMoviesApi() {
            this.nowShowingMovies = await this.$store.dispatch("getAPI", {
                endPointURL: "/discover/movie",
                params: "sort_by=popularity.desc"
            });
        },
        async getComingSoonMoviesApi() {
            this.comingSoonMovies = await this.$store.dispatch("getAPI", {
                endPointURL: "/discover/movie",
                params: "primary_release_date.gte=2023-06-01"
            });
        },
    }
}
</script>

<style scoped>
</style>