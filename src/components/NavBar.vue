<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <span class="row mx-0">
                <router-link :to="{ name: 'moviesBoard' }" class="col-auto mt-2 navbar-brand text-light">
                    Movie APP
                </router-link>
            </span>

            <div class="row align-items-center mx-1">
                <a class="col-auto text-white text-decoration-none text-300 text-bold">{{ getGreeting() }}</a>
                    <span @click="logout" data-bs-toggle="tooltip" data-bs-placement="bottom" title="logout" class="col-auto material-symbols-outlined"
                        style="color: white; cursor: pointer;">logout
                    </span>

                <router-link :to="{ name: 'favoriteMovies' }" class="col-auto mt-2">
                    <span class="material-symbols-outlined" style="color: white; cursor: pointer;">favorite</span>
                </router-link>
            </div>
        </div>
    </nav>
</template>

<script>
import moment from "moment";
import swal from 'sweetalert';

export default {
    name: "NavBar",
    components: {
    },
    data() {
        return {
            account: this.$store.state.account.substring(0, this.$store.state.account.indexOf("@"))
        }
    },
    mounted() {
    },
    methods: {
        logout() {
            this.$store.commit("setAccount", "")
            swal("Log out successfully", "", "success")
                .then(() => {
                    this.$router.push({ name: "login" })
                })
            
        },
        getGreeting() {
            let greeting = "";
            moment().format("hA").includes("AM")
                ? (greeting = "Good Morning")
                : (greeting = "Good Evening")
            return `${greeting}, ${this.account}`;
        }
    }

}
</script>

<style scoped>
.material-symbols-outlined {
    font-size: 28px;
}
</style>