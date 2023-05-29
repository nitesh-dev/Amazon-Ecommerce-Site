<script setup lang='ts'>

import Api from './api/api'
import { CategoryData, HomeData, SimpleCategoryData } from './api/apiDataType';

const isLoaded = ref(false)

const slideShowData = ref<HomeData>()

const categoryData = ref<HomeData[]>([])



onMounted(function () {
    loadData()
})

async function loadData() {
    isLoaded.value = false
    const res = await Api.getHomeData()
    if (res.isError) {
        alert(res.error)
    } else {
        if (res.result == null) {
            alert("Something went wrong")
        } else {
            categoryData.value?.splice(0)
            res.result.forEach(data => {
                if (data.category.isSlide) {
                    slideShowData.value = data
                } else {
                    categoryData.value?.push(data)
                }
            });
            isLoaded.value = true
        }
    }
}


function getPopularCount(categoryData: HomeData[]) {
    if (categoryData == undefined) return 1

    let max = 8
    if (categoryData.length >= max) {
        return max
    } else {
        return categoryData.length
    }
}

function updateCategoryClick(categoryId: number){
    Api.updateCategoryClick(categoryId)
}


</script>
<template>
    <div class="loader-holder" v-if="!isLoaded">
        <div class="loader"></div>
    </div>

    <Header v-if="isLoaded"></Header>

    <!-- Slideshow -->
    <section class="container">
        <Slideshow :slideshowData="slideShowData" />
    </section>


    <section class="light">
        <div class="container category">
            <div>
                <h1 class="responsive-margin">Popular Categories</h1>
                <hr>
                <div class="category-div responsive-margin">
                    <a target="_blank" @click="updateCategoryClick(categoryData[index - 1]?.category.categoryId)" :href="`/category?categoryId=${categoryData[index - 1]?.category.categoryId}`"
                        v-for="index in getPopularCount(categoryData)">
                        <div>
                            <div class="image-container">
                                <img :src="categoryData[index - 1]?.category.imageUrl"
                                    :alt="categoryData[index - 1]?.category.name">
                            </div>
                            <div>
                                <p>{{ categoryData[index - 1]?.category.name }}</p>
                                <p>{{ categoryData[index - 1]?.category.count }} items</p>
                            </div>
                        </div>
                    </a>

                </div>
            </div>
        </div>
    </section>

    <section class="light" v-for="category, index in categoryData">
        <div class="container products">
            <h2 class="responsive-margin">{{ category.category.name }}</h2>
            <div class="card-container responsive-margin">
                <a target="_blank" v-for="item in category.products" :href="`/product?productId=${item.productId}`">
                    <ProductCard :name="item.name" :imageUrl="item.imageUrl" :rating="item.rating"
                        :reviewCount="item.reviewCount" :disPrice="item.discountPrice" :price="item.price" />
                </a>


                <a target="_blank" @click="updateCategoryClick(category.category.categoryId)" :href="`/category?categoryId=${category.category.categoryId}`" v-if="category.category.count > 7">
                    <div class="show-more">
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M13.267 4.209a.75.75 0 0 0-1.034 1.086l6.251 5.955H3.75a.75.75 0 0 0 0 1.5h14.734l-6.251 5.954a.75.75 0 0 0 1.034 1.087l7.42-7.067a.996.996 0 0 0 .3-.58.758.758 0 0 0-.001-.29.995.995 0 0 0-.3-.578l-7.419-7.067Z" />
                        </svg>
                        <span>View All</span>
                    </div>
                </a>
            </div>
        </div>
    </section>



    <section class="container profile">
        <h2>About Owner</h2>
        <div class="profile-container">
            <div>
                <img src="../public/images/kishan_image.jpg">
                <h3>Kishan kr</h3>
            </div>
            <p>Meet Kishan, a skilled affiliate marketer with a passion for digital entrepreneurship. With an unwavering commitment to success, Kishan has established himself as a prominent figure in the world of online marketing. Armed with his strategic mindset and deep understanding of consumer behavior, he consistently crafts compelling campaigns that drive impressive conversions. Kishan's innovative approach to affiliate marketing sets him apart, as he effortlessly combines his creativity with data-driven insights to optimize results. Through his unwavering dedication and relentless pursuit of excellence, Kishan has built a reputation as a trusted and influential affiliate marketer, helping both brands and fellow marketers achieve their goals in the dynamic digital landscape. His impressive track record and genuine enthusiasm for the industry make Kishan an invaluable asset to any affiliate marketing endeavor.</p>
        </div>
    </section>

    <Footer v-if="isLoaded"></Footer>
</template>
<style scoped>
.profile {
    margin-top: 4rem;
    color: var(--color-on-secondary);
}

.profile h2 {
    text-align: center;
}

.profile p {
    font-size: var(--medium-font);
}


.profile-container {
    padding: 1.5rem;
    margin: 2rem auto;
    max-width: 800px;
    width: 100%;
    background-color: var(--color-surface-variant);
    border-radius: var(--radius-medium);
}

.profile-container div {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.profile-container img {
    width: 60px;
    height: auto;
    border-radius: 50%;
}

.profile-container h3 {
    font-weight: 600;
}

.card-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
}

.show-more {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--color-surface);
    border-radius: var(--radius-medium);
    border: 1px solid var(--color-surface-dark);
    font-size: var(--medium-font);
    color: var(--color-primary);
    height: 100%;
}

.show-more svg {
    fill: var(--color-primary);
}


.products {
    padding: 2rem 0;
}



.responsive-margin {
    margin-left: 1rem;
    margin-right: 1rem;
}

a {
    color: var(--color-on-secondary);
    text-decoration: none;
}









.light {
    margin-top: 1rem;
    background-color: var(--color-surface-variant);
    overflow: auto;
}

.category {
    padding: 1rem 0;
}

.category hr {
    border: none;
    border-top: 2px solid var(--color-surface);
    margin: 2rem 0;
}


.category-div {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
}

.category-div a {
    text-decoration: none;
}

.category-div .image-container {
    display: flex;
    align-items: center;
}

.category-div div div p:first-child {
    color: var(--color-on-secondary);
    font-weight: 600;
    font-size: var(--medium-font);
}

.category-div img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: var(--radius-medium);

}

.category-div>a>div {
    display: flex;
    align-items: center;
    gap: 16px;
    background-color: var(--color-surface);
    border: 1px solid var(--color-surface-dark);
    padding: 8px;
    border-radius: var(--radius-medium);
}

.category-div p {
    margin: 0;
    font-size: var(--small-font);
}

/* End of the CSS  */









@media only screen and (max-width: 1000px) {
    .card-container {
        grid-template-columns: 1fr 1fr 1fr;
    }
}

@media only screen and (max-width: 800px) {
    .category-div {
        grid-template-columns: 1fr 1fr;
    }

    .slideshow {
        margin: 2rem 1rem;
    }

    .card-container {
        grid-template-columns: 1fr 1fr;
    }
}

@media only screen and (max-width: 600px) {
    .category-div {
        grid-template-columns: 1fr;
    }

    .card-container {
        gap: 0.5rem;
    }
}
</style>