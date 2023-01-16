import Api from '@/services/api'
import secret from '../../secret.js'

export default {

    get_admin_notifications() {
        return Api(`${secret.LARAVEL_APP_URL}`).get(`pending`);
    },

    reserve_list() {
        return Api(`${secret.LARAVEL_APP_URL}`).get('reserve');
    },

    update_reserve(id_reserve, status) {
        return Api(`${secret.LARAVEL_APP_URL}`).put(`reserve/${id_reserve}`, { confirmed: status });
    },

    delete_reserve(id_reserve) {
        return Api(`${secret.LARAVEL_APP_URL}`).delete(`reserve/${id_reserve}`);
    },

}