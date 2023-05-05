import { createRouter, createWebHistory } from "vue-router";
import MainPageView from "../views/MainPageView.vue";
import OrderView from "../views/OrderView.vue";
import LoginView from "../views/LoginView.vue";
import MovieDetailView from "../views/MovieDetailView.vue";
import MoviesBoardView from "../views/MoviesBoardView.vue";
import store from "../store";

const routes = [
  {
    path: "/mainPage",
    name: "mainPage",
    component: MainPageView,
    children: [
      {
        path: "",
        redirect: {
          name: "moviesBoard"
        }
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
    path: "/order",
    name: "order",
    component: OrderView,
  },
  {
    path: "/",
    name: "login",
    component: LoginView,
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
console.log(!!store.state.account);
// router.beforeEach((to, from, next) => {
//   const ifLogin = !!store.state.account;
//   if (ifLogin && to.name === 'login') {
//     alert("您已登入，當您導回首頁");
//     next({ name: 'home' });
//   } else if (!ifLogin && to.name !== "login") {
//     alert("你沒登入，不能去其他網址");
//     next({ name: "login" });
//   } else {
//     next();
//   }
// });

export default router;
