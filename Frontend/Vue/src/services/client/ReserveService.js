import Api from '@/services/api'
import secret from '../../secret.js'

export default {

    make_reserve(data) {
        // console.log(data);
        return Api(`${secret.SPRING_APP_URL}`).post(`reserve/${data.table_id}`, data);
    },

    get_disabled_date(id) {
        return Api(`${secret.SPRING_APP_URL}`).get(`reserve/disabled_date/${id}`);
    },

    get_type_of_date(data) {
        let params = [];
        Object.entries(data).forEach(item => {
            params.push(`${item[0]}=${item[1]}`);
        });
        return Api(`${secret.SPRING_APP_URL}`).get(`reserve/available_type?${params.join('&')}`);
    }

}