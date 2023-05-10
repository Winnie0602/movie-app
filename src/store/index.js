import { createStore } from "vuex";
import axios from "axios";
import { projectFirestore } from "@/firebase/config";

export default createStore({
  state: {
    account: "",
    baseImgPath: "https://image.tmdb.org/t/p/w500",
    accountFavoriteMovies: [],
  },
  getters: {},
  mutations: {
    setAccount(state, account) {
      state.account = account;
    },
    setAccountFavoriteMovies(state, accountFavoriteMovies) {
      state.accountFavoriteMovies = accountFavoriteMovies;
    },
  },
  actions: {
    getAPI(context, payload) {
      const { endPointURL, params } = payload;
      const API_KEY = "4c23b7c5b770be132a4c04fcca54c52e";
      let URL = "https://api.themoviedb.org/3";
      if (endPointURL.includes("discover")) {
        URL = URL.concat(`${endPointURL}?${params}&api_key=${API_KEY}`);
      } else {
        URL = URL.concat(`${endPointURL}?api_key=${API_KEY}`);
      }
      return axios
        .get(URL)
        .then((res) => {
          return res.data?.results ?? res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getFavoriteMovies(context) {
      const docRef = projectFirestore
        .collection("FavoriteMovies")
        .doc(context.state.account);
      return docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            context.commit("setAccountFavoriteMovies", doc.data().movies);
            return doc.data().movies;
          } else {
            context.commit("setAccountFavoriteMovies", []);
            return [];
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  modules: {},
});
