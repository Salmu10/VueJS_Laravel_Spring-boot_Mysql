import Constant from '../../../Constant';
import TableServiceAdmin from "../../../services/admin/TableServiceAdmin"

export const tableAdmin = {
    namespaced: true,
    state: {},
    mutations: {
        [Constant.INITIALIZE_TABLE]: (state, payload) => {
            if (payload) {
                state.table = payload;
            }
        }
    },
    actions: {
        [Constant.INITIALIZE_TABLE]: (store) => {
            TableServiceAdmin.getAllTables()
            .then(function (res) {
                store.commit(Constant.INITIALIZE_TABLE, res.data.data);
            })
            .catch(function (error) {
                console.log(error)
            })  
        }
    },
    getters: {
        getTables(state) {
            return state.table;
        },
        getOneTable(state) {
            return state.OneTable;
        },
    }
}