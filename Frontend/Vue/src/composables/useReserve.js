import { ref } from 'vue';
import ReserveService from '../services/client/ReserveService';
import ReserveServiceAdmin from '../services/admin/ReserveServiceAdmin';
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({ "position": "top-right", "duration": 4000 });

export const useReserve = (data) => {
    const reserve = ref([]);

    ReserveService.make_reserve(data)
        .then(res => { 
            if (res.status == 200) {
                toaster.success('Reserve done. An admin will confirm it soon.');
            }
        })
        .catch(error => toaster.error('Something went wrong with the reserve.'))
    return reserve;
};

export const useDisabled_dates = (id) => {
    const days = ref([]);
    ReserveService.get_disabled_date(id)
        .then(res => {
            days.value = res.data;
        })
        .catch(error => console.error(error))
    return days;
};

export const useAvailable_type = (data) => {
    const type = ref("");
    ReserveService.get_type_of_date(data)
        .then(res => {
            type.value = res.data;
        })
        .catch(error => console.error(error))
    return type;
};

export const useAdmin_notifications = () => {
    const notifications = ref(0);
    ReserveServiceAdmin.get_admin_notifications()
        .then(res => {
            notifications.value = res.data;
        })
        .catch(error => console.error(error))
    return notifications;
};

export const useReserve_list = () => {
    const reserve_list = ref([])
    ReserveService.reserve_list_user()
        .then(res => {
            console.log(res);
            reserve_list.value = res.data;
        })
        .catch(error => console.error(error))
    return reserve_list;
};

export const usePending_reserves = () => {
    const pending_reserves = ref([])
    ReserveService.pending_reserves_user()
        .then(res => {
            console.log(res);
            pending_reserves.value = res.data;
        })
        .catch(error => console.error(error))
    return pending_reserves;
};

export const useDelete_reserve = (id_reserve) => {
    ReserveService.delete_reserve_fromUser(id_reserve)
        .then(res => {
            console.log(res);
            if (res.status == 200) { 
                toaster.success('Reserve deleted successfully.');
            }
        })
        .catch(error => toaster.error('Something went wrong deleting the reserve.'))
};