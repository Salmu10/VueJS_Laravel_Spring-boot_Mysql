import Api from '@/services/api'
import secret from '../../secret.js'

export default {
    getAllCategories() {
        return Api(`${secret.LARAVEL_APP_URL}`).get(`category/`)
    },
    getOneCategory(id) {
        return Api(`${secret.LARAVEL_APP_URL}`).get(`category/${id}`)
    },
    CreateCategory(data) {
        return Api(`${secret.LARAVEL_APP_URL}`).post('category', data);
    },
    UpdateCategory(data) {
        return Api(`${secret.LARAVEL_APP_URL}`).put(`category/${data.id}`, data);
    },
    DeleteCategory(data) {
        return Api(`${secret.LARAVEL_APP_URL}`).delete(`category/${data.id}`);
    },
}