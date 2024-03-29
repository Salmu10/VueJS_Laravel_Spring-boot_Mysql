import Constant from '../../../Constant';
import router from '../../../router/index.js';
import UserService from "../../../services/client/UserService";
import UserServiceAdmin from "../../../services/admin/UserServiceAdmin";
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({ "position": "top-right", "duration": 4000 });

export const user = {
    namespaced: true,
    state: {
        user: [],
        isAuth: false,
        isAdmin: false
    },
    mutations: {
        [Constant.REGISTER]: (state, payload) => {
            if (payload) {
                toaster.success('Registered successfuly. Login for now.');
                router.push({ name: 'login' });
            }
        },
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
        [Constant.LOGOUT]: (state) => {
            state.user = {};
            state.isAuth = false;
            state.isAdmin = false;
            localStorage.removeItem('token');
            localStorage.removeItem('isAuth');
            localStorage.removeItem('tokenAdmin');
            localStorage.removeItem('isAdmin');
            toaster.success('Loged out successfuly');
            router.push({ name: 'home' });
        },
        [Constant.LOGIN_ADMIN]: (state, payload) => {
            if (payload) {
                localStorage.setItem("tokenAdmin", payload.token);
                localStorage.setItem("isAdmin", true);
                state.user = payload.user;
                state.isAdmin = true;
                toaster.success('Admin loged successfuly');
                router.push({ name: 'home' });
            }
        },
        [Constant.PROFILE]: (state, payload) => {
            if (payload) {
                state.user = payload;
                state.isAuth = true;
                state.isAdmin = payload.type === 'admin';
                localStorage.setItem("isAuth", true);
                localStorage.setItem("isAdmin", payload.type === 'admin');
            }
        },
    },
    actions: {
        [Constant.REGISTER]: (store, payload) => {
            UserService.Register(payload)
            .then(function (res) {
                if (res.status === 200) {
                    store.commit(Constant.REGISTER, true);
                }
            })
            .catch(function () {
                toaster.error('The username or email already exists');
            })
        },
        [Constant.LOGIN]: (store, payload) => {
            UserService.Login(payload)
            .then(function (res) {
                if (res.status === 200) {
                    store.commit(Constant.LOGIN, res.data);
                    if (res.data.user.type == "admin") {
                        UserServiceAdmin.Login_admin(payload)
                        .then(function (response) {
                            if (response.status === 200) {
                                store.commit(Constant.LOGIN_ADMIN, response.data);
                            }
                        })
                        .catch(function () {
                            toaster.error('Admin login error.');
                        })
                    }
                }
            })
            .catch(function (error) {
                // console.log(error)
                toaster.error('Username or password are incorrect.');
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
        [Constant.PROFILE]: (store) => {
            try {
                UserService.Profile()
                .then(function (res) {
                    if (res.status === 200) {
                        store.commit(Constant.PROFILE, res.data);
                    }
                })
                .catch(function (error) {
                    console.log(error)
                })
            } catch (error) {
                console.error(error);
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