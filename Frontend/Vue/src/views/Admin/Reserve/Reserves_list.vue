<template>
    <div class="reserves_list_container">
        <h1>Reserves List</h1>
        <table class="table">
            <thead class="thead_tblist">
                <tr>
                    <th>ID</th>
                    <th>Is Table</th>
                    <th>Id User</th>
                    <th>Capacity</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Confirmed</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody class="tbody_tblist">
                <reserveAdmin_card v-for="reserve in state.reserves" :key="reserve.id" :reserve="reserve"/>
            </tbody>
        </table>
    </div>
</template>

<script>
    import { reactive } from 'vue';
    import { useRouter } from 'vue-router';
    import reserveAdmin_card from '../../../components/admin/reserveAdmin_card.vue';
    import { useReserve_list, useDelete_reserve } from '../../../composables/useReserve';

    export default {
        components: { reserveAdmin_card },
        setup() {
            const router = useRouter();

            const state = reactive({
                reserves: useReserve_list(),
            })

            function delete_reserve(id_reserve) {
                useDelete_reserve(id_reserve);
                router.push({ name: 'home' });
            }

            return { state, delete_reserve };
        }
    }
</script>

<style lang="scss">

    .reserves_list_container {
        width: 100%;
        padding: 20px;
        min-height: 70vh;
        margin-bottom: 3%;
        h1 {
            text-align: center;
            font-size: 35px;
            font-weight: bold;
            text-transform: uppercase;
            color: #333;
            padding: 30px;
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