<template>
    <div class="table_card">
        <div class="name">
            <h1>{{ table.table_name }}</h1>
            <p class="capacity">
                Capacity: {{ table.capacity }}
            </p>
            <p class="categories" v-for="category in table.categories" :key="category.id">
                Category: {{ category.category_name }}
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            table: Object
        },
        setup() {
        }
    }
</script>

<style lang="scss">

    .table_card {
        display: block;
        width: 25%;
        min-height: 300px;
        // margin: auto;
        border: 2px solid #333;
        border-radius: 15px;
        padding: 20px;
        // margin-bottom: 2%;
        h1 {
            text-align: center;
            font-size: 35px;
        }
    }

</style>