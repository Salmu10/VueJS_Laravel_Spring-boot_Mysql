<template>
    <div class="search">
        <input type="text" class="search_input" placeholder="Search..." v-model="state.categories" @change="send_search()">
        <button type="submit" class="search_button">
            <font-awesome-icon icon="fa fa-search" @click="search_filter()"/>
        </button>
    </div>
</template>

<script>

    import { reactive, getCurrentInstance } from 'vue';
    import { useRouter } from 'vue-router';

    export default {
        props: {
            search: String
        },
        emits: {
            search: String
        },
        setup(props) {
            const router = useRouter();
            const { emit } = getCurrentInstance();

            const state = reactive({
                categories: props.search ? props.search : ""
            });

            const search_filter = () => {
                if (state.categories !== "") {
                    const filters = { categories: [state.categories], table_name: "", capacity: 0 };
                    const filters_url = btoa(JSON.stringify(filters));
                    router.push({ name: "reserve_filters", params: { filters: filters_url } });
                    state.categories = "";
                }
            }

            const send_search = () => {
                emit('search', state.categories);
                state.categories = "";
                setTimeout(() => { window.location.reload(); }, 500);
            }

            return { state, search_filter, send_search };
        }
    }
</script>

<style lang="scss">

    .search {
        width: 100%;
        position: relative;
        display: flex;
    }

    .search_input {
        width: 100%;
        border: 3px solid #FB1D26;
        border-right: none;
        padding: 5px;
        height: 36px;
        border-radius: 5px 0 0 5px;
        outline: none;
        color: #333;
        font-weight: bold;
        background-color: white;
        &:focus {
            color: #333;
        }
        &::placeholder {
            color: #333;
            text-transform: uppercase;
            letter-spacing: 1.5px;
        }
    }

    .search_button {
        width: 40px;
        height: 36px;
        border: 1px solid #FB1D26;
        background: #FB1D26;
        text-align: center;
        color: #fff;
        border-radius: 0 5px 5px 0;
        cursor: pointer;
        font-size: 20px;
    }
    
</style>