<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <router-link to="/register">Need an account?</router-link>
          </p>

          <ul v-if="signInData?.error" class="error-messages">
            <li v-for="error in signInData.error.errors.body" :key="error">
              {{ error }}
            </li>
          </ul>

          <form @submit.prevent="submitForm">
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                name="email"
                type="text"
                v-model="email"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                name="password"
                type="password"
                v-model="password"
                placeholder="Password"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              Sign in
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
import { signIn } from "../api/sign-in";

const email = ref("");
const password = ref("");
const signInData = ref(null);
const router = useRouter();

const submitForm = async () => {
  const formData = new FormData();
  formData.append("email", email.value);
  formData.append("password", password.value);

  signInData.value = await signIn(formData);

  if (!signInData.value.error) {
    router.push("/");
  }
};
</script>
