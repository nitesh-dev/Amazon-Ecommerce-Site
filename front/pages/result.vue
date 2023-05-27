<script setup lang='ts'>
</script>
<template>
    <Header></Header>
    <section class="container result-container">
        <a href="#" v-for="item in 10">
            <div class="result-card">
                <div class="image-holder">
                    <img src="https://m.media-amazon.com/images/I/814ePfNubRL._AC_UY218_.jpg">
                </div>
                <div class="detail">
                    <h3>boAt Xtend/Xtend RTL Smartwatch with Alexa Built-in, 1.69” HD Display, Multiple Watch Faces, Stress
                        Monitor, Heart & SpO2 Monitoring, 14 Sports Modes, 5 ATM & 7 Days Battery(Sandy Cream)
                    </h3>
                    <div class="rating">
                        <img src="../public/icons/full_star.svg">
                        <img src="../public/icons/full_star.svg">
                        <img src="../public/icons/full_star.svg">
                        <img src="../public/icons/half_star.svg">
                        <img src="../public/icons/empty_star.svg">
                        <span>(10,009)</span>
                    </div>
                    <div class="pricing">
                        <span>₹10,999</span>
                        <span>₹15,999</span>

                    </div>
                </div>
            </div>
        </a>
    </section>
    <Footer></Footer>
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
    grid-template-columns: 1.5fr 4fr;
}

.result-card .image-holder {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-surface);
}

.result-card .image-holder img {
    width: auto;
    height: 200px;
    margin: 2rem 0;
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
        width: 60%;
        margin: 2rem 1rem;
        height: auto;
    }

    .result-card {

        grid-template-columns: 2fr 4fr;
    }

    .pricing span:first-child {
        font-size: var(--big-font);
        color: var(--color-primary);
        font-weight: 600;
        margin-right: 16px;
    }
}
</style>