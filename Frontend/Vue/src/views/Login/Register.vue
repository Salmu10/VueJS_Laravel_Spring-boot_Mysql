<template>
    <SignForm type="SignUp" @onSubmit="register"/>
</template>

<script>
    import SignForm from '../../components/SignForm.vue';
    import Constant from '../../Constant.js';
    import { useStore } from 'vuex';

    export default {
        components: { SignForm },
        setup() {
            const store = useStore();

            const register = (user) => {
                console.log(user);
                store.dispatch("user/" + Constant.REGISTER, user);
            }

            return { register };    
        }
    }
</script>

<style>
</style>