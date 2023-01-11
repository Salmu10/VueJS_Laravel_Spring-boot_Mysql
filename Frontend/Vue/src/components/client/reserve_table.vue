<template>
    <div class="reserve_form">
        <h2>Make a reserve</h2>
        <div class="reserve_date">
            <DatePicker v-model="state.date" :min-date='new Date()' :attributes="state.attributes" :disabled-dates="state.diss_days" @dayclick="reserve_day" is-dark>
                <template v-slot="{ inputValue, inputEvents }">
                    <label for='reserve_date' class="etiqueta" ref="fechaInput">Reserve day:</label>
                    <input class="bg-white border px-2 py-1 rounded" :value="inputValue" v-on="inputEvents" placeholder="Select the date"/>
                    <br>
                    <span class="text-danger"><em>{{ state.errors.error_date }}</em></span>
                </template>
            </DatePicker>
        </div>
        <div class="reserve_type">
            <label for='capacity' class="etiqueta">Reserve type:</label>
                <input type="radio" :disabled="state.disabled_type == 'dinner'" name="type" value="dinner" v-model="state.res_type"> Dinner
            <input type="radio" :disabled="state.disabled_type == 'launch'" name="type" value="launch" v-model="state.res_type"> Launch
            <br>
            <span class="text-danger"><em>{{ state.errors.error_type }}</em></span>
        </div>
        <div class="reserve_capacity">
            <label for='capacity' class="etiqueta">Capacity:</label>
            <select id="capacity" v-model="state.res_capacity">
                <option disabled selected value="">Select the capacity</option>
                <option v-for="cap in state.capacity" v-bind:value=cap>{{ cap }}</option>
            </select>
            <br>
            <span class="text-danger"><em>{{ state.errors.error_capacity }}</em></span>
        </div>
        <button @click="send_reserve()">send reserve</button>
    </div>
</template>

<script>
    import { reactive, computed } from 'vue';
    import { getCurrentInstance } from 'vue';
    import { useRoute } from 'vue-router';
    import { useStore } from 'vuex';
    import Constant from '../../Constant';
    import 'v-calendar/dist/style.css';
    import { useDisabled_dates, useAvailable_type } from '../../composables/useReserve';

    export default {
        emits: {
            send_reserve: Object
        },
        setup() {
            const { emit } = getCurrentInstance();
            const route = useRoute();
            const store = useStore();

            const id = route.params.id;            

            store.dispatch("table/" + Constant.INITIALIZE_ONE_TABLE, id);

            const state = reactive({
                table: computed(() => store.getters["table/GetOneTable"]),
                disabled_dates: useDisabled_dates(id),
                disabled_type: "",
                date: null,
                capacity: [],
                format_date: [],
                res_type: "",
                res_capacity: "",
                errors: { error_type: "", error_date: "", error_capacity: "" },
                attributes: [],
                busy_days: [],
                diss_days: [],
                type_disabled: "",
            })

            setTimeout(() => { 
                if (state.table.capacity) {
                    if (state.table.capacity != 8) {
                        state.capacity.push(state.table.capacity);
                        state.capacity.push(state.table.capacity - 1);
                    } else {
                        state.capacity.push(state.table.capacity);
                        state.capacity.push(state.table.capacity - 1);
                        state.capacity.push("More");
                    }
                }

                for (let i = 0; i < state.disabled_dates.length; i++) {
                    let num = state.disabled_dates[i].reserve_date.split('-');
                    num[1] = num[1] - 1;
                    state.disabled_dates[i].reserve_date = num.join(',');

                    let days = {};
                    days = {
                        start: new Date(num[0], num[1], num[2]),
                        end: new Date(num[0], num[1], num[2]),
                    };

                    state.diss_days.push(days);
                    state.busy_days.push(state.disabled_dates[i].reserve_date);
                }

                state.attributes = [
                    {
                        highlight: 'red',
                        dates: state.busy_days.map((item) => {
                            let day = item.split(',');
                            return new Date(day[0], day[1], day[2]);
                        })
                    }
                ];

            }, 200);

            const reserve_day = () => {
                
                if (state.date == null) {
                    state.errors.error_date = "*Invalid date. Please select the date of the reserve";
                    // state.dinner_check = 1;
                    // state.launch_check = 1;
                } else {
                    state.disabled_type = "";
                    state.errors.error_date = "";
                    state.format_date = [];
                    state.format_date.push(String(state.date.getFullYear()), String(state.date.getMonth() + 1), state.date.getDate());
                    let data_type = {
                        id_table: id,
                        reserve_date: state.format_date.join('-'),
                    }
                    state.disabled_type = useAvailable_type(data_type);
                }
            }

            const send_reserve = () => {

                let condition = true;

                if (state.format_date == "") {
                    condition = false;
                    state.errors.error_date = "*Must select the date of the reserve";
                } else {
                    state.errors.error_date = "";
                }

                if (state.res_type == "") {
                    state.errors.error_type = "*Must select the type of the reserve";
                    condition = false;
                } else {
                    state.errors.error_type = "";
                }

                if (state.res_capacity == "") {
                    condition = false;
                    state.errors.error_capacity = "*Must select the capacity of the table";
                } else {
                    state.errors.error_capacity = "";
                }

                let data = {
                    table_id: id,
                    reserve_date: state.format_date.join('-'),
                    reserve_type: state.res_type,
                    capacity: state.res_capacity
                }

                if (condition == true) {
                    // console.log(data);
                    emit('send_reserve', data);
                }
            }

            return { state, send_reserve, reserve_day }
        }

    }
</script>

<style lang="scss">

    .reserve_form {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        h2 {
            text-align: center;
            text-transform: uppercase;
            font-weight: bold;
        }
        input{
            margin-left: 10px;
        }
        .etiqueta {
            text-transform: uppercase;
            font-weight: 800;
            margin-right: 20px;
        }
    }

</style>