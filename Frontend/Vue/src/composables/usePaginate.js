import { ref } from 'vue';
import TableService from '../services/client/TableService';

export const usePaginate = (filters = {}) => {

    const total_pages = ref(0);

    TableService.get_tables_count(filters)
        .then(function (res) {
            const limit = filters.limit ?? 3;
            const total_tables = res.data;
            console.log(total_tables);
            const pages = Math.ceil(total_tables / limit);
            total_pages.value = pages;
        })
        .catch(function (error) {
            console.log(error)
        })  

    return total_pages;
};