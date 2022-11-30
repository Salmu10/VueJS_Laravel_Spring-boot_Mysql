<template>
    <div class="categories_lsit_container">
        <h1>Categories List</h1>
        <router-link to="/dashboard/categories/add"><button>Add Category</button></router-link>
        <categoryAdmin_card v-for="category in state.categories" :key="category.id" :category="category"/>

        <!-- <div v-for="category in state.categories" :key="category.id">
            <p>{{ state.categories }}</p>
        </div> -->
    </div>
</template>

<script>
    import { reactive, computed } from 'vue';
    import { useStore } from 'vuex';
    import Constant from '../../../Constant';
    import categoryAdmin_card from '../../../components/admin/categoryAdmin_card.vue';

    export default {
        components: { categoryAdmin_card },
        setup() {
            const store = useStore();
            store.dispatch("categoryAdmin/" + Constant.INITIALIZE_CATEGORY);
            const state = reactive({
                categories: computed(() => store.getters['categoryAdmin/GetCategories'])
            });
            return { state };
        }
    }
</script>

<style lang="scss">

    .categories_lsit_container {
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