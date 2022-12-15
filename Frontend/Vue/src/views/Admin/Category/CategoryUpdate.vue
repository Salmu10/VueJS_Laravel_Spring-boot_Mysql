<template>
    <div class="container">
        <div class="row">
            <div class="col p-3">
                <h2>Modify category</h2>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="form-group">
                    <label htmlFor="cat_name">Category Name:</label>
                    <input type="text" class="form-control" v-model="state.category_local.category_name"/>
                </div>
                <div class="form-group">
                    <label htmlFor="img">Image:</label>
                    <input type="text" class="form-control" id="img" v-model="state.category_local.image"/>  
                </div>
                <div class="form-group">
                    <button type="button" class="btn btn-primary m-1" @click="update_category()">Update</button>
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

            store.dispatch("categoryAdmin/" + Constant.INITIALIZE_ONE_CATEGORY, route.params.id);
        
            const state = reactive({
                category_local: computed(() => store.getters['categoryAdmin/GetCategory']),
            });

            function update_category() {
                store.dispatch("categoryAdmin/" + Constant.UPDATE_CATEGORY, { category: state.category_local });
                router.push({ name:"categories_list" });
            }

            function cancel() {
                router.push({ name:"categories_list"});
            }

            return { state, update_category, cancel };
        }
    }
</script>
  
<style>

    .container {
        min-height: 68vh;
    }
  
</style>