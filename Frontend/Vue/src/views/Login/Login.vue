<template>
    <SignForm type="SignIn" @onSubmit="login"/>
</template>

<script>
    import SignForm from '../../components/SignForm.vue';
    import Constant from '../../Constant.js';
    import { useStore } from 'vuex';

    export default {
        components: { SignForm },
        setup() {
            const store = useStore();

            const login = (user) => {
                console.log(user);
                store.dispatch("user/" + Constant.LOGIN, user);
            }

            return { login };    
        }
    }
</script>

<style>
</style>