import { createRouter, createWebHistory } from "vue-router";
import MainPageView from "../views/MainPageView.vue";
import FavoriteMoviesView from "../views/FavoriteMoviesView.vue";
import LoginView from "../views/LoginView.vue";
import MovieDetailView from "../views/MovieDetailView.vue";
import MoviesBoardView from "../views/MoviesBoardView.vue";
import store from "../store";
import swal from 'sweetalert';

const routes = [
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/mainPage",
    name: "mainPage",
    component: MainPageView,
    children: [
      {
        path: "",
        name: "mainPage",
        redirect: {
          name: "moviesBoard",
        },
      },
      {
        path: "moviesBoard",
        name: "moviesBoard",
        component: MoviesBoardView,
      },
      {
        path: "movieDetail",
        name: "movieDetail",
        component: MovieDetailView,
      },
    ],
  },
  {
    path: "/favoriteMovies",
    name: "favoriteMovies",
    component: FavoriteMoviesView,
  },
  {
    path: "/",
    redirect: {
      name: "login",
    },
  },
  {
    path: "/:catchAll(.*)",
    redirect: {
      name: "moviesBoard",
    },
    hidden: true
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLogin = !!store.state.account;
  if (isLogin && to.name === "login") {
    swal("您已登入，幫您導回首頁", "", "error")
    .then(() => {
      next({ name: "moviesBoard" });
    })
  } else if (!isLogin && to.name !== "login") {
    swal("請先登入", "", "error")
    .then(() => {
      next({ name: "login" });
    })
  } else {
    next();
  }
});

export default router;
