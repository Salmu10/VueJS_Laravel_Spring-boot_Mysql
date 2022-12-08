<template>
    <div class="container_filter">
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
            return { state, send_filters }
        }
    }
</script>

<style lang="scss">

    @import '../../node_modules/vue-select/dist/vue-select.css';

    .container_filter {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 25%;
        border: 2px solid #333;
        border-radius: 10px;
        padding: 10px;
        align-items: center;
        // margin-bottom: 2%;
        .categories_box, .capacity_box, .buttons_box {
            display: block;
            width: 90%;
        }
        .etiqueta {
            text-transform: uppercase;
            font-weight: bold;
            margin-right: 3%;
        }
        .filter_button {
            display: block;
            width: 150px;
            padding: 10px;
            margin: auto;
            // margin-bottom: 3%;
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