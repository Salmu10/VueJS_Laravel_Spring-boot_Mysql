<template>
    <div class="list_reserve">
        <h3>List of your reserves:</h3>
        <div class="reserve_pending" v-for="reserve in state.reserves_pending">
            <div id="alert" class="alert alert-warning" role="alert">
                <p>
                    The reserve for <strong>{{ reserve.reserve_type }}</strong> on <strong>{{ reserve.reserve_date }}</strong> for <strong>{{ reserve.capacity }}</strong>
                    people is pending for being accepted by an admin.
                    <a class="delete_reserve" @click="delete_reserve(reserve.id)">You can cancel the reserve there</a>.
                </p>
            </div>
        </div>
        <div class="reserve_list" v-for="reserve in state.reserves">
            <div id="alert" class="alert alert-success" role="alert">
                <p>
                    The reserve for <strong>{{ reserve.reserve_type }}</strong> on <strong>{{ reserve.reserve_date }}</strong> for <strong>{{ reserve.capacity }}</strong>
                    people is already confirmed.
                </p>
            </div>
        </div>
        <br>
    </div>
</template>

<script>
    import { reactive } from 'vue';
    import { useRouter } from 'vue-router';
    import { usePending_reserves, useReserve_list, useDelete_reserve } from '../../composables/useReserve';
    
    export default {
        setup() {
            const router = useRouter();

            const state = reactive({
                reserves_pending: usePending_reserves(),
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

    .list_reserve {
        width: 100%;
        padding: 20px;
        min-height: 75vh;
        margin-top: 50px;
        p {
            margin: 0;
        }
        #alert {
            margin-top: 30px;
        }
        .delete_reserve{
            cursor: pointer;
            text-decoration: underline;
            &:visited, :active {
                color: #007bff;
            }
        }
    }

</style>

