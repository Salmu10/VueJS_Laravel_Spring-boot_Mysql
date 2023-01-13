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