<template>
    <div class="container_filter">
        <div class="filters_title">
            <h3>Filters</h3>
        </div>
        <div v-if="state.categories" class="categories_box">
            <label for='category' class="etiqueta">Category:</label>
            <v-select class="category" multiple v-model="state.filters.categories" :options="state.categories" />
        </div>
        <div v-else>
            <span>Can't filter by categories</span>
        </div>
        <div class="capacity_box">
            <label for='capacity' class="etiqueta">Capacity:</label>
            <input type="number" min="0" class="capacity" v-model="state.filters.capacity"/>
        </div>
        <div class="buttons_box">
            <button class="filter_button" @click="send_filters()">Filter</button>
            <button class="delete_button" @click="delete_filters()">Clear</button>
        </div>
    </div>
</template>

<script>
    import Constant from '../Constant';
    import { useStore } from 'vuex'
    import { reactive, computed, getCurrentInstance } from 'vue';

    export default {
        props: {
            filters: Object
        },
        emits: {
            filters: Object,
            delete_filters: Object,
        },
        setup(props) {
            const store = useStore();
            const { emit } = getCurrentInstance();

            store.dispatch("category/" + Constant.INITIALIZE_CATEGORY);
            
            const state = reactive({
                categories: computed(() => store.getters['category/GetCategories']?.map(item => item.category_name)),
                filters: { ...props.filters }
            });

            const send_filters = () => {
                emit('filters', state.filters);
            }

            const delete_filters = () => {
                state.filters.categories = [];
                state.filters.table_name = "";
                state.filters.capacity = 0;
                emit('delete_filters', state.filters);
            }
            
            return { state, send_filters, delete_filters }
        }
    }
</script>

<style lang="scss">

    @import '../../node_modules/vue-select/dist/vue-select.css';

    .container_filter {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
        width: 90%;
        border: 3px solid #142b3b;
        border-radius: 10px;
        padding: 20px;
        align-items: center;
        margin: auto;
        margin-bottom: 2%;

        .filters_title {
            display: block;
            width: 100%;
            text-align: center;
            padding-bottom: 10px;
            h3 {
                text-transform: uppercase;
                font-weight: bold;
                font-size: 25px;
            }
        }

        .capacity_box, .buttons_box {
            display: block;
            width: 25%;
            text-align: center;
        }

        .categories_box {
            display: block;
            width: 50%;
            text-align: center;
            .category{
                display: inline-block;
                min-width: 570px;
            }
        }

        .etiqueta {
            text-transform: uppercase;
            font-weight: bold;
            margin-right: 3%;
        }

        .filter_button, .delete_button {
            display: inline-block;
            width: 100px;
            padding: 5px;
            margin: auto;
            margin-right: 20px;
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
    }

</style>