<template>
  <div class="home">
    <img src="@/assets/cinema.jpg" class="bg">
    <section class="h-100">
      <div class="container h-100">
        <div class="row justify-content-sm-center h-100">
          <div class="col-xl-5 col-lg-5 col-md-7 col-sm-9">
            <div class="text-center my-5">
              <h1 class="fs-3 border-radius py-3 text-white">Movie App</h1>
            </div>
            <div class="card shadow-lg my-5">
              <div class="card-body p-5">
                <h1 class="fs-4 card-title fw-bold mb-4">{{ displayView }}</h1>
                <div class="mb-3">
                  <input id="account" type="account" class="form-control" name="account" v-model="account"
                    placeholder="請輸入帳號" required autofocus>
                </div>
                <div class="mb-3">
                  <input id="password" type="password" class="form-control" name="password" v-model="password"
                    placeholder="請輸入密碼" required>
                </div>
                <div class="d-flex align-items-center justify-content-center">
                  <button class="btn btn-primary" @click="submitForm()">{{ displayView }}</button>
                </div>
              </div>
              <div class="card-footer py-3 border-0">
                <div class="text-center">
                  <span v-if="displayView === '登入'">
                    還沒有帳號嗎？<button @click="displayView = '註冊'" class="text-dark btn">點我註冊</button>
                  </span>
                  <span v-if="displayView === '註冊'">
                    已經有帳號了嗎？<button @click="displayView = '登入'" class="text-dark btn">點我登入</button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { firebaseAuth } from "@/firebase/config";
import swal from 'sweetalert';

export default {
  name: "LoginVue",
  components: {
  },
  data() {
    return {
      displayView: "登入",
      account: "",
      password: "",
    }
  },
  mounted() {

  },
  methods: {
    async submitForm() {
      if (this.account === "" || this.password === "") {
        swal("Oops!", "ID or Password can't be empty", "error");
        return
      }
      if (this.displayView === "註冊") {
        firebaseAuth
          .createUserWithEmailAndPassword(this.account, this.password)
          .then(result => {
            this.signInProcess();
          }).catch((error) => {
            swal(error.message, "error");
          });
      } else {
        firebaseAuth
          .signInWithEmailAndPassword(this.account, this.password)
          .then(result => {
            this.signInProcess();
          })
          .catch(error => {
            console.log(error.message)
            swal("Oops!", "ID or Password is incorrect", "error");
          });
      }
    },
    signInProcess() {
      this.$store.commit("setAccount", this.account);
      swal("Sign in successfully", "", "success")
          .then(() => {
            this.$router.push({ name: "moviesBoard" })
          })
    }
  }
}
</script>

<style scoped>
img.bg {
  min-height: 100%;
  min-width: 1024px;
  width: 100%;
  height: auto;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -2;
}
</style>