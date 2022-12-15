import { ref } from 'vue';
import TableService from '../services/client/TableService';

export const useFilters = (filters = {}) => {

    filters.limit = 3;
    const tables = ref([]);

    TableService.get_tables(filters)
        .then(function (res) {
            // console.log(res.data);
            tables.value = res.data;
        })
        .catch(function (error) {
            console.log(error)
        })  

    return tables;
};