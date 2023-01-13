<template>
    <div class="users_list_container">
        <h1>Users List</h1>
        <router-link to="/dashboard/users/add" class="button add_button">Add User</router-link>
        <table class="table">
            <thead class="thead_tblist">
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Type</th>
                    <th>Image</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody class="tbody_tblist">
                <userAdmin_card v-for="user in state.users" :key="user.id" :user="user"/>
            </tbody>
        </table>
    </div>
</template>

<script>
    import { reactive, computed } from 'vue';
    import { useStore } from 'vuex';
    import Constant from '../../../Constant';
    import userAdmin_card from '../../../components/admin/userAdmin_card.vue';

    export default {
        components: { userAdmin_card },
        setup() {
            const store = useStore();

            store.dispatch("userAdmin/" + Constant.INITIALIZE_USER);

            const state = reactive({
                users: computed(() => store.getters['userAdmin/GetUsers'])
            });

            return { state };
        }
    }
</script>

<style lang="scss">

    .users_list_container {
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
        .add_button {
            display: block;
            width: 150px;
            padding: 10px;
            margin: auto;
            margin-bottom: 3%;
            text-transform: uppercase;
            text-align: center;
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