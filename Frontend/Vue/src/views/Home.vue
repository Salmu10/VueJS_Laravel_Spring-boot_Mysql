<template>
    <div class="home_container">
        <h1>Categories</h1>
        <category_card v-for="category in state.categories" :key="category.id" :category="category"/>
    </div>
</template>

<script>
    import { reactive, computed } from 'vue';
    import { useStore } from 'vuex';
    import Constant from '../Constant.js';
    import category_card from '../components/client/category_card.vue';

    export default {
        components: { category_card },
        setup() {
            const store = useStore();
            store.dispatch("category/" + Constant.INITIALIZE_CATEGORY);
            const state = reactive({
                categories: computed(() => store.getters['category/GetCategories'])
            });
            console.log(state);
            return { state };
        }
    }
</script>

<style lang="scss">

    h1 {
        text-align: center;
    }

    .home_container {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        width: 100%;
    }

</style>