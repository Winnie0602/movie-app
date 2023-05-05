import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    account: "",
    accountId: "",
    baseImgPath: "https://image.tmdb.org/t/p/w500",
  },
  getters: {},
  mutations: {
    setAccount(state, account) {
      state.account = account;
    },
    setAccountId(state, accountId) {
      // 目前登入者在資料庫裡面的隨機id
      state.accountId = accountId;
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
      return new Promise((resolve, reject) => {
        axios
          .get(URL)
          .then((res) => {
            resolve(res.data?.results ?? res.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
  modules: {},
});
