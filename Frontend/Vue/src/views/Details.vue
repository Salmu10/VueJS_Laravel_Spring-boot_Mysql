<template>
    <div class="details_container" v-if="state.table">
        <h1>{{ state.table.table_name }}</h1>
        <div class="table_info">
            <div class="table_image">
                <img :src="state.table.image" class="gallery-image" alt="">
            </div>
            <div class="table_desc">
                <!-- <h3>Table description:</h3>
                <div class="capacity">
                    Capacity: {{ state.table.capacity }}
                </div>
                <div>
                    Categories: <span class="cat_name" v-for="cat in state.table.categories">{{ cat.category_name }} &nbsp</span>
                </div> -->
                <reserve_table :table="state.table" @send_reserve="reserve_emit"/>
            </div>
        </div>
    </div>
    <div v-else>
        <span>This table is not available</span>
    </div>
</template>

<script>

    import { reactive, computed } from 'vue';
    import { useStore } from 'vuex';
    import { useRoute, useRouter } from 'vue-router';
    import Constant from '../Constant';
    import { createToaster } from "@meforma/vue-toaster";
    import reserve_table from '../components/client/reserve_table.vue';
    import { useReserve } from '../composables/useReserve';

    export default {
        components: { reserve_table },
        setup() {
            const store = useStore();
            const route = useRoute();
            const router = useRouter();
            
            const toaster = createToaster({ "position": "top-right", "duration": 3000 });
            const id = route.params.id;

            store.dispatch("table/" + Constant.INITIALIZE_ONE_TABLE, id);

            const state = reactive({
                table: computed(() => store.getters["table/GetOneTable"]),
                isLoged: store.getters['user/GetIsAuth'],
            })

            const reserve_emit = (data) => {
                if (state.isLoged) {
                    useReserve(data);
                    router.push({ name: 'home' });
                } else {
                    toaster.info('You must be loged to make a reserve.');
                }
            }

            return { state, reserve_emit }
        }
    }

</script>

<style lang="scss">
    .details_container {
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
        }
        .table_info {
            display: flex;
            flex-direction: row;
            width: 80%;
            margin: auto;
            justify-content: space-around;
            .table_image {
                width: 50%;
                img{
                    width: 100%;
                    border: 4px solid #142b3b;
                    border-radius: 15px;
                }
            }
            .table_desc {
                width: 40%;
            }
        }
    }
</style>