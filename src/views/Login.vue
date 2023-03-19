<template>
  <div>
    <h1 class="text-xl font-bold mb-10">Login to your account</h1>

    <Message v-if="errorAuth" severity="error">{{ errorAuth }}</Message>

    <form @submit.prevent="handleSubmit" class="flex flex-col">
      <label>Email</label>
      <InputText type="text" v-model="initialState.email" required />

      <label>Password</label>
      <InputText type="password" v-model="initialState.password" required />

      <div class="flex flex-col mt-5 text-center">
        <Button type="submit" label="Login" />
        <span class="my-3">OR</span>
        <Button
          @click="handleLoginWithGoogle"
          outlined
          type="button"
          class="flex justify-center space-x-5"
        >
          <span>
            <img src="/google2.png" class="w-6 h-6" />
          </span>
          <span>Login with Google</span>
        </Button>
        <router-link to="/register">
          <Button
            type="button"
            label="Don't have account ? Register here"
            link
          />
        </router-link>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { reactive, watch, ref } from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { loginWithGoogle, loginWithEmail } from "@/utils/auth";
import { useAuthStore } from "@/store/auth";
import Message from "primevue/message";

export default {
  components: { InputText, Button, Message },
  setup() {
    const initialState = reactive({
      email: "",
      password: "",
    });

    const errorAuth = ref("");

    const authStore = useAuthStore();

    watch(initialState, () => {
      if (errorAuth.value && (initialState.email || initialState.password)) {
        errorAuth.value = "";
      }
    });

    const handleSubmit = async () => {
      try {
        authStore.login(
          await loginWithEmail(initialState.email, initialState.password)
        );
      } catch (error: any) {
        errorAuth.value = error.errorMessage;
      }
    };

    const handleLoginWithGoogle = async () => {
      try {
        authStore.login(await loginWithGoogle());
      } catch (error: any) {
        errorAuth.value = error.errorMessage;
      }
    };

    return {
      initialState,
      handleSubmit,
      handleLoginWithGoogle,
      errorAuth,
    };
  },
};
</script>
