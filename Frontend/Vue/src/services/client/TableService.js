import Api from '@/services/api'
import secret from '../../secret.js'

export default {
    // getAllTables() {
    //     return Api(`${secret.SPRING_APP_URL}`).get(`tables/`)
    // },

    get_tables(params) {
        let params_filter = [];
        Object.entries(params).forEach(item => {
            if (item[0] === 'categories' && item[1].length > 0) {
                const categories = item[1].map(item => `categories=${item}`).join('&');
                params_filter.push(categories);
            } else if (item[1] != null) {
                params_filter.push(`${item[0]}=${item[1]}`);
            }
        });
        return Api(`${secret.SPRING_APP_URL}`).get(`tables?${params_filter.join('&')}`);
    }
}