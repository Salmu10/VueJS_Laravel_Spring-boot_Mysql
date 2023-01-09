<template>
  <VueHeader/>
  <RouterView/>
  <VueFooter/>
</template>

<script setup>
  import { RouterView } from 'vue-router'
  import VueHeader from './components/Header.vue';
  import VueFooter from './components/Footer.vue';
  import { useStore } from 'vuex';
  import Constant from './Constant';

  const store = useStore();
  if (localStorage.getItem("token")) {
    store.dispatch(`user/${Constant.PROFILE}`);
  }
</script>

<style>

</style>