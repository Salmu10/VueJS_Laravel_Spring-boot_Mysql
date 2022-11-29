<template>
    <div class="home_container">
        <h1>Categories List</h1>
        <categoryAdmin_card v-for="category in state.categories" :key="category.id" :category="category"/>
        <router-link to="/dashboard/"><button>Add Category</button></router-link>

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

</style>