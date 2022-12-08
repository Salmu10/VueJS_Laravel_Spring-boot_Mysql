<template>
    <div class="category_card" @click="emitAction()">
        <div class="name">
            <h1>{{ category.category_name }}</h1>
            <p class="image">
                image: {{ category.image }}
            </p>
        </div>
    </div>
</template>

<script>
import { getCurrentInstance } from 'vue';
    export default {
        props: {
            category: Object
        },
        emits: {
            emitAction: Object
        },
        setup(props) {
            const { emit } = getCurrentInstance();
            const emitAction = () => {
                emit('emitAction', props.category);
            }
            return { emitAction }
        }
    }
</script>

<style lang="scss">

    .category_card {
        display: block;
        width: 50%;
        margin: auto;
        margin-top: 3%;
        border: 2px solid #333;
        border-radius: 15px;
        padding: 20px;
        cursor: pointer;
        h1 {
            text-align: center;
            font-size: 35px;
        }
    }

</style>