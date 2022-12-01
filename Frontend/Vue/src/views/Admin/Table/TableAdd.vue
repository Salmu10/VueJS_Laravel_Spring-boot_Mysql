<template>
    <div class="container">
        <div class="row">
            <div class="col p-3">
                <h2>Create Table</h2>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="form-group">
                    <label htmlFor="todo">Table Name :</label>
                    <input type="text" class="form-control" v-model="state.table_local.table_name"/>
                </div>
                <div class="form-group">
                    <label htmlFor="desc">Capacity :</label>
                    <input type="text" class="form-control" v-model="state.table_local.capacity"/> 
                </div>
                <div class="form-group">
                    <label htmlFor="desc">Available :</label>
                    <br>
                    <input type="checkbox" id="available" v-model="state.table_local.available"/>
                </div>
                <div class="form-group">
                    <label htmlFor="desc">Image :</label>
                    <input type="text" class="form-control" v-model="state.table_local.image"/> 
                </div>
                <div class="form-group">
                    <label>Choose a category:</label>
                    <v-select multiple v-model="state.table_local.categories" :options="state.categories"
                    :getOptionLabel="categories => categories.category_name"/>
                </div>
                <div class="form-group">
                    <button type="button" class="btn btn-primary m-1" @click="add_table()">Create</button>
                    <button type="button" class="btn btn-primary m-1" @click="cancel()">Cancel</button>
                </div>
            </div>
        </div>
    </div> 
</template>
  
<script>
    import Constant from '../../../Constant.js';
    import { reactive, computed } from 'vue'
    import { useStore } from 'vuex'
    import { useRouter } from 'vue-router';
  
    export default {
        setup() {
            const store = useStore();
            const router = useRouter();

            store.dispatch("categoryAdmin/" + Constant.INITIALIZE_CATEGORY);

            const state = reactive({
                table_local: { table_name: "", capacity: "", available: false, image: ""},
                categories: computed(() => store.getters['categoryAdmin/GetCategories']),
            });
            
            function add_table() {

                const cat = state.table_local.categories;
                const cat_names = cat.map(item => item.category_name);
                state.table_local.categories = cat_names;

                if (state.table_local.table_name.trim().length >= 2) {
                    store.dispatch("tableAdmin/" + Constant.ADD_TABLE, { table : state.table_local });
                    router.push({ name:"tables_list" });
                } else {
                    alert('Ingrese la table. Mínimo 2 caracteres.');
                }
            }
            
            function cancel() {
                router.push({ name:"tables_list"});
            }

            return { state, add_table, cancel }
        }
    }
</script>
  
<style lang="scss">

    @import '../../../../node_modules/vue-select/dist/vue-select.css';

    .container {
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