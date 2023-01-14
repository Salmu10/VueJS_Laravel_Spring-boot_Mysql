<template>
    <div class="container">
        <div class="row">
            <div class="col p-3">
                <h2>Create User</h2>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="form-group">
                    <label for="username" class="etiqueta">Username:</label>
                    <input type="text" id="username" class="form-control" v-model="state.user_local.username"/>
                    <span class="text-danger"><em>{{ state.username_error }}</em></span>
                </div>
                <div class="form-group">
                    <label for="email" class="etiqueta">Email:</label>
                    <input type="text" id="email" class="form-control" v-model="state.user_local.email" placeholder="ejemplo@gmail.com"/>
                    <span class="text-danger"><em>{{ state.email_error }}</em></span>
                </div>
                <div class="form-group">
                    <label for="password" class="etiqueta">Password:</label>
                    <br>
                    <input type="password" id="password" class="form-control" v-model="state.user_local.password"/>
                    <span class="text-danger"><em>{{ state.passw_error }}</em></span>
                </div>
                <div class="form-group">
                    <label for="password_2" class="etiqueta">Repeat password:</label>
                    <br>
                    <input type="password" id="password_2" class="form-control" v-model="state.user_local.password_2"/>
                    <span class="text-danger"><em>{{ state.passw_2_error }}</em></span>
                </div>
                <div class="form-group">
                    <label for="image" class="etiqueta">Image:</label>
                    <input type="text" id="image" class="form-control" v-model="state.user_local.image"/>
                </div>
                <div class="form-group">
                    <label for='type' class="etiqueta">User type: </label>
                    <input type="radio" name="type" class="radio_button" value="client" v-model="state.user_local.type"> Client
                    <input type="radio" name="type" class="radio_button" value="admin" v-model="state.user_local.type"> Admin
                    <span class="text-danger d-block"><em>{{ state.type_error }}</em></span>
                </div>
                <div class="form-group">
                    <button type="button" class="btn btn-primary m-1" @click="add_user()">Create</button>
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
    import { useVuelidate } from '@vuelidate/core';
    import { required, email, minLength, maxLength, url } from '@vuelidate/validators';
  
    export default {
        setup() {
            const store = useStore();
            const router = useRouter();

            const state = reactive({
                user_local: { username: "", email: "", password: "", password_2: "", image: "", type: ""},
                error_add: { username: "", email: "", password: "", password_2: "", image: "", type: ""},
            });

            const rules = {
                username: { required, minLength: minLength(4), maxLength: maxLength(10) },
                email: { required, email },
                password: { required, minLength: minLength(5) },
                password_2: { required, minLength: minLength(5) },
                image: { url },
                type: { required }
            }

            state.error_add = useVuelidate(rules, state.user_local);
            
            function add_user() {

                let validate = true;

                if (state.error_add.username.$invalid == true) {
                    state.username_error = "*Username is requiered and compresed with 4 to 10 characters";
                    validate = false;
                } else {
                    state.username_error = "";
                }

                if (state.error_add.email.$invalid == true) {
                    state.email_error = "*Email format is incorrect and requierd";
                    validate = false;
                } else {
                    state.email_error = "";
                }

                if (state.error_add.password.$invalid == true) {
                    state.passw_error = "*Password is requierd and minimun 5 characters";
                    validate = false;
                } else {
                    state.passw_error = "";
                    if (state.error_add.password_2.$invalid == true) {
                        state.passw_2_error = "*Passwords must match";
                        validate = false;
                    } else {    
                        if (state.user_local.password != state.user_local.password_2) {
                            state.passw_2_error = "*Passwords must match";
                            validate = false;
                        } else {
                            state.passw_2_error = "";
                        }
                    }
                }

                if (state.error_add.image.$invalid == true) {
                    state.image_error = "*The image must be an url";
                    validate = false;
                } else {
                    state.image_error = "";
                }

                if (state.error_add.type.$invalid == true) {
                    state.type_error = "*Type is requierd";
                    validate = false;
                } else {
                    state.type_error = "";
                }

                if (validate == true) {
                    console.log(state.user_local);
                    store.dispatch("userAdmin/" + Constant.ADD_USER, { user: state.user_local });
                    // router.push({ name:"users_list" });
                }
            }
            
            function cancel() {
                router.push({ name:"users_list"});
            }

            return { state, add_user, cancel }
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
        .radio_button {
            margin-left: 10px;
        }

    }
  
</style>