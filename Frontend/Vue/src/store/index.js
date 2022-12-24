import Vuex from "vuex";

import { tableAdmin } from './modules/admin/tableAdmin'
import { table } from './modules/client/table'
import { categoryAdmin } from './modules/admin/categoryAdmin'
import { category } from './modules/client/category'
import { user } from './modules/client/user'

export default Vuex.createStore({

    modules: {
        tableAdmin: tableAdmin,
        table: table,
        categoryAdmin: categoryAdmin,
        category: category,
        user: user,
    }

});