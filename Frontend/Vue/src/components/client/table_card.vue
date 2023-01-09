<template>
    <div class="table_card" @click="reserve_table(table.id)">
        <img :src="table.image" alt=""/>
        <div class="desc_table">
            <h1>{{ table.table_name }}</h1>
            <p class="capacity" v-if="table.capacity >= 8">
                <strong>Capacity: </strong>{{ table.capacity }} or more.
            </p>
            <p class="capacity" v-else>
                Capacity: {{ table.capacity }}.
            </p>
            <p class="categories" v-for="category in table.categories" :key="category.id">
                Category: {{ category.category_name }}
            </p>
        </div>
    </div>
</template>

<script>
    import { useRouter } from 'vue-router';

    export default {
        props: {
            table: Object
        },
        setup() {
            const router = useRouter();
            const reserve_table = (id) => {
                // console.log(id);
                router.push({ name: "details", params: { id } });
            }
            return { reserve_table }
        }
    }
</script>

<style lang="scss">

    .table_card {
        display: block;
        width: 25%;
        min-height: 300px;
        border: 3px solid #142b3b;
        border-radius: 15px;
        img {
            width: 100%;
            border-radius: 15px 15px 0px 0px;
        }
        .desc_table {
            padding: 20px;
            h1 {
                text-align: center;
                font-size: 35px;
            }
        }
    }

</style>