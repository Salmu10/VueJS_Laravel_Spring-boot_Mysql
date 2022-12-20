<template>
    <div class="container">
        <div class="row">
            <div class="col p-3">
                <h2>Create Category</h2>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="form-group">
                    <label htmlFor="todo">Category Name :</label>
                    <input type="text" class="form-control" v-model="state.category_local.category_name"/>
                </div>
                <div class="form-group">
                    <label htmlFor="desc">Image :</label>
                    <input type="text" class="form-control" v-model="state.category_local.image"/> 
                </div>
                <div class="form-group">
                    <button type="button" class="btn btn-primary m-1" @click="add_category()">Create</button>
                    <button type="button" class="btn btn-primary m-1" @click="cancel()">Cancel</button>
                </div>
            </div>
        </div>
    </div> 
</template>
  
<script>
    import Constant from '../../../Constant.js';
    import { reactive } from 'vue'
    import { useStore } from 'vuex'
    import { useRouter } from 'vue-router';
  
    export default {
        setup() {
            const store = useStore();
            const router = useRouter();

            const state = reactive({
                category_local: { category_name: "", image: "" }
            });

            function add_category() {
                if (state.category_local.category_name.trim().length >= 2) {
                    store.dispatch("categoryAdmin/" + Constant.ADD_CATEGORY, { category : state.category_local });
                    router.push({ name:"categories_list" });
                } else {
                    alert('Ingrese la categoria. Mínimo 2 caracteres.');
                }
            }
            function cancel() {
                router.push({ name:"categories_list"});
            }

            return { state, add_category, cancel }
        }
    }
</script>
  
<style lang="scss">

    .container {
        min-height: 75vh;
        h2 {
            margin-top: 3%;
        }
    }
  
</style>