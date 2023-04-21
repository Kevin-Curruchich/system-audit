<template>
  <div class="container top-0 position-sticky z-index-sticky">
    <div class="row">
      <div class="col-12"></div>
    </div>
  </div>
  <main class="mt-0 main-content">
    <section>
      <div class="page-header min-vh-100">
        <div class="container">
          <div class="row">
            <div
              class="mx-auto col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0"
            >
              <div class="card card-plain">
                <div class="pb-0 card-header text-start">
                  <h4 class="font-weight-bolder">Iniciar sesión</h4>
                  <p class="mb-0">Ingresa tu correo y contraseña</p>
                </div>
                <div class="card-body">
                  <form role="form" @submit.prevent="onSubmit">
                    <div class="mb-3">
                      <el-input
                        id="email"
                        v-model="userForm.username"
                        type="email"
                        placeholder="Email"
                        size="lg"
                      />
                    </div>
                    <div class="mb-3">
                      <el-input
                        id="password"
                        v-model="userForm.password"
                        type="password"
                        placeholder="Contraseña"
                        size="lg"
                      />
                    </div>
                    <!-- <argon-switch id="rememberMe" name="rememberMe">
                      Remember me
                    </argon-switch> -->
                    <div class="text-center">
                      <argon-button
                        class="mt-4"
                        variant="gradient"
                        color="success"
                        full-width
                        size="lg"
                        >Iniciar</argon-button
                      >
                    </div>
                  </form>
                </div>
                <!-- <div class="px-1 pt-0 text-center card-footer px-lg-2">
                  <p class="mx-auto mb-4 text-sm">
                    Don't have an account?
                  <router-link
                      :to="{ name: 'Signup Illustration' }"
                      class="text-success text-gradient font-weight-bold"
                      >Sign up</router-link
                    >
                  </p>
                </div> -->
              </div>
            </div>
            <div
              class="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 end-0 text-center justify-content-center flex-column"
            >
              <div
                class="position-relative h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"
                :style="{
                  backgroundImage:
                    'url(' +
                    'https://sbg.org.gt/SBG/static/images/SBG/parqueo_sm.jpg' +
                    ')',
                  backgroundSize: 'cover',
                }"
              >
                <span class="mask bg-gradient-success opacity-6"></span>

                <h4
                  class="mt-5 text-white font-weight-bolder position-relative"
                >
                  "Seminario Biblico Guatemalteco"
                </h4>
                <p class="text-white position-relative">Preparando Siervos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { mapMutations } from "vuex";
import { useRouter } from "vue-router";
import { ref } from "vue";
import ArgonButton from "@/components/ArgonButton.vue";
const body = document.getElementsByTagName("body")[0];
import useAuth from "@/composables/useAuth";
import sbgImage from "../../../../public/sbg-image.jpg";

export default {
  name: "SigninIllustration",
  components: {
    ArgonButton,
  },
  setup() {
    const router = useRouter();
    const { loginUser } = useAuth();

    const userForm = ref({
      username: "",
      password: "",
    });

    const onSubmit = async () => {
      const { ok } = await loginUser(userForm.value);
      if (ok) {
        router.push({ name: "Dashboard" });
      }
    };

    return { onSubmit, userForm, sbgImage };
  },
  created() {
    this.$store.state.hideConfigButton = true;
    this.toggleDefaultLayout();
    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.toggleDefaultLayout();
    body.classList.add("bg-gray-100");
  },
  methods: {
    ...mapMutations(["toggleDefaultLayout"]),
  },
};
</script>
