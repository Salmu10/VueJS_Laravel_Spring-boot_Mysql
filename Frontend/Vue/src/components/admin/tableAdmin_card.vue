<template>
    <tr>
        <td class="id_col">{{ table.id }}</td>
        <td>{{ table.table_name }}</td>
        <td>{{ table.capacity }}</td>
        <td>{{ table.available }}</td>
        <td>{{ table.image }}</td>
        <td> 
            <button class="buttons" @click="updateTable(table.id)">Edit</button>
            <button class="buttons" @click="deleteTable(table.id)">Delete</button>
        </td>
    </tr>
</template>

<script>

    import { useStore } from 'vuex';
    import { useRouter } from 'vue-router';
    import Constant from '../../Constant.js';

    export default {
        props: {
            table: Object
        },
        setup(props) {

            const store = useStore();
            const router = useRouter();

            function updateTable(id) {
                store.dispatch("tableAdmin/" + Constant.INITIALIZE_TABLE, { table: { ...props.table } });
                router.push({ name: 'table_update', params: { id } });
            }
            function deleteTable(id) {
                store.dispatch("tableAdmin/" + Constant.DELETE_TABLE, { id });
            }

            return { store, updateTable, deleteTable };
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
        width: 90px;
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
</style>