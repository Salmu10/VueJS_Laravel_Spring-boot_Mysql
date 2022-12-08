<template>
    <div class="home_container">
        <h1>Categories</h1>
        <category_card v-for="category in state.categories" :key="category.id" :category="category" @emitAction="redirectReserve"/>
    </div>
</template>

<script>
    import { reactive, computed } from 'vue';
    import { useRouter } from 'vue-router';
    import { useStore } from 'vuex';
    import Constant from '../Constant.js';
    import category_card from '../components/client/category_card.vue';

    export default {
        components: { category_card },
        setup() {
            const router = useRouter();
            const store = useStore();

            store.dispatch("category/" + Constant.INITIALIZE_CATEGORY);
            
            const state = reactive({
                categories: computed(() => store.getters['category/GetCategories'])
            });

            const redirectReserve = (item) => {
                const filters = { categories: [item.category_name], capacity: 0, table_name: ""};
                const filters_url = btoa(JSON.stringify(filters));
                router.push({ name: "reserveFilters", params: { filters: filters_url } });
            }

            return { state, redirectReserve };
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
        padding: 20px;
        h1 {
            text-align: center;
            font-size: 35px;
            font-weight: bold;
            text-transform: uppercase;
            color: #333;
        }
    }

</style>