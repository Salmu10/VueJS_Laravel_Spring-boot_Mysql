import Constant from '../../../Constant';
import CategoryServiceAdmin from '../../../services/admin/CategoryServiceAdmin';

export const categoryAdmin = {
    namespaced: true,
    state: {
        categories: [],
        category: []
    },
    mutations: {
        [Constant.INITIALIZE_CATEGORY]: (state, payload) => {
            if (payload) {
                state.categories = payload;
            }
        },
        [Constant.INITIALIZE_ONE_CATEGORY]: (state, payload) => {
            if (payload) {
                state.category = payload;
            }
        },
        [Constant.ADD_CATEGORY]: (state, payload) => {
            if (payload) {
                state.categories.push(payload);
            }
        },
        [Constant.UPDATE_CATEGORY]: (state, payload) => {
            let index = state.categories.findIndex((item)=>item.id === payload.category.id);
            if (index !== -1) {
                state.categories[index] = payload.category;
            }
        },
        [Constant.DELETE_CATEGORY]: (state, payload) => {
            state.categories = state.categories.filter(item => item.id !== payload.id);
        },
    },
    actions: {
        [Constant.INITIALIZE_CATEGORY]: (store) => {
            CategoryServiceAdmin.getAllCategories()
            .then(function (res) {
                store.commit(Constant.INITIALIZE_CATEGORY, res.data.data);
            })
            .catch(function (error) {
                console.log(error)
            })    
        },
        [Constant.INITIALIZE_ONE_CATEGORY]: async (store, payload) => {
            try {
                const data = store.state.categories ?? [];
                const index = data.findIndex(item => item.id == payload);
                if (index === -1) {
                    const response = await CategoryServiceAdmin.getOneCategory(payload);
                    store.commit(Constant.INITIALIZE_ONE_CATEGORY, response.data.data);
                } else {
                    store.commit(Constant.INITIALIZE_ONE_CATEGORY, store.state.categories[index]);
                }
            } catch (error) {
                console.error(error);
            }
        },
        [Constant.ADD_CATEGORY]: (store, payload) => {
            CategoryServiceAdmin.CreateCategory(payload.category)
            .then(function (res) {
                store.commit(Constant.ADD_CATEGORY, res.data.data);
            })
            .catch(function (error) {
                console.log(error)
            })
        },
        [Constant.UPDATE_CATEGORY]: (store, payload) => {
            CategoryServiceAdmin.UpdateCategory(payload.category)
            .then(function (res) {
                if (res.status === 200) {
                    store.commit(Constant.UPDATE_CATEGORY, payload);
                }
            })
            .catch(function (error) {
                console.log(error)
            })
        },
        [Constant.DELETE_CATEGORY]: (store, payload) => {
            CategoryServiceAdmin.DeleteCategory(payload)
            .then(function (res) {
                if (res.status === 200) {
                    store.commit(Constant.DELETE_CATEGORY, payload);
                }
            })
            .catch(function (error) {
                console.log(error)
            })
        },
    },
    getters: {
        GetCategories(state) {
            return state.categories;
        },
        GetCategory(state) {
            return state.category;
        }
    }
}