<template>
    <div class="user">
        <div class="user_options-container">
            <div class="user_options-text">
                <div class="user_options-unregistered">
                    <h2 class="user_unregistered-title">Don't have an account?</h2>
                    <p class="user_unregistered-text">Register now and you can reserve the desired table.</p>
                    <button class="user_unregistered-signup" id="signup-button" @click="redirect.register()">Sign up</button>
                </div>
                <div class="user_options-registered">
                    <h2 class="user_registered-title">Have an account?</h2>
                    <p class="user_registered-text">Sign in with your account and continue with your reserve.</p>
                    <button class="user_registered-login" id="login-button" @click="redirect.login()">Sign in</button>
                </div>
            </div>
            
            <div class="user_options-forms" id="user_options-forms" :class="state.bounce">
                <div class="user_forms-login">
                    <h2 class="forms_title">Sign in</h2>
                    <form class="forms_form" id="login_form">
                        <fieldset class="forms_fieldset">
                            <div class="forms_field">
                                <input type="name" placeholder="Username or email" class="forms_field-input" v-model="state.login.username" required autofocus />
                                <span class="text-danger"><em>{{ state.username_error }}</em></span>
                            </div>
                            <div class="forms_field">
                                <input type="password" placeholder="Password" class="forms_field-input" v-model="state.login.password" required />
                                <span class="text-danger"><em>{{ state.passw_error }}</em></span>
                            </div>
                        </fieldset>
                        <div class="forms_buttons">
                            <input type="button" value="Sign In" class="forms_buttons-action" @click="login()">
                        </div>
                    </form>
                </div>
            <div class="user_forms-signup">
                <h2 class="forms_title">Sign Up</h2>
                <form class="forms_form">
                    <fieldset class="forms_fieldset">
                        <div class="forms_field">
                            <input type="text" placeholder="Username" class="forms_field-input" v-model="state.register.username" required/>
                            <span class="text-danger"><em>{{ state.username_error }}</em></span>
                        </div>
                        <div class="forms_field">
                            <input type="email" placeholder="Email" class="forms_field-input" v-model="state.register.email" required/>
                            <span class="text-danger"><em>{{ state.email_error }}</em></span>
                        </div>
                        <div class="forms_field">
                            <input type="password" placeholder="Password" class="forms_field-input" v-model="state.register.password" required/>
                            <span class="text-danger"><em>{{ state.passw_error }}</em></span>
                        </div>
                        <div class="forms_field">
                            <input type="password" placeholder="Repeat password" class="forms_field-input" v-model="state.register.password_2" required/>
                            <span class="text-danger"><em>{{ state.passw_2_error }}</em></span>
                        </div>
                    </fieldset>
                    <div class="forms_buttons">
                        <input type="button" value="Sign up" class="forms_buttons-action" @click="register()">
                    </div>
                </form>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { reactive, getCurrentInstance } from 'vue'; //getCurrentInstance
    import { useRouter } from 'vue-router';
    import { useVuelidate } from '@vuelidate/core';
    import { required, email, minLength, maxLength } from '@vuelidate/validators';

    export default {
        props: {
            type: String
        },
        emits: {
            onSubmit: Object
        },
        setup(props) {

            const { emit } = getCurrentInstance();
            const router = useRouter();

            const redirect = {
                login: () => router.push({ name: 'login' }),
                register: () => router.push({ name: 'register' }),
            };

            const state = reactive({
                login: { username: "",  password: "" },
                register: { username: "", email: "",  password: "", password_2: "" },
                error_login: { username: "", password: "" },
                error_register: { username: "", email: "", password: "", password_2: "" },
                bounce: props.type,
            })

            const rules = {
                username: { required, minLength: minLength(4), maxLength: maxLength(10) },
                email: { required, email },
                password: { required, minLength: minLength(5) },
                password_2: { required, minLength: minLength(5) },
            }

            state.error_login = useVuelidate(rules, state.login);
            state.error_register = useVuelidate(rules, state.register);

            function login() {
                if (state.error_login.username.$invalid == true) {
                    if (state.error_login.username.$model != "") {
                        state.username_error = "*Email format or Username is invalid. Minimum 4 characters";
                    } else {
                        state.username_error = "*Email or Username is required";
                    }
                } else {
                    state.username_error = "";
                    if (state.error_login.password.$invalid == true) {
                        state.passw_error = "*Password is required"
                    } else {
                        state.passw_error = "";
                        const data = { username: state.login.username, password: state.login.password };
                        emit('onSubmit', data);
                    }
                }
            }

            function register() {

                let validate = true;

                if (state.error_register.username.$invalid == true) {
                    state.username_error = "*Username is requiered and compresed with 4 to 10 characters";
                    validate = false;
                } else {
                    state.username_error = "";
                }

                if (state.error_register.email.$invalid == true) {
                    state.email_error = "*Email format is incorrect and requierd";
                    validate = false;
                } else {
                    state.email_error = "";
                }

                if (state.error_register.password.$invalid == true) {
                    state.passw_error = "*Password is requierd and minimun 5 characters";
                    validate = false;
                } else {
                    state.passw_error = "";
                    if (state.error_register.password_2.$invalid == true) {
                        state.passw_2_error = "*Passwords must match";
                        validate = false;
                    } else {    
                        if (state.register.password != state.register.password_2) {
                            state.passw_2_error = "*Passwords must match";
                            validate = false;
                        } else {
                            state.passw_2_error = "";
                        }
                    }
                }

                if (validate == true) {
                    emit('onSubmit', state.register);
                }
            }

            return { redirect, state, login, register};

        }
    }
