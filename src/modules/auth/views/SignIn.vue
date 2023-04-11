<template>
  <main class="main-content main-content-bg mt-0">
    <div
      class="page-header min-vh-100"
      style="
        background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-basic.jpg');
      "
    >
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-4 col-md-7 mt-2">
            <div class="card border-0 mb-0">
              <div class="card-header bg-transparent">
                <h5 class="text-dark text-center mt-2 mb-3">Sign in</h5>
              </div>
              <div class="card-body px-lg-5 pt-0">
                <form role="form" class="text-start">
                  <div class="mb-3">
                    <argon-input
                      id="email"
                      type="email"
                      placeholder="Email"
                      aria-label="Email"
                    />
                  </div>
                  <div class="mb-3">
                    <argon-input
                      id="password"
                      type="password"
                      placeholder="Password"
                      aria-label="Password"
                    />
                  </div>
                  <!-- <argon-switch id="rememberMe" name="rememberMe">
                    Remember me
                  </argon-switch> -->

                  <div class="text-center">
                    <argon-button
                      color="success"
                      variant="gradient"
                      full-width
                      class="my-4 mb-2"
                      >Sign in</argon-button
                    >
                  </div>
                  <!-- <div class="mb-2 position-relative text-center">
                    <p
                      class="text-sm font-weight-bold mb-2 text-secondary text-border d-inline z-index-2 bg-white px-3"
                    >
                      or
                    </p>
                  </div>
                  <div class="text-center">
                    <argon-button
                      color="dark"
                      variant="gradient"
                      full-width
                      class="mt-2 mb-4"
                      >Sign up</argon-button
                    >
                  </div> -->
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
// import ArgonSwitch from "@/components/ArgonSwitch.vue";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import { mapMutations } from "vuex";

export default {
  name: "SigninBasic",
  components: {
    ArgonInput,
    ArgonButton,
    // ArgonSwitch,
  },
  created() {
    this.$store.state.hideConfigButton = true;
    this.toggleDefaultLayout();
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.toggleDefaultLayout();
  },
  methods: {
    ...mapMutations(["toggleDefaultLayout"]),
  },
};
</script>
