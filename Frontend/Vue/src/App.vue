<template>
  <VueHeader/>
  <RouterView/>
  <!-- <VueFooter/> -->
</template>

<script setup>
  import { RouterView } from 'vue-router'
  import VueHeader from './components/Header.vue';
  // import VueFooter from './components/Footer.vue';
</script>

<style>

</style>