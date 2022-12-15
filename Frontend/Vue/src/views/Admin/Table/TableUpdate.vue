<template>
    <div class="container">
        <div class="row">
            <div class="col p-3">
                <h2>Modify Table</h2>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="form-group">
                    <label htmlFor="cat_name">Table Name:</label>
                    <input type="text" class="form-control" v-model="state.table_local.table_name"/>
                </div>
                <div class="form-group">
                    <label htmlFor="img">Image:</label>
                    <input type="text" class="form-control" id="img" v-model="state.table_local.image"/>  
                </div>
                <div class="form-group">
                    <label htmlFor="img">Capacity:</label>
                    <input type="text" class="form-control" id="img" v-model="state.table_local.capacity"/>  
                </div>
                <div class="form-group">
                    <label htmlFor="available">Available:</label><br>
                    <input type="checkbox" id="available" v-model="state.table_local.available"/>
                </div>
                <div class="form-group">
                    <label>Choose a category:</label>
                    <v-select multiple v-model="state.table_local.categories" :options="state.categories"
                    :getOptionLabel="categories => categories.category_name"/>
                </div>
                <div class="form-group">
                    <button type="button" class="btn btn-primary m-1" @click="update_table()">Update</button>
                    <button type="button" class="btn btn-primary m-1" @click="cancel()">Cancel</button>
                </div>
            </div>
        </div>
    </div> 
</template>
  
<script>
    import Constant from '../../../Constant.js';
    import { reactive, computed } from 'vue';
    import { useStore } from 'vuex';
    import { useRouter, useRoute } from 'vue-router';
  
    export default {
        setup() {
            const store = useStore();
            const router = useRouter();
            const route = useRoute();

            store.dispatch("tableAdmin/" + Constant.INITIALIZE_ONE_TABLE, route.params.id);
            store.dispatch("categoryAdmin/" + Constant.INITIALIZE_CATEGORY);

            const state = reactive({
                table_local: computed(() => store.getters['tableAdmin/GetTable']),
                categories: computed(() => store.getters['categoryAdmin/GetCategories']),
            });

            setTimeout(() => {
                state.table_local.available = Boolean(state.table_local.available);
            }, 1000);

            function update_table() {
                const cat = state.table_local.categories;
                const cat_names = cat.map(item => item.category_name);
                state.table_local.categories = cat_names;

                store.dispatch("tableAdmin/" + Constant.UPDATE_TABLE, { table: state.table_local });
                router.push({ name:"tables_list" });
            }

            function cancel() {
                router.push({ name:"tables_list"});
            }

            return { state, update_table, cancel };
        }
    }
</script>
  
<style lang="scss">
  
  @import '../../../../node_modules/vue-select/dist/vue-select.css';

    .container {
        min-height: 68vh;
        select {
            background-color: transparent;
            border: none;
            padding: 0 1em 0 0;
            margin: 0;
            width: 100%;
            font-family: inherit;
            font-size: inherit;
            cursor: inherit;
            line-height: inherit;
            outline: none;
            z-index: 1;
        }
        .select {
            display: grid;
            grid-template-areas: "select";
            align-items: center;
            position: relative;
            min-width: 15ch;
            max-width: 30ch;
            border: 1px solid var(--select-border);
            border-radius: 0.25em;
            padding: 0.25em 0.5em;
            font-size: 1.25rem;
            cursor: pointer;
            line-height: 1.1;
            background: linear-gradient(to bottom, #ffffff 0%, #e5e5e5 100%);
            select {
                grid-area: select;
            }
            &::after {
                grid-area: select;
                content: "";
                justify-self: end;
                width: 0.8em;
                height: 0.5em;
                background-color: var(--select-arrow);
                clip-path: polygon(100% 0%, 0 0%, 50% 100%);
            }
        }
    }

</style>