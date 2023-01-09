<template>
    <div class="reserve_form">
        <h2>Make a reserve</h2>
        <div class="reserve_type">
            <label for='capacity' class="etiqueta">Reserve type:</label>
            <input type="radio" name="type" value="dinner"> Dinner
            <input type="radio" name="type" value="launch"> Launch
        </div>
        <div class="reserve_type">
            <label for='capacity' class="etiqueta">Capacity:</label>
            <select id="capacity">
                <option v-for="cap in state.capacity" value="cap">{{ cap }}</option>
            </select>
        </div>
        <button @click="send_reserve()">send reserve</button>
    </div>
</template>

<script>

    import { getCurrentInstance } from 'vue';
    import { reactive } from 'vue';

    export default {
        props: {
            table: Object
        },
        emits: {
            send_reserve: Object
        },
        setup(props) {
            const { emit } = getCurrentInstance();

            const event_table = false;

            const state = reactive({
                capacity: [],
            })
            
            if (props.table.capacity) {
                if (props.table.capacity != 8) {
                    state.capacity.push(props.table.capacity - 1);
                    state.capacity.push(props.table.capacity);
                } else {
                    event_table = true;
                }
                // console.log(state.capacity);
            }

            console.log(props.table.capacity);

            const send_reserve = () => {
                console.log(props.table);
                // emit('send_reserve');
            }

            return { state, send_reserve, event_table }
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