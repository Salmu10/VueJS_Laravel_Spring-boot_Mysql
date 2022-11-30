<template>
    <div class="category_card">
        <div class="name">
            <h1>{{ category.category_name }}</h1>
            <p class="image">
                image: {{ category.image }}
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            category: Object
        },
        setup() {
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
    }

</style>