<template>
    <header>
        <div class="header-container">
            <div class="logo">
                <router-link class="link" to="/home">
                    <img src="../assets/logo.png" alt="logo">
                </router-link>
            </div>
            <search class="search" @search="apply_search"/>
            <nav>
                <div class="nav_buttons">
                    <router-link class="link" to="/home">Home</router-link>
                    <router-link class="link" to="/reserve">Reserve</router-link>
                    <router-link class="link" to="/login" v-if="!state.isLoged">Login</router-link>
                    <router-link class="link" to="/register" v-if="!state.isLoged">Register</router-link>
                    <router-link class="link" to="/dashboard" v-if="state.isAdmin">PAdmin</router-link>
                    <!-- <router-link class="link" to="" v-if="state.isAdmin">Admin</router-link> -->
                    <router-link to="/dashboard" v-if="state.isAdmin">
                        <button type="button" class="link_btn btn position-relative">
                            <font-awesome-icon icon="fa-solid fa-user"/>
                            Admin
                            <span v-if="state.notifications != 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger text-white text-center">
                                {{ state.notifications }}
                            </span>
                        </button>
                    </router-link>
                    <a class="link" src="#" v-if="state.isLoged && !state.isAdmin" @click="">
                        <font-awesome-icon icon="fa-solid fa-user"/>
                        <p class="username">{{ state.profile.username }}</p>
                    </a>
                    <a class="link" src="#" v-if="state.isLoged" @click="logout()">Logout</a>
                    <!-- <a class="link" src="#" @click="logout()">Logout</a> -->
                </div>
            </nav>
        </div>
    </header>
</template>

<script>

    import { useRouter } from 'vue-router';
    import search from './search.vue';
    import { useStore } from 'vuex';
    import { reactive, computed } from 'vue';
    import Constant from '../Constant.js';
    import { useAdmin_notifications } from '../composables/useReserve';

    export default {
        components: { search },
        setup() {
            const router = useRouter();
            const store = useStore();

            const state = reactive({
                isAdmin: computed(() => store.getters['user/GetIsAdmin']),
                isLoged: computed(() => store.getters['user/GetIsAuth']),
                profile: computed(() => store.getters['user/GetUser']),
                notifications: 0,
            });

            setTimeout(() => { 
                if (state.isAdmin) {
                    state.notifications = useAdmin_notifications();
                }
            }, 200);

            const apply_search = (search) => {
                let filters = { categories: [search], capacity: 0, table_name: "", page: 1, limit: 3 };
                const filters_url = btoa(JSON.stringify(filters));
                router.push({ name: "reserve_filters", params: { filters: filters_url } });
                setTimeout(() => { window.location.reload(); }, 500);
            }

            function logout() {
                store.dispatch(`user/${Constant.LOGOUT}`);
            }

            return { state, apply_search, logout }
        }
    }

</script>

<style lang="scss">

    $color_pricipal: #142b3b;
    $color_secundario: #EAF2E3;

    header {
        width: 100%;
        background-color: $color_pricipal;
        padding: 0.5em 0;
    }

    .header-container {
        display: grid;
        gap: 10px;
        grid-template-columns: 0.8fr 1fr 1.2fr;
        margin-right: 20px;
        align-items: center;
    }

    .logo {
        grid-column-start: 1;
        grid-column-end: 2;
        text-align: left;
        margin-left: 5%;
    }
    
    .logo img {
        width: 350px;
        height: 100px;
        text-align: center;
        margin: auto;
        margin-right: 5%;
    }

    // .search {
    //     width: 400px;
    // }

    nav {
        grid-column-start: 3;
        grid-column-end: 4;
        
    }

    .icon {
        display: none;
    }

    .nav_buttons {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-left: 20px;
        height: 100px;
    }

    .nav_buttons .link {
        text-align: center;
        font-size: 22px;
        text-transform: uppercase;
        font-weight: bold;
        color: #FB1D26;
        cursor: pointer;
        padding: 6px 12px;
        margin: 10px;
    }

    a:visited, a:active, a:hover {
        color: #FB1D26;
        text-decoration: none;
    }

    .username {
        display: inline-block;
        margin: 0;
        margin-left: 8px;
    }

    .link_btn {
        background-color: none;
        color: #FB1D26;
        font-size: 22px;
        text-transform: uppercase;
        font-weight: bold;
        margin: 10px;
        &:hover {
            color: #FB1D26;
        }
    }

</style>