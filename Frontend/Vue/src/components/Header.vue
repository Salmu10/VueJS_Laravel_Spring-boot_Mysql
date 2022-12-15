<template>
    <header>
        <div class="header-container">
            <div class="logo">
                <router-link class="link" to="/home">
                    <img src="../assets/logo.png" alt="logo">
                </router-link>
            </div>
            <search @search="apply_search" />
            <nav>
                <div class="nav_buttons">
                    <router-link class="link" to="/home">Home</router-link>
                    <router-link class="link" to="/reserve">Reserve</router-link>
                    <router-link class="link" to="/dashboard">PAdmin</router-link>
                </div>
            </nav>
        </div>
    </header>
</template>

<script>

    import { useRouter } from 'vue-router';
    import search from './search.vue';

    export default {
        components: { search },
        setup() {
            const router = useRouter();

            const apply_search = (search) => {
                // console.log(search);
                let filters = { categories: [search], capacity: 0, table_name: "", page: 1, limit: 3 };
                const filters_url = btoa(JSON.stringify(filters));
                router.push({ name: "reserve_filters", params: { filters: filters_url } });
                // localStorage.setItem("filters", JSON.stringify(filters));
                setTimeout(() => { window.location.reload(); }, 500);
            }

            return { apply_search }
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
        margin-bottom: 1em;
    }

    .header-container {
        display: grid;
        gap: 10px;
        grid-template-columns: 1fr 1fr 1fr;
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

    nav {
        grid-column-start: 3;
        grid-column-end: 4;
    }

    .icon {
        display: none;
    }

    .nav_buttons {
        display: grid;
        grid-template-columns: repeat(3, 0.5fr);
        grid-template-rows: repeat(3, 1fr);
        gap: 0px 20px;
    }

    .nav_buttons .link {
        grid-row-start: 2;
        grid-row-end: 3;
        text-align: center;
        font-size: 22px;
        text-transform: uppercase;
        font-weight: bold;
        color: #FB1D26;
    }

    a:visited, a:active, a:hover {
        color: #FB1D26;
        text-decoration: none;
    }

</style>