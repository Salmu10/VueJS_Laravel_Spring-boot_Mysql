import Api from '@/services/api'
import secret from '../../secret.js'

export default {

    get_admin_notifications() {
        return Api(`${secret.LARAVEL_APP_URL}`).get(`pending`);
    },

}