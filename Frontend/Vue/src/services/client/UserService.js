import Api from '@/services/api'
import secret from '../../secret.js'

export default {

    Register(data) {
        console.log(data);
        return Api(`${secret.SPRING_APP_URL}`).post('register', data);
    },

    Login(data) {
        return Api(`${secret.SPRING_APP_URL}`).post('login', data);
    },

    Logout() {
        return Api(`${secret.SPRING_APP_URL}`).post('logout');
    },

    Login_admin(data) {
        return Api(`${secret.LARAVEL_APP_URL}`).post('login', data);
    },

}