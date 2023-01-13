import Constant from '../../../Constant';
import UserServiceAdmin from '../../../services/admin/UserServiceAdmin';
import { createToaster } from "@meforma/vue-toaster";
import router from '../../../router/index.js'

const toaster = createToaster({ "position": "top-right", "duration": 2300 });

export const userAdmin = {
    namespaced: true,
    state: {
        users: [],
        user: []
    },
    mutations: {
        [Constant.INITIALIZE_USER]: (state, payload) => {
            if (payload) {
                state.users = payload;
            }
        },
        [Constant.INITIALIZE_ONE_USER]: (state, payload) => {
            if (payload) {
                state.user = payload;
            }
        },
        [Constant.ADD_USER]: (state, payload) => {
            if (payload) {
                console.log(payload);
                // let data = { ...payload };
                // data['is_active'] = Number(data['is_active']);
                // state.users.push(data);
            }
        },
        [Constant.UPDATE_USER]: (state, payload) => {
            const index = (state.users ?? []).findIndex(item => item.id == payload.id);
            if (index !== -1) {
                state.users[index] = payload.user;
                toaster.success('User updated successfully');
            }
        },
        [Constant.DELETE_USER]: (state, payload) => {
            if (payload) {
                state.users = state.users.filter(item => item.id !== payload);
            }
        },
    },
    actions: {
        [Constant.INITIALIZE_USER]: (store) => {
            UserServiceAdmin.getAllUsers()
            .then(function (res) {
                if (res.status === 200) {
                    store.commit(Constant.INITIALIZE_USER, res.data.data);
                }
            })
            .catch(function (error) {
                console.log(error)
            })   
        },
        [Constant.INITIALIZE_ONE_USER]: (store, payload) => {
            try {
                const data = store.state.users ?? [];
                const index = data.findIndex(item => item.id == payload);
                if (index === -1) {
                    UserServiceAdmin.GetOneUser(payload)
                    .then(function (res) {
                        store.commit(Constant.INITIALIZE_ONE_USER, res.data.data);
                    })
                    .catch(function (error) {
                        console.log(error)
                    }) 
                } else {
                    store.commit(Constant.INITIALIZE_ONE_USER, store.state.users[index]);
                }
            } catch (error) {
                console.error(error);
            }
        },
        [Constant.ADD_USER]: (store, payload) => {
            UserServiceAdmin.CreateUser(payload)
            .then(function (res) {
                if (res.status === 201) {
                    store.commit(Constant.ADD_USER, res.data.data);
                }
            })
            .catch(function (error) {
                console.log(error)
            })
        },
        [Constant.UPDATE_USER]: (store, payload) => {
            UserServiceAdmin.UpdateUser(payload.user)
            .then(function (res) {
                console.log(res);
                if (res.status === 200) {
                    store.commit(Constant.UPDATE_USER, res.data.data);
                }
            })
            .catch(function (error) {
                toaster.error('Username or email taken');
            })
        },
        [Constant.DELETE_USER]: (store, payload) => {
            UserServiceAdmin.DeleteUser(payload)
            .then(function (res) {
                if (res.status === 200) {
                    store.commit(Constant.DELETE_USER, payload);
                }
            })
            .catch(function (error) {
                console.log(error)
            })
        },
    },
    getters: {
        GetUsers(state) {
            return state.users;
        },
        GetUser(state) {
            return state.user;
        },
    }
}