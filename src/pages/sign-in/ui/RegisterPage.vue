<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <router-link to="/login">Have an account?</router-link>
          </p>

          <ul v-if="registerData?.error" class="error-messages">
            <li v-for="error in registerData.error.errors.body" :key="error">
              {{ error }}
            </li>
          </ul>

          <form @submit.prevent="submitForm">
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="username"
                placeholder="Username"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="email"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                v-model="password"
                placeholder="Password"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { register } from "../api/register";

const registerData = ref(null);
const username = ref("");
const email = ref("");
const password = ref("");
const router = useRouter();

const submitForm = async () => {
  const formData = new FormData();
  formData.append("username", username.value);
  formData.append("email", email.value);
  formData.append("password", password.value);

  try {
    registerData.value = await register(formData);
    if (!registerData.value.error) {
      router.push("/");
    }
  } catch (error) {
    console.error("Registration error:", error);
  }
};
</script>
