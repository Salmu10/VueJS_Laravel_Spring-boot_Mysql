<template>
    <div class="home_container">
        <h1>Categories</h1>
        <carousel :categories="state.categories" @emitAction="redirect"/>
        <h1>The Menu</h1>
        <div class="menu">
            <img src="../assets/Menu.jpg" alt="menu">
        </div>
    </div>
</template>

<script>
    import { reactive, computed } from 'vue';
    import { useRouter } from 'vue-router';
    import { useStore } from 'vuex';
    import Constant from '../Constant.js';
    import carousel from '../components/client/carousel.vue';

    export default {
        components: { carousel },
        setup() {
            const router = useRouter();
            const store = useStore();

            store.dispatch("category/" + Constant.INITIALIZE_CATEGORY);
            
            const state = reactive({
                categories: computed(() => store.getters['category/GetCategories'])
            });

            const redirect = (category) => {
                const filters = { categories: [category.category_name], capacity: 0, table_name: "", page: 1, limit: 3};
                const filters_url = btoa(JSON.stringify(filters));
                router.push({ name: "reserve_filters", params: { filters: filters_url } });
            }

            return { state, redirect };
        }
    }
</script>

<style lang="scss">

    h1 {
        text-align: center;
    }

    .home_container {
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        width: 100%;
        padding: 20px;
        min-height: 68vh;
        h1 {
            text-align: center;
            font-size: 35px;
            font-weight: bold;
            text-transform: uppercase;
            color: #333;
            padding: 20px;
            margin-top: 10px;
        }
        .menu {
            width: 50%;
            margin: auto;
            img {
                width: 100%;
            }
        }
    }

</style>