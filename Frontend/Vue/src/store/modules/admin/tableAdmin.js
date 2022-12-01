import Constant from '../../../Constant';
import TableServiceAdmin from "../../../services/admin/TableServiceAdmin"

export const tableAdmin = {
    namespaced: true,
    state: {
        tables: [],
        table: []
    },
    mutations: {
        [Constant.INITIALIZE_TABLE]: (state, payload) => {
            if (payload) {
                state.tables = payload;
            }
        },
        [Constant.INITIALIZE_ONE_TABLE]: (state, payload) => {
            if (payload) {
                state.table = payload;
            }
        },
        [Constant.ADD_TABLE]: (state, payload) => {
            if (payload) {
                state.tables.push(payload);
            }
        },
        [Constant.UPDATE_TABLE]: (state, payload) => {
            let index = state.tables.findIndex((item)=>item.id === payload.table.id);
            if (index !== -1) {
                state.tables[index] = payload.table;
            }
        },
        [Constant.DELETE_TABLE]: (state, payload) => {
            state.tables = state.tables.filter(item => item.id !== payload.id);
        },
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
        },
        [Constant.INITIALIZE_ONE_TABLE]: async (store, payload) => {
            try {
                const data = store.state.tables ?? [];
                const index = data.findIndex(item => item.id == payload);
                if (index === -1) {
                    const response = await TableServiceAdmin.getOneTable(payload);
                    store.commit(Constant.INITIALIZE_ONE_TABLE, response.data.data);
                } else {
                    store.commit(Constant.INITIALIZE_ONE_TABLE, store.state.tables[index]);
                }
            } catch (error) {
                console.error(error);
            }
        },
        [Constant.ADD_TABLE]: (store, payload) => {
            TableServiceAdmin.CreateTable(payload.table)
            .then(function (res) {
                console.log(res);
                console.log(res.data);
                if (res.status === 201) {
                    store.commit(Constant.ADD_TABLE, res.data.data);
                }
            })
            .catch(function (error) {
                console.log(error)
            })
        },
        [Constant.UPDATE_TABLE]: (store, payload) => {
            TableServiceAdmin.UpdateTable(payload.table)
            .then(function (res) {
                if (res.status === 200) {
                    store.commit(Constant.UPDATE_TABLE, payload);
                }
            })
            .catch(function (error) {
                console.log(error)
            })
        },
        [Constant.DELETE_TABLE]: (store, payload) => {
            TableServiceAdmin.DeleteTable(payload)
            .then(function (res) {
                if (res.status === 200) {
                    store.commit(Constant.DELETE_TABLE, payload);
                }
            })
            .catch(function (error) {
                console.log(error)
            })
        }
    },
    getters: {
        GetTables(state) {
            return state.tables;
        },
        GetTable(state) {
            return state.table;
        },
    }
}