import Constant from '../../../Constant';
import TableService from "../../../services/client/TableService"

export const table = {
    namespaced: true,
    state: {
        tables: []
    },
    mutations: {
        [Constant.INITIALIZE_TABLE]: (state, payload) => {
            if (payload) {
                state.tables = payload;
            }
        }
    },
    actions: {
        [Constant.INITIALIZE_TABLE]: (store) => {
            TableService.get_tables()
            .then(function (res) {
                store.commit(Constant.INITIALIZE_TABLE, res.data);
            })
            .catch(function (error) {
                console.log(error)
            })
        }
    },
    getters: {
        GetTables(state) {
            return state.tables;
        }
    }
}