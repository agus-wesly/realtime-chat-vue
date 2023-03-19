<template>
  <div>
    <h1 class="text-xl font-bold mb-10">Create an account</h1>
    <form @submit.prevent="handleSubmit" class="flex flex-col">
      <label>Email</label>
      <InputText type="text" v-model="email" required />

      <label>Password</label>
      <InputText type="password" v-model="password" required />

      <label>Confirm Password</label>
      <InputText type="password" v-model="confirmPassword" required />

      <div class="flex flex-col mt-5 text-center">
        <Button type="submit" label="Create Account" />
        <span class="my-3">OR</span>
        <router-link to="/login">
          <Button type="button" label="Login" link />
        </router-link>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ref } from "vue";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/index";
import InputText from "primevue/inputtext";
import Button from "primevue/button";

export default defineComponent({
  components: { InputText, Button },
  setup() {
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const errorMsg = ref("");

    const handleSubmit = async () => {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email.value,
          password.value
        );
        console.log(userCredential);
      } catch (error) {
        if (error instanceof Error) {
          errorMsg.value = error.message;
        }
      }
    };
    return { email, password, handleSubmit, confirmPassword, errorMsg };
  },
});
</script>
