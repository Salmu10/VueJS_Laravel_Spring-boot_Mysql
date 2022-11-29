<template>
    <div class="container">
        <div class="row">
            <div class="col p-3">
                <h2>Cambiar contenido de tareas pendientes</h2>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="form-group">
                    <label htmlFor="todo">Tarea:</label>
                    <!-- <input type="text" class="form-control" v-model="state.todoitemlocal.todo" />
                    </div>
                    <div class="form-group">
                        <label htmlFor="desc">Descripción:</label>
                        <textarea class="form-control" rows="3" id="desc" v-model="state.todoitemlocal.desc"></textarea>  
                    </div>
                    <div class="form-group">
                        <label htmlFor="desc">Terminación : </label>&nbsp;
                        <input type="checkbox" v-model="state.todoitemlocal.done" />   
                    </div> -->
                    <div class="form-group">
                        <button type="button" class="btn btn-primary m-1" @click="update_category">Actualizar</button>
                        <button type="button" class="btn btn-primary m-1" @click="cancel">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    </div> 
</template>
  
<script>
    import Constant from '../../../Constant.js';
    // import { reactive } from 'vue';
    import { useStore } from 'vuex';
    import { useRouter, useRoute } from 'vue-router';
  
    export default {
        setup() {
            const store = useStore();
            const router = useRouter();
            const route = useRoute();

            store.dispatch(`categoryDashboard/${Constant.INITIALIZE_ONE_CATEGORY}`, route.params.id);
            const state = reactive({
                category: computed(() => store.getters['categoryDashboard/GetCategory'])
            });

            const update_category = () => {
                router.push({ name:"categories_list" });
                // store.dispatch(Constant.UPDATE_TODO, { todoitem: state.todoitemlocal });
            }

            const cancel = () => {
                router.push({ name:"categories_list"});
            }

            return { update_category, cancel };
        }
    }
</script>
  
<style>
  
</style>