<template>
    <tr>
        <td class="id_col">{{ reserve.id }}</td>
        <td>{{ reserve.id_table }}</td>
        <td>{{ reserve.id_user }}</td>
        <td>{{ reserve.capacity }}</td>
        <td>{{ reserve.reserve_type }}</td>
        <td>{{ reserve.reserve_date }}</td>
        <td>
            <font-awesome-icon icon="fa-solid fa-circle-xmark" v-if="reserve.confirmed == 0" class="cross_icon fa-2x"/>
            <font-awesome-icon icon="fa-solid fa-circle-check" v-if="reserve.confirmed == 1" class="check_icon fa-2x"/>
            <!-- {{ reserve.confirmed }} -->
        </td>
        <td> 
            <button class="buttons" v-if="reserve.confirmed == 0" @click="confirmReserve(reserve.id)">Confirm</button>
            <button class="buttons" v-if="reserve.confirmed == 1" @click="unConfirmReserve(reserve.id)">Unconfirm</button>
            <button class="buttons" @click="deleteReserve(reserve.id)">Delete</button>
        </td>
    </tr>
</template>

<script>

    import { useStore } from 'vuex';
    import { useRouter } from 'vue-router';
    import { useDelete_reserve_admin, useUpdate_reserve_admin } from '../../composables/useReserve';

    export default {
        props: {
            reserve: Object
        },
        setup(props) {

            const store = useStore();
            const router = useRouter();

            function confirmReserve(id) {
                const status = true;
                useUpdate_reserve_admin(id, status)
                router.push({ name: 'dashboard' });
            }

            function unConfirmReserve(id) {
                const status = false;
                useUpdate_reserve_admin(id, status)
                router.push({ name: 'dashboard' }); 
            }

            function deleteReserve(id) {
                useDelete_reserve_admin(id);
                router.push({ name: 'dashboard' });
            }

            return { store, confirmReserve, unConfirmReserve, deleteReserve };
        }
    }
</script>

<style lang="scss">

    .id_col {
        font-weight: bold;
    }

    .buttons {
        display: inline-block;
        margin-right: 20px;
        margin-left: 20px;
        width: 120px;
        padding: 5px;
        text-transform: uppercase;
        font-weight: bold;
        font-size: 14px;
        border: 2px solid #333;
        border-radius: 10px; 
        background-color: #66D7D1;
        color: #333;
        &:hover{
            background-color: #4ba7a2;
        }
    }

    .cross_icon {
        color: red;
    }

    .check_icon {
        color: green;
    }

</style>