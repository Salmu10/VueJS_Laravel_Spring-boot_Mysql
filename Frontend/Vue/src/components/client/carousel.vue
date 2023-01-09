<template>
    <Carousel class="carousel" :items-to-show="1" :wrap-around="true" :autoplay="5000" >
        <slide v-for="category in categories" :key="category.id">
            <div class="carousel_items" @click="emitAction(category)">
                <img :src="category.image" class="carousel_img" alt=""/>
                <p class="category_name">{{ category.category_name }}</p>
            </div>
        </slide>

        <template #addons>
            <navigation class="carousel_navigation"/>
            <pagination class="carousel_pagination"/>
        </template>
    </Carousel>
</template>
  
<script>

    import { Carousel, Slide, Navigation, Pagination } from "vue3-carousel";
    import "vue3-carousel/dist/carousel.css";
    import { getCurrentInstance } from 'vue';

    export default {
        components: { Carousel, Slide, Navigation, Pagination },
        props: {
            categories: Object
        },
        emits: {
            emitAction: Object
        },
        setup() {
            const { emit } = getCurrentInstance();

            const emitAction = (category) => {
                emit('emitAction', category);
            }

            return { emitAction }
        },
    };

</script>
  
<style lang="scss">

    .carousel {
        .carousel_items {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .carousel_img{
                display: block;
                width: 50%;
                border: 4px solid #142b3b;
                border-radius: 15px;
            }
            .category_name {
                display: block;
                padding-top: 10px;
                font-size: 20px;
                font-weight: bold;
                text-transform: uppercase;
            }
        }
        .carousel_navigation {
            padding: 0px 500px;
            color: #142b3b;
        }
        .carousel_pagination {
            padding: 0px;
            color: #142b3b;
        }
    }

</style>