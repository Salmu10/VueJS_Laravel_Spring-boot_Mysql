import Api from '@/services/api'
import secret from '../../secret.js'

export default {
    getAllCategories() {
        return Api(`${secret.SPRING_APP_URL}`).get(`categories/`)
    }
}