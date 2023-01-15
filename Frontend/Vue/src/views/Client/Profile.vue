<template>
    <div class="profile_container">
        <h1>PROFILE</h1>
        <div class="user_info">
            <div class="profile_image">
                <img class="" :src="state.user.image" alt=""/>
            </div>
            <div class="profile_user">
                <p><strong>Username: </strong>{{ state.user.username }}</p>
                <p><strong>Email: </strong>{{ state.user.email }}</p>
            </div>
        </div>
        <user_reserves/>
    </div>
  </template>
  
<script>
    import { reactive, computed } from 'vue';
    import { useStore } from 'vuex';
    import Constant from '../../Constant';
    import user_reserves from '../../components/client/user_reserves.vue';

    export default {
        components: { user_reserves },
        setup() {
            const store = useStore();

            if (localStorage.getItem("token")) {
                store.dispatch(`user/${Constant.PROFILE}`);
            }

            const state = reactive({
                user: computed(() => store.getters['user/GetUser'])
            });

            return { state };
        }
    }
</script>

<style lang="scss">

    .profile_container {
        width: 100%;
        padding: 20px;
        min-height: 75vh;
        h1 {
            text-align: center;
            font-size: 35px;
            font-weight: bold;
            text-transform: uppercase;
            color: #333;
            padding: 20px;
            margin-top: 10px;
        }
        .user_info {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            .profile_image {
                width: 30%;
            }
        }
    }

</style>