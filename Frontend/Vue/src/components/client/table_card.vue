<template>
    <div class="table_card">
        <div class="name">
            <h1>{{ table.table_name }}</h1>
            <p class="capacity">
                Capacity: {{ table.capacity }}
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
        width: 50%;
        margin: auto;
        border: 2px solid #333;
        border-radius: 15px;
        padding: 20px;
        h1 {
            text-align: center;
            font-size: 35px;
        }
    }

</style>