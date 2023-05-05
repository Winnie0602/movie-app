<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand text-700" href="/mainPage/moviesBoard">Your Movie App｜ </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <!-- <li class="nav-item">
                        <router-link class="nav-link text-white" to="/mainPage/moviesBoard">首頁</router-link>
                    </li> -->
                    <!-- <li class="nav-item">
                        <router-link class="nav-link text-white" to="/">現正熱映</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link text-white" to="/">即將上映</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link text-white" to="/"></router-link>
                    </li> -->
                </ul>
                <div class="row align-items-center justify-content-center mx-3">
                    <!-- <img class="col-auto" src="@/assets/userLogo.png" alt=""> -->
                    <span class="col-auto material-symbols-outlined" style="color: white;">favorite</span>
                    <span class="col-auto material-symbols-outlined" style="color: white;">account_circle</span>
                    <!-- <a class="col-auto text-white text-decoration-none fs-5 text-bold">您好 : {{ account }}</a> -->
                    <!-- <button class="col-auto btn btn-light mx-2" @click="logout">登出</button> -->
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import store from '@/store'

export default {
    data() {
        return {
            account: store.state.account
        }
    },
    mounted() {
    },
    methods: {
        logout() {
            store.commit("setAccount", "")
            store.commit("setAccountId", "")
            this.$router.push("/")
        }
    }

}
</script>

<style scoped>
</style>