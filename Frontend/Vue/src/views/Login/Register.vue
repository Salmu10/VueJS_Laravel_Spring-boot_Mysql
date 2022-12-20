<template>
    <SignForm type="SignUp" @onSubmit="register"/>
</template>

<script>
    import SignForm from '../../components/SignForm.vue';
    import { useRouter } from 'vue-router';

    export default {
        components: { SignForm },
        setup() {

            const router = useRouter();

            const register = (user) => {
                console.log(user);
                router.push({ name: 'home' });
            }

            return { register };    
        }
    }
</script>

<style>
</style>