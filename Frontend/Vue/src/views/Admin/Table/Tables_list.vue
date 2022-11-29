<template>
    <div class="home_container">
        <h1>Tables List</h1>
        <div v-for="table in state.tables" :key="table.id">
            <p>{{ state.tables }}</p>
        </div>
    </div>
</template>

<script>
    import { reactive, computed } from 'vue';
    import { useStore } from 'vuex';
    import Constant from '../../../Constant';

    export default {
        setup() {
            const store = useStore();
            store.dispatch("tableAdmin/" + Constant.INITIALIZE_TABLE);
            const state = reactive({
                tables: computed(() => store.getters['tableAdmin/getTables'])
            });
            return { state };
        }
    }
</script>

<style lang="scss">

</style>