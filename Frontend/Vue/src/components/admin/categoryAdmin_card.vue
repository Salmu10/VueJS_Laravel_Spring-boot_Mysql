<template>
    <!-- <div class="category_card">
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
    </div> -->

    <tr>
        <td class="id_col">{{ category.id }}</td>
        <td>{{ category.category_name }}</td>
        <td>{{ category.image }}</td>
        <td> 
            <button class="buttons" @click="updateCategory(category.id)">Edit</button>
            <button class="buttons" @click="deleteCategory(category.id)">Delete</button>
        </td>
    </tr>
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
                store.dispatch("categoryAdmin/" + Constant.DELETE_CATEGORY, { id });
            }

            return { store, updateCategory, deleteCategory };
        }
    }
</script>

<style lang="scss">

    .id_col {
        font-weight: bold;
    }

    .buttons {
        display: inline-block;
        margin-right: 20px;
        margin-left: 20px;
        width: 90px;
        padding: 5px;
        text-transform: uppercase;
        font-weight: bold;
        font-size: 14px;
        border: 2px solid #333;
        border-radius: 10px; 
        background-color: #66D7D1;
        color: #333;
        &:hover{
            background-color: #4ba7a2;
        }
    }

</style>