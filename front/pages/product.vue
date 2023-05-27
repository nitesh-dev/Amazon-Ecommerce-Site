<script setup lang='ts'>
import Api from './api/api';
import { ProductData, SimpleScrapData } from './api/apiDataType';
import { stringToNumber, unixMillisecondsToDateString } from './api/utils';

const productData = ref<ProductData>()
const productMoreDetail = ref<SimpleScrapData>()


const isLoaded = ref(false)
onMounted(function () {
    // temp
    loadData()
})


function urlToFeaturesUrl(url: string) {
    //.__CR0,0,1464,600_PT0_SX1464_V1___.
    const lastIndex = url.lastIndexOf('.')
    const left = url.slice(0, lastIndex)
    const right = url.slice(lastIndex + 1, url.length)
    const modifiedUrl = left + ".__CR0,0,1464,600_PT0_SX1464_V1___." + right
    console.log(modifiedUrl)
    return modifiedUrl
}

function urlToThumbnailUrl(url: string) {
    //._SS100_.
    const lastIndex = url.lastIndexOf('.')
    const left = url.slice(0, lastIndex)
    const right = url.slice(lastIndex + 1, url.length)
    const modifiedUrl = left + "._SS100_." + right
    console.log(modifiedUrl)
    return modifiedUrl
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


async function loadData() {
    isLoaded.value = false
    const res = await Api.getProduct(getProductId())
    if (res.isError) {
        alert(res.error)
    } else {
        if (res.result == null) {
            alert("Something went wrong")
        } else {
            productData.value = res.result
            productMoreDetail.value = JSON.parse(res.result.allDetail) as SimpleScrapData
            isLoaded.value = true
        }
    }
}

function getProductId() {

    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const id = `${url.searchParams.get("productId")}`
    return stringToNumber(id)
}


const openedLandingImage = ref(0)
function showLandingImage(index: number) {
    openedLandingImage.value = index
}


function getStarImage(max: number) {
    const rating = productData.value?.rating

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
    <Header v-if="isLoaded" />

    <div class="loader-holder" v-if="!isLoaded">
        <div class="loader"></div>
    </div>
    <div v-if="isLoaded" class="container">
        <section class="product-container">
            <div class="image-container">
                <div class="image-holder">

                    <template v-for="url, index in productMoreDetail?.landingImages" :key="index">
                        <img :src="urlToLandingUrl(url)" v-if="openedLandingImage == index">
                    </template>
                </div>

                <div class="thumbnail-container">
                    <div>
                        <img :src="urlToThumbnailUrl(url)" v-for="url, index in productMoreDetail?.landingImages"
                            :key="index" @click="showLandingImage(index)" :class="{ active: openedLandingImage == index }">
                    </div>
                </div>

            </div>
            <div class="detail-container">
                <h3>{{ productData?.name }}</h3>

                <div class="rating">
                    <img :src="getStarImage(10)">
                    <img :src="getStarImage(20)">
                    <img :src="getStarImage(30)">
                    <img :src="getStarImage(40)">
                    <img :src="getStarImage(50)">

                    <span>({{ productData?.reviewCount.toLocaleString() }})</span>
                </div>

                <hr>
                <div class="pricing">
                    <span>₹{{ productData?.discountPrice.toLocaleString() }}</span>
                    <span>₹{{ productData?.price.toLocaleString() }}</span>

                </div>
                <a :href="productData?.affiliateUrl">Buy from Amazon</a>

                <hr>
                <table>
                    <tbody>
                        <tr v-for="info in productMoreDetail?.smallInfo">
                            <td>{{ info.heading }}</td>
                            <td>{{ info.content }}</td>
                        </tr>

                    </tbody>

                </table>
            </div>

        </section>
        <section v-if="productMoreDetail?.aboutItem.length != 0" class="about-container">
            <h2>About this item</h2>
            <ul>
                <li v-for="info in productMoreDetail?.aboutItem">{{ info }}</li>

            </ul>
        </section>

        <section v-if="productMoreDetail?.technicalDetails.length != 0" class="more-detail">
            <h2>Technical details</h2>
            <table>
                <tbody>
                    <tr v-for="detail in productMoreDetail?.technicalDetails">
                        <td>{{ detail.heading }}</td>
                        <td>{{ detail.content }}</td>
                    </tr>
                </tbody>
            </table>
        </section>

        <section v-if="productMoreDetail?.featureImages.length != 0" class="images-list">
            <h2>From the Manufacturer</h2>
            <img v-for="url in productMoreDetail?.featureImages" :src="urlToFeaturesUrl(url)">
        </section>
    </div>

    <Footer v-if="isLoaded" />
</template>
<style scoped>
.product-container {
    background-color: var(--color-surface-variant);
    display: grid;
    grid-template-columns: 50% 50%;
    margin-top: 50px;
}

.product-container * {
    color: var(--color-on-secondary);
}

.product-container .image-container {
    padding: 16px;
}


.product-container .image-holder {
    aspect-ratio: 1/1;
}

.product-container .image-container img {

    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: var(--radius-medium);

}

.product-container .thumbnail-container {
    overflow-x: hidden;
}

.product-container .thumbnail-container div {
    margin-top: 4px;
    display: flex;
    flex-direction: row;
    gap: 8px;
    overflow-x: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.product-container .thumbnail-container div::-webkit-scrollbar {
    display: none;
}


.product-container .thumbnail-container img {
    border: 1px solid var(--color-surface-dark);
    padding: 4px;
    width: 80px;
    height: 80px;
    scale: 0.8;
}

.product-container .thumbnail-container img.active {
    scale: 1 !important;
}


.product-container .detail-container {
    padding: 16px;
    color: var(--color-on-secondary);
}

.product-container h3 {
    font-weight: 600;
    font-size: var(--medium2-font);
    margin: 0.8rem 0;
}

.product-container .rating {
    display: flex;
    align-items: center;
}

.product-container .rating img {
    width: 20px;
    height: auto;
}

.product-container .rating span {
    font-size: var(--medium-font);
    margin-left: 8px;
    color: inherit;
}

.product-container hr {
    border: none;
    border-top: 1px solid var(--color-surface-dark);
    margin: 1rem 0;
}

.product-container .pricing {
    display: flex;
    align-items: center;
}

.product-container .pricing span:first-child {
    font-size: var(--big-font);
    color: var(--color-primary);
    font-weight: 600;
    margin-right: 16px;
}

.product-container .pricing span:last-child {
    font-size: var(--medium-font);
    color: inherit;
    text-decoration: line-through;
}

.product-container a {
    display: inline-block;
    border: none;
    outline: none;
    text-decoration: none;
    padding: 0.6rem 1rem;
    font-size: var(--medium-font);
    background-color: var(--color-primary);
    color: var(--color-on-primary);
    margin-bottom: 0.5rem;
    margin-top: 1.5rem;
    border-radius: var(--radius-medium);

}

.product-container a:hover {
    background-color: var(--color-primary-variant);
}

.product-container table {
    width: 100%;
    font-size: inherit;
}

.product-container table tr {
    margin: 0.5em 0;
    display: block;
}

.product-container table td {
    line-height: 1.5;
    font-size: var(--medium-font);
}

.product-container table td:first-child {
    font-weight: 600;
    width: 200px;
    overflow: auto;
}


.about-container {
    margin-top: 8px;
    background-color: var(--color-surface-variant);
    padding: 24px;
}

.about-container * {
    color: var(--color-on-secondary);
}

.about-container h2 {
    font-weight: 600;
    font-size: var(--big-font);
}

.about-container ul {
    padding-left: 24px;
}

.about-container li {
    margin-bottom: 16px;
    line-height: 1.5;
    font-size: var(--medium-font);
}


.more-detail {
    background-color: var(--color-surface-variant);
    padding: 24px;
    margin-top: 8px;
}

.more-detail * {
    color: var(--color-on-secondary);
}

.more-detail h2 {
    font-size: var(--big-font);
    font-weight: 600;

}

.more-detail table {
    width: 100%;
    border-collapse: collapse;
}


.more-detail tr:nth-child(odd) {
    background-color: var(--color-surface);
}


.more-detail td {
    padding: 0.7rem;
    line-height: 1.5;
    font-size: var(--medium-font);

}

.more-detail td:first-child {
    font-weight: 600;
}


.images-list {
    background-color: var(--color-surface-variant);
    padding: 24px;
    margin-top: 8px;
}

.images-list h2 {
    color: var(--color-on-secondary);
    font-size: var(--big-font);
    font-weight: 600;
}

.images-list img {
    width: 100%;
    height: auto;
    margin: 0;
    display: block;

}

@media only screen and (max-width: 800px) {
    .product-container {
        grid-template-columns: 100%;
    }

    .product-container .image-container .image-holder {
        max-width: 500px;
        margin: auto;
    }

    .product-container .thumbnail-container>div {
        justify-content: center;
    }

    .product-container h3 {
        font-size: var(--medium-font);
    }
}
</style>