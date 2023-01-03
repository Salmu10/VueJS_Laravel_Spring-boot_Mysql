import store from "@/store";
import UserService from "../client/UserService";
import Constant from "../../Constant";

export default {

    AuthGuard(to, from, next) {
        // if (localStorage.getItem('isAuth')) {
        //     // store.dispatch(`user/${Constant.PROFILE}`);
        //     console.log('hola usuario');
        // }
        if (store.getters['user/GetIsAuth'] && localStorage.getItem('isAuth')) {
            next();
        } else {
            next('/home');
        }
    },

    authGuardAdmin(to, from, next) {
        if (store.getters['user/GetIsAdmin']) {
            next();
        } else {
            next('/login');
        }
    },

    noAuth(to, from, next) {
        if (!store.getters['user/GetIsAuth'] && !localStorage.getItem('isAuth')) {
            next();
        } else {
            next('/home');
        }
    },

};
