<template>
    <div class="tables_list_container">
        <h1>Tables List</h1>
        <router-link to="/dashboard/tables/add"><button class="add_button">Add Table</button></router-link>
        <table class="table">
            <thead class="thead_tblist">
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Capacity</th>
                    <th>Available</th>
                    <th>Image</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody class="tbody_tblist">
                <tableAdmin_card v-for="table in state.tables" :key="table.id" :table="table"/>
            </tbody>
        </table>
    </div>
</template>

<script>
    import { reactive, computed } from 'vue';
    import { useStore } from 'vuex';
    import Constant from '../../../Constant';
    import tableAdmin_card from '../../../components/admin/tableAdmin_card.vue';

    export default {
        components: { tableAdmin_card },
        setup() {
            const store = useStore();
            store.dispatch("tableAdmin/" + Constant.INITIALIZE_TABLE);
            const state = reactive({
                tables: computed(() => store.getters['tableAdmin/GetTables'])
            });
            return { state };
        }
    }
</script>

<style lang="scss">

    .tables_list_container {
        width: 100%;
        padding: 20px;
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
            .thead_tblist {
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