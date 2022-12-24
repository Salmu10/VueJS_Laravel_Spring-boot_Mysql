import Constant from '../../../Constant';
import router from '../../../router/index.js';
import UserService from "../../../services/client/UserService";
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({ "position": "top-right", "duration": 2000 });

export const user = {
    namespaced: true,
    state: {
        user: [],
        isAuth: false,
        isAdmin: false
    },
    mutations: {
        [Constant.LOGIN]: (state, payload) => {
            if (payload) {
                state.user = payload.user;
                state.isAuth = true;
                localStorage.setItem("token", payload.token);
                localStorage.setItem("isAuth", true);
                toaster.success('Loged successfuly');
                router.push({ name: 'home' });
            }
        },
        [Constant.REGISTER]: (state, payload) => {
            if (payload) {
                console.log(payload);
                console.log('Register successfuly');
                toaster.success('Register successfuly');
                router.push({ name: 'login' });
            }
        },
        [Constant.LOGOUT]: (state) => {
            state.user = {};
            state.isAuth = false;
            state.isAdmin = false;
            localStorage.removeItem('token');
            localStorage.removeItem('isAuth');
            // localStorage.removeItem('token_admin');
            // localStorage.removeItem('isAdmin');
            toaster.success('Loged out successfuly');
            router.push({ name: 'home' });
        },
    },
    actions: {
        [Constant.LOGIN]: (store, payload) => {
            UserService.Login(payload)
            .then(function (res) {
                if (res.status === 200) {
                    store.commit(Constant.LOGIN, res.data);
                }
            })
            .catch(function (error) {
                console.log(error)
            })
        },
        [Constant.REGISTER]: (store, payload) => {
            UserService.Register(payload)
            .then(function (res) {
                if (res.status === 200) {
                    store.commit(Constant.REGISTER, res.data);
                }
            })
            .catch(function (error) {
                console.log(error)
            })
        },
        [Constant.LOGOUT]: (store) => {
            try {
                UserService.Logout();
                store.commit(Constant.LOGOUT);
            } catch (error) {
                console.log(error);
            }
        },
    },
    getters: {
        GetUser: (state) => {
            return state.user;
        },
        GetIsAuth: (state) => {
            return state.isAuth;
        },
        GetIsAdmin: (state) => {
            return state.isAdmin;
        },
    }
}