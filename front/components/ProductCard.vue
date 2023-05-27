<script setup lang='ts'>
</script>
<template>
    <div class="category-card">
        <div class="top">
            <img src="https://m.media-amazon.com/images/I/41NFpBMSe4L._AC_SY200_.jpg">
        </div>
        <div class="bottom">
            <h3>OnePlus Nord CE 2 Lite 5G (Blue Tide, 6GB RAM, 128GB Storage)</h3>
            <div class="rating">
                <div>
                    <img src="../public/icons/full_star.svg">
                    <img src="../public/icons/full_star.svg">
                    <img src="../public/icons/full_star.svg">
                    <img src="../public/icons/half_star.svg">
                    <img src="../public/icons/empty_star.svg">
                </div>
                <span>(10,009)</span>
            </div>
            <div class="pricing">
                <span>₹10,999</span>
                <span>₹15,999</span>
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
    height: auto;
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
    width: 20px;
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

}


</style>