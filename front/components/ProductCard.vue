<script setup lang='ts'>

const props = defineProps({
    name: String,
    imageUrl: String,
    rating: Number,
    reviewCount: Number,
    disPrice: Number,
    price: Number
})


function getStarImage(max: number) {
    const rating = props.rating

    if (rating == undefined) return "/icons/empty_star.svg"

    if (rating < max && rating > (max - 10)) {
        return '/icons/half_star.svg';
    } else if (rating >= max) {
        return '/icons/full_star.svg';
    } else {
        return '/icons/empty_star.svg';
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

</script>
<template>
    <div class="category-card">
        <div class="top">
            <img :src="urlToLandingUrl(imageUrl!!)">
        </div>
        <div class="bottom">
            <h3>{{ name }}</h3>
            <div class="rating">
                <div>
                    <img v-for="index in 5" :src="getStarImage(index * 10)">
                </div>
                <span>({{ reviewCount?.toLocaleString() }})</span>
            </div>
            <div class="pricing">
                <span>₹{{ disPrice?.toLocaleString() }}</span>
                <span>₹{{ price?.toLocaleString() }}</span>
            </div>
        </div>
    </div>
</template>
<style scoped>
.category-card {
    background-color: var(--color-surface);
    border-radius: var(--radius-medium);
    border: 1px solid var(--color-surface-dark);
}

.category-card .top {
    padding: 0.5rem;
    width: 100%;
    aspect-ratio: 1/1;
    display: flex;
    justify-content: center;
    align-items: center;
}

.category-card .bottom {
    padding: 0.8rem 0.5rem;
    overflow: auto;
    border-radius: 0 0 var(--radius-medium) var(--radius-medium);
    background-color: var(--color-surface-variant);
}

.category-card h3 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    margin: 0;
    font-size: var(--medium-font);
}

.category-card .top img {
    width: 70%;
    height: 70%;
    object-fit: contain;
    mix-blend-mode: multiply;
}


.rating {
    margin-top: 1rem;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.4rem;
    align-items: center;
}


.rating img {
    width: 1rem;
    height: auto;
}


.rating span {
    font-size: var(--medium-font);
    color: inherit;
}

.pricing {
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
}

.pricing span:first-child {
    font-size: var(--big-font);
    color: var(--color-primary);
    font-weight: 600;
    margin-right: 16px;
}

.pricing span:last-child {
    font-size: var(--medium-font);
    color: inherit;
    text-decoration: line-through;
}


@media only screen and (max-width: 600px) {

    .pricing span:first-child {
        font-size: var(--medium2-font);
        margin-right: 0.6rem;
    }

    .rating img {
        width: 0.8rem;
    }

    .rating span {
        font-size: var(--small-font);
        color: inherit;
    }

    .pricing span:last-child {
        font-size: var(--small-font);
    }

}
</style>