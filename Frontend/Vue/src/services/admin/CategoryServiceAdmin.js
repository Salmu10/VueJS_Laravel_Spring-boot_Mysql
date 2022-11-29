import Api from '@/services/api'
import secret from '../../secret.js'

export default {
    getAllCategories() {
        return Api(`${secret.LARAVEL_APP_URL}`).get(`categories/`)
    }
}