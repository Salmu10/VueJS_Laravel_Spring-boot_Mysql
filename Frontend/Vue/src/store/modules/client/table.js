import Constant from '../../../Constant';
import TableService from "../../../services/client/TableService"

export const table = {
    namespaced: true,
    state: {
        tables: [],
        oneTable: {},
    },
    mutations: {
        [Constant.INITIALIZE_TABLE]: (state, payload) => {
            if (payload) {
                state.tables = payload;
            }
        },
        [Constant.INITIALIZE_ONE_TABLE]: (state, payload) => {
            if (payload) {
                state.oneTable = payload;
            }
        },
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
        },
        [Constant.INITIALIZE_ONE_TABLE]: (store, payload) => {
            TableService.get_one_table(payload)
            .then(function (res) {
                if (res.status === 200) {
                    store.commit(Constant.INITIALIZE_ONE_TABLE, res.data);
                }
            })
            .catch(function (error) {
                console.log(error)
            })
        },
    },
    getters: {
        GetTables(state) {
            return state.tables;
        },
        GetOneTable(state) {
            return state.oneTable;
        },
    }
}