<template>
    <tr>
        <td class="id_col">{{ user.id }}</td>
        <td>{{ user.username }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.type }}</td>
        <td><img :src="user.image" class="" alt=""/></td>
        <td> 
            <button class="buttons" @click="updateUser(user.id)">Edit</button>
            <button class="buttons" @click="deleteUser(user.id)">Delete</button>
        </td>
    </tr>
</template>

<script>

    import { useStore } from 'vuex';
    import { useRouter } from 'vue-router';
    import Constant from '../../Constant.js';

    export default {
        props: {
            user: Object
        },
        setup(props) {

            const store = useStore();
            const router = useRouter();

            function updateUser(id) {
                store.dispatch("userAdmin/" + Constant.INITIALIZE_USER, { user: { ...props.user } });
                router.push({ name: 'user_update', params: { id } });
            }
            function deleteUser(id) {
                store.dispatch("userAdmin/" + Constant.DELETE_USER, { id });
            }

            return { store, updateUser, deleteUser };
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