<template>
    <div class="category_card">
        <div class="name">
            <h1>{{ category.category_name }}</h1>
            <p class="image">
                image: {{ category.image }}
            </p>
        </div>
        <div class="buttons_box">
            <button @click="updateCategory(category.id)">Update</button>
            <button @click="deleteCategory(category.id)">Delete</button>
        </div>
    </div>
</template>

<script>
    import { useStore } from 'vuex';
    import { useRouter } from 'vue-router';
    import Constant from '../../Constant.js';

    export default {
        props: {
            category: Object
        },
        setup(props) {

            const store = useStore();
            const router = useRouter();

            function updateCategory(id) {
                store.dispatch("categoryAdmin/" + Constant.INITIALIZE_CATEGORY, { category: { ...props.category } });
                router.push({ name: 'category_update', params: { id } })
            }
            function deleteCategory(id) {
                // console.log(id);
                store.dispatch("categoryAdmin/" + Constant.DELETE_CATEGORY, { id });
            }

            return { store, updateCategory, deleteCategory };
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
        h1 {
            text-align: center;
            font-size: 35px;
        }
        .buttons_box {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            button {
                display: block;
                margin-top: 2%;
                margin-right: 10px;
                width: 100px;
                padding: 5px;
                text-transform: uppercase;
                font-weight: bold;
                font-size: 15px;
                border: 2px solid #333;
                border-radius: 10px; 
                background-color: #EAF2E3;
                color: #333;
                &:hover{
                    background-color: #66D7D1;
                }
            }
        }
    }

</style>