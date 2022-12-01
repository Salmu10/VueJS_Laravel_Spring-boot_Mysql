import Api from '@/services/api'
import secret from '../../secret.js'

export default {
    getAllTables() {
        return Api(`${secret.LARAVEL_APP_URL}`).get(`table/`)
    },
    getOneTable(id) {
        return Api(`${secret.LARAVEL_APP_URL}`).get(`table/${id}`);
    },
    CreateTable(data) {
        return Api(`${secret.LARAVEL_APP_URL}`).post('table', data);
    },
    UpdateTable(data) {
        return Api(`${secret.LARAVEL_APP_URL}`).put(`table/${data.id}`, data);
    },
    DeleteTable(data) {
        return Api(`${secret.LARAVEL_APP_URL}`).delete(`table/${data.id}`);
    },
}