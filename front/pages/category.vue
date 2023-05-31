<script setup lang='ts'>
import Api from './api/api'
import { SimpleProductData } from './api/apiDataType';
import { stringToNumber } from './api/utils';
import { useRouter } from 'vue-router';
const router = useRouter();
const isLoaded = ref(false)

const allProducts = ref<SimpleProductData[]>([])

onMounted(function () {
    setTitle('Category')
    loadData()
})

function setTitle(title: string){
    document.title = title
}

async function loadData() {
    const categoryId = getCategoryId()
    isLoaded.value = false
    const res = await Api.getCategoryAllProducts(categoryId)
    if (res.isError || res.result == null) {
        router.push('/error')
    } else {
        allProducts.value = res.result
        isLoaded.value = true
    }
}

function urlToLandingUrl(url: string) {
    //._SX522_.
    const lastIndex = url.lastIndexOf('.')
    const left = url.slice(0, lastIndex)
    const right = url.slice(lastIndex + 1, url.length)
    const modifiedUrl = left + "._SX522_." + right
    console.log(modifiedUrl)
    return modifiedUrl
}



function getCategoryId() {
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const id = `${url.searchParams.get("categoryId")}`
    return stringToNumber(id)
}



function getStarImage(max: number, rating: number) {
    if (rating == undefined) return "/icons/empty_star.svg"

    if (rating < max && rating > (max - 10)) {
        return '/icons/half_star.svg';
    } else if (rating >= max) {
        return '/icons/full_star.svg';
    } else {
        return '/icons/empty_star.svg';
    }
}

</script>
<template>
    <div class="loader-holder" v-if="!isLoaded">
        <div class="loader"></div>
    </div>

    <Header v-if="isLoaded"></Header>
    <section v-if="isLoaded" class="container result-container">
        <NuxtLink :to="`/product?productId=${product.productId}`" v-for="product in allProducts">
            <div class="result-card">
                <div class="image-holder">
                    <img :src="urlToLandingUrl(product.imageUrl)" :alt="product.name">
                </div>
                <div class="detail">
                    <h3>{{ product.name }}</h3>
                    <div class="rating">
                        <img v-for="index in 5" :src="getStarImage(index * 10, product.rating)">
                        <span>({{ product.reviewCount.toLocaleString() }})</span>
                    </div>
                    <div class="pricing">
                        <span>₹{{ product.discountPrice.toLocaleString() }}</span>
                        <span>₹{{ product.price.toLocaleString() }}</span>

                    </div>
                </div>
            </div>
        </NuxtLink>
    </section>
    <Footer v-if="isLoaded"></Footer>
</template>
<style scoped>
a {
    margin-bottom: 0.6rem;
    display: block;
    text-decoration: none;
    color: var(--color-on-secondary);
}

.result-container {
    margin-top: 3rem;
}

.result-card {
    border: 1px solid var(--color-surface-dark);
    background-color: var(--color-surface-variant);
    border-radius: var(--radius-medium);
    display: grid;
    grid-template-columns: 25% 75%;
}

.result-card .image-holder {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-surface);
}

.result-card .image-holder img {
    width: 80%;
    height: auto;
    object-fit: fill;
    mix-blend-mode: multiply;
}

.result-card .detail {
    padding: 1rem;
}

.result-card h3 {
    font-size: var(--medium-font);
    margin: 0;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
}


.rating {
    margin-top: 1rem;
    display: flex;
    align-items: center;
}

.rating img {
    width: 20px;
    height: auto;
}

.rating span {
    font-size: var(--medium-font);
    margin-left: 8px;
    color: inherit;
}


.pricing {
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
}

.pricing span:first-child {
    font-size: var(--big2-font);
    color: var(--color-primary);
    font-weight: 600;
    margin-right: 16px;
}

.pricing span:last-child {
    font-size: var(--medium-font);
    color: inherit;
    text-decoration: line-through;
}



@media only screen and (max-width: 800px) {
    .result-card h3 {
        -webkit-line-clamp: 3;
        line-clamp: 3;
    }

    a {
        margin-left: 0.4rem;
        margin-right: 0.4rem;
    }

    .result-card .image-holder img {
        width: 80%;
        height: auto;
    }

    .result-card {
        grid-template-columns: 33.3% 66.6%;
    }

    .pricing span:first-child {
        font-size: var(--big-font);
        color: var(--color-primary);
        font-weight: 600;
        margin-right: 16px;
    }
}
</style>