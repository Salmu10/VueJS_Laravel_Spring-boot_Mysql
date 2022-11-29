<template>
    <div class="reserve_container">
        <h1>RESERVE</h1>
        <table_card v-for="table in state.tables" :key="table.id" :table="table"/>
    </div>
</template>

<script>
    import { reactive, computed } from 'vue'
    import { useStore } from 'vuex'
    import Constant from '../Constant';
    import table_card from '../components/client/table_card.vue';

    export default {
        components: { table_card },
        setup() {
            const store = useStore();
            store.dispatch("table/" + Constant.INITIALIZE_TABLE);
            const state = reactive({
                tables: computed(() => store.getters["table/getTables"])
            })
            return { state }
        }
    }
</script>

<style lang="scss">

    .reserve_container {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        width: 100%;
    }

</style>