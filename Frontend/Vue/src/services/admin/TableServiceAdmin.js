import Api from '@/services/api'
import secret from '../../secret.js'

export default {
    getAllTables() {
        return Api(`${secret.LARAVEL_APP_URL}`).get(`table/`)
    },
    getOneTable(id) {
        return Api(`${secret.LARAVEL_APP_URL}`).get('table/' + id);
    }
}