<template>
    <div class="container">
        <div class="row">
            <div class="col p-3">
                <h2>Modify User</h2>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" class="form-control" v-model="state.user_local.username" required/>
                    <span class="text-danger"><em>{{ state.username_error }}</em></span>
                </div>
                <div class="form-group">
                    <label htmlFor="email">email:</label>
                    <input type="text" class="form-control" id="email" v-model="state.user_local.email" required/> 
                    <span class="text-danger"><em>{{ state.email_error }}</em></span>
                </div>
                <div class="form-group">
                    <label htmlFor="pass">Password:</label>
                    <input type="password" class="form-control" id="pass" v-model="state.user_local.password" required/>
                    <span class="text-danger"><em>{{ state.passw_error }}</em></span> 
                </div>
                <div class="form-group">
                    <label htmlFor="image">Image:</label>
                    <input type="url" class="form-control" id="image" v-model="state.user_local.image"/>
                    <span class="text-danger"><em>{{ state.image_error }}</em></span>
                </div>
                <div class="form-group">
                    <button type="button" class="btn btn-primary m-1" @click="update_user()">Update</button>
                    <button type="button" class="btn btn-primary m-1" @click="cancel()">Cancel</button>
                </div>
            </div>
        </div>
    </div> 
</template>
  
<script>
    import { reactive, computed } from 'vue';
    import { useStore } from 'vuex';
    import { useRouter, useRoute } from 'vue-router';
    import Constant from '../../../Constant.js';
    import { useVuelidate } from '@vuelidate/core';
    import { required, email, minLength, maxLength, url } from '@vuelidate/validators';
  
    export default {
        setup() {
            const store = useStore();
            const router = useRouter();
            const route = useRoute();

            store.dispatch("userAdmin/" + Constant.INITIALIZE_ONE_USER, route.params.id);

            const state = reactive({
                user_local: computed(() => store.getters['userAdmin/GetUser']),
                error_update: { username: "", email: "", password: "", password_2: "" },
            });

            setTimeout(() => {
                state.user_local.is_active = Boolean(state.user_local.is_active);
                // console.log(state.user_local);
            }, 200);

            const rules = {
                username: { required, minLength: minLength(4), maxLength: maxLength(10) },
                email: { required, email },
                password: { required, minLength: minLength(5) },
                image: { url },
            }

            state.error_update = useVuelidate(rules, state.user_local);

            function update_user() {
                let validate = true;

                if (state.error_update.username.$invalid == true) {
                    state.username_error = "*Username is requiered and compresed with 4 to 10 characters";
                    validate = false;
                } else {
                    state.username_error = "";
                }

                if (state.error_update.email.$invalid == true) {
                    state.email_error = "*Email format is incorrect and requierd";
                    validate = false;
                } else {
                    state.email_error = "";
                }

                if (state.error_update.password.$invalid == true) {
                    state.passw_error = "*Password is requierd and minimun 5 characters";
                    validate = false;
                } else {
                    state.passw_error = "";
                }

                if (state.error_update.image.$invalid == true) {
                    state.image_error = "*The image must be an url";
                    validate = false;
                } else {
                    state.image_error = "";
                }

                if (validate == true) {
                    // console.log(state.user_local);
                    store.dispatch("userAdmin/" + Constant.UPDATE_USER, { user: state.user_local });
                    router.push({ name:"users_list" });
                }
            }

            function cancel() {
                router.push({ name:"users_list"});
            }

            return { state, update_user, cancel };
        }
    }
</script>
  
<style lang="scss">
  
  @import '../../../../node_modules/vue-select/dist/vue-select.css';

    .container {
        min-height: 75vh;
        h2 {
            margin-top: 3%;
        }
    }

</style>