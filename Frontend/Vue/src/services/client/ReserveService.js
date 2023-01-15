import Api from '@/services/api'
import secret from '../../secret.js'

export default {

    make_reserve(data) {
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
    },

    reserve_list_user() {
        return Api(`${secret.SPRING_APP_URL}`).get('reserve/reserve_list');
    },

    pending_reserves_user() {
        return Api(`${secret.SPRING_APP_URL}`).get('reserve/pending_reserve_list');
    },

    delete_reserve_fromUser(id_reserve) {
        console.log(id_reserve);
        return Api(`${secret.SPRING_APP_URL}`).delete(`reserve/delete_reserve/${id_reserve}`);
    }

}