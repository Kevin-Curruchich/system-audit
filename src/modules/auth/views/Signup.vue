<template>
  <div class="container top-0 position-sticky z-index-sticky">
    <div class="row">
      <div class="col-12"></div>
    </div>
  </div>
  <main class="main-content mt-0">
    <section>
      <div class="page-header min-vh-100">
        <div class="container">
          <div class="row">
            <div
              class="col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0 mx-auto"
            >
              <div class="card card-plain">
                <div class="card-header pb-0 text-left">
                  <h4 class="font-weight-bolder">Registrarse</h4>
                  <p class="mb-0">Ingresa tus credenciales</p>
                </div>
                <div class="card-body">
                  <el-form
                    ref="formRef"
                    role="form"
                    :model="userForm"
                    :rules="rules"
                    label-position="top"
                  >
                    <div class="mb-3">
                      <el-form-item label="DPI/DNI" prop="userDNI">
                        <el-input
                          id="dni"
                          v-model="userForm.userDNI"
                          type="text"
                          placeholder="DPI/DNI"
                        />
                      </el-form-item>
                    </div>
                    <div class="mb-3">
                      <el-form-item label="Correo electronico" prop="userEmail">
                        <el-input
                          id="email"
                          v-model="userForm.userEmail"
                          type="email"
                          placeholder="Correo electronico"
                        />
                      </el-form-item>
                    </div>
                    <div class="mb-3 mt-2">
                      <el-form-item label="Contraseña" prop="password">
                        <el-input
                          id="password"
                          v-model="userForm.password"
                          type="password"
                          placeholder="Contraseña"
                        />
                      </el-form-item>
                    </div>
                    <div class="text-center">
                      <argon-button
                        class="mt-4"
                        variant="gradient"
                        color="success"
                        full-width
                        :loading="sendingRequest"
                        type="submit"
                        @click="onSubmit"
                        >Registrarse</argon-button
                      >
                    </div>
                  </el-form>
                </div>
                <div class="card-footer text-center pt-0 px-sm-4 px-1">
                  <p class="mb-4 mx-auto text-sm">
                    ¿Tienes una cuenta?
                    <router-link
                      :to="{ name: 'login' }"
                      class="text-success text-gradient font-weight-bolder"
                    >
                      Iniciar Sesion
                    </router-link>
                  </p>
                </div>
              </div>
            </div>
            <div
              class="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 end-0 text-center justify-content-center flex-column"
            >
              <div
                class="position-relative h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"
                :style="{
                  backgroundImage: `url(${sbgImage})`,
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
import ArgonButton from "@/components/ArgonButton.vue";
import { useRouter } from "vue-router";
const body = document.getElementsByTagName("body")[0];
import { mapMutations } from "vuex";
import sbgImage from "../../../../public/sbg-image.jpg";
import { useAuth } from "../../../composables";
import { ElMessage } from "element-plus";
import { ref } from "vue";

export default {
  name: "Signup",
  components: {
    ArgonButton,
  },
  setup() {
    const router = useRouter();
    const { signUpUser, userData } = useAuth();

    const formRef = ref(null);
    const sendingRequest = ref(false);

    const userForm = ref({
      userDNI: "",
      userEmail: "",
      password: "",
    });

    const rules = ref({
      userDNI: [
        {
          required: true,
          message: "Por favor ingrese su DPI/DNI",
          trigger: "blur",
        },
      ],
      userEmail: [
        {
          required: true,
          message: "Por favor ingrese su correo",
          trigger: "blur",
        },
        {
          type: "email",
          message: "Por favor ingrese un correo valido",
          trigger: "blur",
        },
      ],
      password: [
        {
          required: true,
          message: "Por favor ingrese su contraseña",
          trigger: "blur",
        },
      ],
    });

    const onSubmit = async () => {
      sendingRequest.value = true;
      await formRef.value.validate(async (isValid) => {
        if (!isValid) {
          sendingRequest.value = false;
          return;
        }
        signUpUser(userForm.value)
          .then(({ ok }) => {
            if (ok) {
              if (userData.value.studentId) {
                router.push({
                  name: "Student",
                  params: { id: userData.value.studentId },
                });
              } else {
                router.push({ name: "Dashboard" });
              }
            }
          })
          .catch(({ error }) => {
            //display message error
            ElMessage({
              message: error.message,
              type: "error",
              showClose: true,
            });

            sendingRequest.value = false;
          });
      });
    };

    return {
      sbgImage,
      rules,
      onSubmit,
      userForm,
      formRef,
      sendingRequest,
    };
  },
  created() {
    this.$store.state.hideConfigButton = true;
    // this.toggleDefaultLayout();
    this.toggleDefaultLayoutFalse();

    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.toggleDefaultLayoutTrue();
    body.classList.add("bg-gray-100");
  },
  methods: {
    ...mapMutations([
      "toggleDefaultLayout",
      "toggleDefaultLayoutTrue",
      "toggleDefaultLayoutFalse",
    ]),
  },
};
</script>
