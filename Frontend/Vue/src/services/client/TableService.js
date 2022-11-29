import Api from '@/services/api'
import secret from '../../secret.js'

export default {
    getAllTables() {
        return Api(`${secret.SPRING_APP_URL}`).get(`tables/`)
    }
}