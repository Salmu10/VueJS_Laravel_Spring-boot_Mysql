<template>
    <SignForm type="SignIn" @onSubmit="login"/>
</template>

<script>
    import SignForm from '../../components/SignForm.vue';
    import { useRouter } from 'vue-router';

    export default {
        components: { SignForm },
        setup() {

            const router = useRouter();

            const login = (user) => {
                console.log(user);
                router.push({ name: 'home' })
            }

            return { login };    
        }
    }
</script>

<style>
</style>