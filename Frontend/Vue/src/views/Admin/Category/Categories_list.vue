<template>
    <div class="categories_list_container">
        <h1>Categories List</h1>
        <router-link to="/dashboard/Categories/add"><button class="add_button">Add Category</button></router-link>
        <table class="table">
            <thead class="thead_catlist">
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody class="tbody_catlist">
                <categoryAdmin_card v-for="category in state.categories" :key="category.id" :category="category"/>
            </tbody>
        </table>
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

    .categories_list_container {
        width: 100%;
        padding: 20px;
        min-height: 70vh;
        h1 {
            text-align: center;
            font-size: 35px;
            font-weight: bold;
            text-transform: uppercase;
            color: #333;
            padding: 30px;
        }
        .add_button {
            display: block;
            width: 150px;
            padding: 10px;
            margin: auto;
            margin-bottom: 3%;
            text-transform: uppercase;
            font-weight: bold;
            font-size: 14px;
            border: 2px solid #333;
            border-radius: 10px; 
            background-color: #EAF2E3;
            color: #333;
            &:hover{
                background-color: #66D7D1;
            }
        }
        .table {
            background-color: #EAF2E3;
            width: 80%;
            margin: auto;
            border: 2px solid #333;
            .thead_catlist {
                background-color: #66D7D1;
                text-transform: uppercase;
            }
            th {
                text-align: center;
                border: 2px solid #333;
            }
            td {
                text-align: center;
                border: 2px solid #333;
                vertical-align: middle;
            }
        }
    }

</style>