</script>

<style lang="scss">

    $bdrds: 3px;

    $white: #fff;
    $black: #000;
    $gray: #ccc;
    $red: #FB1D26;
    $smoky-black: rgba(#222222, .85);

    $ff: Wallie, Helvetica;
    $ff-body: 12px;
    $ff-light: 300;
    $ff-regular: 400;
    $ff-medium: 500;
    $ff-strong: 700;

    button {
        background-color: transparent;
        padding: 0;
        border: 0;
        outline: 0;
        cursor: pointer;
    }
  
    input {
        background-color: transparent;
        padding: 0;
        border: 0;
        outline: 0;
        &[type="submit"] {
            cursor: pointer;
        }
        &::placeholder {
            font-size: .85rem;
            letter-spacing: .1rem;
            color: $gray;
        }
    }
    
    @keyframes bounceLeft {
        0% {
            transform: translate3d(100%, -50%, 0);
        }

        50% {
            transform: translate3d(-30px, -50%, 0);
        }

        100% {
            transform: translate3d(0, -50%, 0);
        }
    }

    @keyframes bounceRight {
        0% {
            transform: translate3d(0, -50%, 0);
        }

        50% {
            transform: translate3d(calc(100% + 30px), -50%, 0);
        }

        100% {
            transform: translate3d(100%, -50%, 0);
        }
    }

    @keyframes showSignUp {
        100% {
            opacity: 1;
            visibility: visible;
            transform: translate3d(0, 0, 0);
        }
    }
  
    .user {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100vh;
        background-image: url("../assets/Casal.jpg");
        background-size: cover;
        background-repeat: no-repeat;
        &_options-container {
            position: relative;
            width: 80%;
        }
        &_options-text {
            display: flex;
            justify-content: space-between;
            width: 100%;
            background-color: $smoky-black;
            border-radius: $bdrds;
        }
    }

    .user_options-registered, .user_options-unregistered {
        width: 50%;
        padding: 100px 45px;
        color: $white;
        font-weight: $ff-light;
    }

    .user_registered-title, .user_unregistered-title {
        margin-bottom: 15px;
        font-size: 1.66rem;
        line-height: 1em;
    }

    .user_unregistered-text, .user_registered-text {
        font-size: .83rem;
        line-height: 1.4em;
    }

    .user_registered-login, .user_unregistered-signup {
        margin-top: 30px;
        border: 1px solid $gray;
        border-radius: $bdrds;
        padding: 10px 30px;
        color: $white;
        text-transform: uppercase;
        line-height: 1em;
        letter-spacing: .2rem;
        transition: background-color .2s ease-in-out, color .2s ease-in-out;
        &:hover {
            color: $smoky-black;
            background-color: $gray;
        }
    }

    .user_options-forms {
        position: absolute;
        top: 50%;
        left: 30px;
        width: calc(50% - 30px);
        min-height: 550px;
        background-color: $white;
        border-radius: $bdrds;
        box-shadow: 2px 0 15px rgba($black, .25);
        overflow: hidden;
        transform: translate3d(100%, -50%, 0);
        transition: transform .4s ease-in-out;
    }

    .user_forms-login {
        transition: opacity .4s ease-in-out, visibility .4s ease-in-out;
    }

    .forms {
        &_title {
        margin-bottom: 45px;
        font-size: 1.5rem;
        font-weight: $ff-medium;
        line-height: 1em;
        text-transform: uppercase;
        color: $red;
        letter-spacing: .1rem;
        }

        &_field {
            &:not(:last-of-type) {
                margin-bottom: 20px;
            }
        }

        &_field-input {
            width: 100%;
            border-bottom: 1px solid $gray;
            padding: 6px 20px 6px 6px;
            font-family: $ff;
            font-size: 1rem;
            font-weight: $ff-light;
            color: darken($gray, 30%);
            letter-spacing: .1rem;
            transition: border-color .2s ease-in-out;
        }

        &:focus {
            border-color: darken($gray, 30%);
        }

        &_buttons {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 35px;
            &-forgot {
                font-family: $ff;
                letter-spacing: .1rem;
                color: $gray;
                text-decoration: underline;
                transition: color .2s ease-in-out;
                &:hover {
                    color: darken($gray, 10%)
                }
            }

            &-action {
                background-color: $red;
                border-radius: $bdrds;
                padding: 10px 35px;
                font-size: 1rem;
                font-family: $ff;
                font-weight: $ff-strong;
                color: $white;
                text-transform: uppercase;
                letter-spacing: .1rem;
                transition: background-color .2s ease-in-out;
                margin-top: 5%;
                &:hover {
                    background-color: darken($red, 10%);
                }
            }
        }
    }

    .user_forms-signup, .user_forms-login {
        position: absolute;
        top: 40px;
        left: 40px;
        width: calc(100% - 80px);
        opacity: 0;
        visibility: hidden;
        transition: opacity .4s ease-in-out, visibility .4s ease-in-out, transform .5s ease-in-out;
    }

    .user_forms-login {
        top: 70px;
        h2 {
            margin-bottom: 50px;
        }
    }

    .user_forms-signup {
        transform: translate3d(120px, 0, 0);
    }

    .forms_buttons {
        justify-content: flex-end;
    }

    .user_forms-login {
        transform: translate3d(0, 0, 0);
        opacity: 1;
        visibility: visible;
    }

    .user_options-forms {
        &.SignUp {
            animation: bounceLeft 1s forwards;
            .user_forms-signup {
                animation: showSignUp 1s forwards;
            }
            .user_forms-login {
                opacity: 0;
                visibility: hidden;
                transform: translate3d(-120px, 0, 0);
            }
        }
        &.SignIn {
            animation: bounceRight 1s forwards;
        }
    }
    

    @media screen and (max-width: 990px) {
        .user_options-forms {
            min-height: 350px;
            .forms_buttons {
                flex-direction: column;
            }
            .user_forms-login, .forms_buttons-action {
                margin-top: 30px;
            }
            .user_forms-signup, .user_forms-login {
                top: 40px;
            }
        }
            
        .user_options-registered, .user_options-unregistered {
            padding: 50px 45px;
        }
    }

</style>