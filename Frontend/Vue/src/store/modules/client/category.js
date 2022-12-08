import Constant from '../../../Constant';
import CategoryService from '../../../services/client/CategoryService';

export const category = {
    namespaced: true,
    state: {
        categories: [],
    },
    mutations: {
        [Constant.INITIALIZE_CATEGORY]: (state, payload) => {
            if (payload) {
                state.categories = payload;
            }
        }
    },
    actions: {
        [Constant.INITIALIZE_CATEGORY]: (store) => {
            CategoryService.getAllCategories()
            .then(function (res) {
                store.commit(Constant.INITIALIZE_CATEGORY, res.data);
            })
            .catch(function (error) {
                console.log(error)
            })    
        }    
    },
    getters: {
        GetCategories(state) {
            return state.categories;
        }
    }
}