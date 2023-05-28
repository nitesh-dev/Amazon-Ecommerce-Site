<script setup lang='ts'>
import { HomeData } from '../pages/api/apiDataType';

const props = defineProps<{
    slideshowData: HomeData | undefined

}>()

let intervalId: NodeJS.Timeout | null = null

var sliderContainer: HTMLDivElement | null = null
var sliderChildren: NodeListOf<HTMLDivElement> | null = null

const currentSlide = ref(0)

onMounted(function () {
    intervalId = setTimeout(nextSlide, 4000);
})

onUnmounted(function(){
    if(intervalId != null) clearTimeout(intervalId)
    intervalId = null
})






function showSlide() {
    sliderContainer = document.querySelector("#slider-container")
    if (sliderContainer == null || sliderChildren == null) return
    const slideWidth = sliderContainer.offsetWidth;
    const scrollX = slideWidth * currentSlide.value;
    sliderContainer.scrollLeft = scrollX;
    
}

function nextSlide() {
    if(intervalId != null) clearTimeout(intervalId)
    intervalId = setTimeout(nextSlide, 4000)

    sliderChildren = document.querySelectorAll("#slider-container .image-holder")

    if (sliderChildren == null) return
    currentSlide.value = (currentSlide.value + 1) % sliderChildren.length;
    showSlide()
}

function previousSlide() {
    if(intervalId != null) clearTimeout(intervalId)
    intervalId = setTimeout(nextSlide, 4000)

    sliderChildren = document.querySelectorAll("#slider-container .image-holder")

    if (sliderChildren == null) return
    currentSlide.value = (currentSlide.value - 1 + sliderChildren.length) % sliderChildren.length;
    showSlide()
}


function openProduct(id: number){
    location.href = `/product?productId=${id}`
}





</script>
<template>
    <div class="slideshow">
        <div class="image-container-holder">
            <button class="left" @click="previousSlide">
                <img src="/images/arrow.svg" alt="">
            </button>
            <div id="slider-container" class="image-container">

                <div v-for="product, index in slideshowData?.products" :key="index"  @click="openProduct(product.productId)" class="image-holder">
                    <img :src="product.slideImageUrl" :alt="product.name">
                </div>

            </div>
            <button class="right" @click="nextSlide">
                <img src="/images/arrow.svg" alt="">
            </button>
        </div>


        <div class="marker-container">

            <div v-for="_, index in slideshowData?.products.length" :key="index"
                :class="{ 'active': currentSlide == index }">
            </div>
        </div>
    </div>
</template>
<style scoped>
.slideshow {
    margin-top: 50px;
    overflow-x: hidden;
    margin-bottom: 2rem;
}

.slideshow .image-container-holder {
    position: relative;
}

.slideshow .image-container-holder>button {
    position: absolute;
    top: 50%;
    translate: 0 -50%;
    border: none;
    outline: none;
    border-radius: 0;
    height: 60px;
    background-color: rgb(255, 255, 255);
}

.slideshow .image-container-holder>button.left img {
    transform: rotate(180deg);
}

.slideshow .image-container-holder>button.right {
    right: 0;
}


.slideshow .image-container {
    display: flex;
    flex-direction: row;
    overflow-x: hidden;
}

.slideshow .image-holder {
    width: 100%;
    flex: 0 0 auto;
}

.image-holder img {
    width: 100%;
    height: 300px;
    object-fit: cover;

    border-radius: 8px;
}


.marker-container {
    margin-top: 16px;
    display: flex;
    gap: 4px;
    justify-content: center;
}

.marker-container div {
    width: 20px;
    height: 4px;
    background-color: var(--color-surface-dark);
}

.marker-container .active {
    width: 30px;
    background-color: var(--color-primary);
}

@media only screen and (max-width: 800px) {
    .slideshow {
        margin: 2rem 1rem;
    }
}
</style>