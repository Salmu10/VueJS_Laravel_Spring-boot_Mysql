import Api from '@/services/api'
import secret from '../../secret.js'

export default {

    Login(data) {
        return Api(`${secret.LARAVEL_APP_URL}`).post('login', data);
    },

    Register(data) {
        return Api(`${secret.LARAVEL_APP_URL}`).post('register', data);
    },

    Logout() {
        return Api(`${secret.LARAVEL_APP_URL}`).post('logout');
    }

}