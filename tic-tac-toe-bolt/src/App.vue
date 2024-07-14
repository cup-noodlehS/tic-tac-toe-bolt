<template>
  <div class="bg-amber-400">
    <div>hi {{ count }}</div>
    <button @click="addCount">click</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const count = ref(0);
const addCount = () => count.value++;
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  min-height: 100vh;
}
</style>
