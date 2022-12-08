<template>
    <h1>RESERVE</h1>
    <div class="reserve_container">
        <filters @filters="apply_filters" :filters="filters"/>
        <div class="table_list">
            <table_card v-for="table in state.tables" :key="table.id" :table="table"/>
        </div>
    </div>
</template>

<script>
    import { reactive } from 'vue';
    import { useRouter, useRoute } from 'vue-router';
    // import { useStore } from 'vuex';
    // import Constant from '../Constant';
    import table_card from '../components/client/table_card.vue';
    import filters from '../components/filters.vue';
    import { useFilters } from '../composables/useFilters';

    export default {
        components: { table_card, filters },
        setup() {
            const route = useRoute();
            // const store = useStore();
            const router = useRouter();

            let filters = {
                categories: [],
                capacity: 0,
                table_name: "",
            };

            try {
                if (route.params.filters !== '') {
                    filters = JSON.parse(atob(route.params.filters));
                }
            } catch (error) {
                // console.log(error);
            }

            const state = reactive({
                tables: useFilters(filters),
            })

            const apply_filters = (filters) => {
                const filters_url = btoa(JSON.stringify(filters));
                router.push({ name: "reserveFilters", params: { filters: filters_url } });
                state.tables = useFilters(filters);
            }

            return { state, filters, apply_filters }
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
    }

    .reserve_container {
        display: flex;
        justify-content: space-around;
        flex-direction: row;
        width: 100%;
        padding: 20px;
        .table_list {
            display: flex;
            flex-direction: column;
            width: 70%;
        }
    }

</style>