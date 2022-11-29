import Constant from '../../../Constant';
import CategoryServiceAdmin from '../../../services/admin/CategoryServiceAdmin';

export const categoryAdmin = {
    namespaced: true,
    state: {},
    mutations: {
        [Constant.INITIALIZE_CATEGORY]: (state, payload) => {
            if (payload) {
                state.categories = payload;
            }
        }
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
                    const response = await CategoryServiceAdmin.GetCategory(payload);
                    store.commit(Constant.INITIALIZE_ONE_CATEGORY, response.data.data);
                } else {
                    store.commit(Constant.INITIALIZE_ONE_CATEGORY, store.state.categories[index]);
                }
            } catch (error) {
                console.error(error);
            }
        }
    },
    getters: {
        GetCategories(state) {
            return state.categories;
        }
    }
}