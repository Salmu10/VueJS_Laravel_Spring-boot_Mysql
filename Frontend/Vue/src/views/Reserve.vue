<template>
    <h1>RESERVE</h1>
    <div class="reserve_container">
        <filters @filters="apply_filters" @delete_filters="delete_filters" :filters="filters"/>
        <div class="table_list">
            <table_card v-for="table in state.tables" :key="table.id" :table="table"/>
        </div>
    </div>
    <div class="pagination_container">
        <v-pagination v-model="state.page" :pages="state.total_pages" :range-size="1" active-color="#DCEDFF" @update:modelValue="change_page"/>
    </div>
</template>

<script>
    import { reactive } from 'vue';
    import { useRouter, useRoute } from 'vue-router';
    import table_card from '../components/client/table_card.vue';
    import filters from '../components/filters.vue';
    import { useFilters } from '../composables/useFilters';
    import { usePaginate } from '../composables/usePaginate';
    import VPagination from "@hennge/vue3-pagination";
    import "@hennge/vue3-pagination/dist/vue3-pagination.css";

    export default {
        components: { table_card, filters, VPagination },
        setup() {
            const route = useRoute();
            const router = useRouter();

            let filters = { categories: [], capacity: 0, table_name: "", page: 1, limit: 3 };

            try {
                if (route.params.filters !== '') {
                    filters = JSON.parse(atob(route.params.filters));
                }
            } catch (error) {
                // console.log(error);
            }

            const state = reactive({
                tables: useFilters(filters),
                page: filters.page,
                total_pages: usePaginate(filters),
            })

            const apply_filters = (filters) => {
                const filters_url = btoa(JSON.stringify(filters));
                router.push({ name: "reserve_filters", params: { filters: filters_url } });
                state.tables = useFilters(filters);
                state.total_pages = usePaginate(filters);
            }

            const delete_filters = (delete_filters) => {
                router.push({ name: "reserve" });
                state.tables = useFilters(delete_filters);
                state.page = 1;
                state.total_pages = usePaginate(delete_filters);
            }

            const change_page = (page_num) => {
                try {
                    if (route.params.filters !== '') {
                        filters = JSON.parse(atob(route.params.filters));
                    }
                } catch (error) {
                    // console.log(error);
                }
                filters.page = page_num;
                state.page = filters.page;
                apply_filters(filters);
            }

            return { state, filters, apply_filters, delete_filters, change_page }
        }
    }
</script>

<style lang="scss">

    h1 {
        text-align: center;
        font-size: 35px;
        font-weight: bold;
        text-transform: uppercase;
        color: #333;
        padding: 20px;
        margin-top: 2%;
    }

    .reserve_container {
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        width: 100%;
        padding: 20px;
        .table_list {
            display: flex;
            margin: auto;
            width: 100%;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-around;
            align-items: flex-start;
        }
    }

    .pagination_container{
        display: block;
        margin: auto;
        margin-top: 4%;
        margin-bottom: 4%;
        .Pagination {
            justify-content: center;
        }   
    }

</style>