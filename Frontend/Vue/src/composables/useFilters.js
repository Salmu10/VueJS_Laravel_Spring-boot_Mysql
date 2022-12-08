import { ref } from 'vue';
import TableService from '../services/client/TableService';

export const useFilters = (filters = {}) => {
    const tables = ref([])

    TableService.get_tables(filters)
        .then(function (res) {
            tables.value = res.data;
        })
        .catch(function (error) {
            console.log(error)
        })  

    return tables;
};