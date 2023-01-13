import Api from '@/services/api'
import secret from '../../secret.js'

export default {

    Login_admin(data) {
        return Api(`${secret.LARAVEL_APP_URL}`).post('login', data);
    },
    Logout_admin() {
        return Api(`${secret.LARAVEL_APP_URL}`).post('logout');
    },
    getAllUsers() {
        return Api(`${secret.LARAVEL_APP_URL}`).get('user');
    },
    GetOneUser(id) {
        return Api(`${secret.LARAVEL_APP_URL}`).get(`user/${id}`);
    },
    CreateUser(data) {
        return Api(`${secret.LARAVEL_APP_URL}`).post('user', data);
    },
    UpdateUser(data) {
        return Api(`${secret.LARAVEL_APP_URL}`).put(`user/${data.id}`, data);
    },
    DeleteUser(data) {
        return Api(`${secret.LARAVEL_APP_URL}`).delete(`user/${data.id}`);
    },

}