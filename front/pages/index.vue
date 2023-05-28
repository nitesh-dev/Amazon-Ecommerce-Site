<script setup lang='ts'>

function slideLeft() {

}

function slideRight() {

}

</script>
<template>
    <Header></Header>
    <section class="container">
        <div class="slideshow">
            <div class="image-container-holder">
                <button class="left"><img src="/images/arrow.svg" alt=""></button>
                <div class="image-container">
                    <div class="image-holder">
                        <img src="/images/image_1.jpg" alt="">
                    </div>
                    <div class="image-holder">
                        <img src="/images/image_3.jpg" alt="">
                    </div>
                    <div class="image-holder">
                        <img src="/images/image_3.jpg" alt="">
                    </div>
                    <div class="image-holder">
                        <img src="/images/image_3.jpg" alt="">
                    </div>
                    <div class="image-holder">
                        <img src="/images/image_3.jpg" alt="">
                    </div>
                </div>
                <button class="right"><img src="/images/arrow.svg" alt=""></button>
            </div>


            <div class="marker-container">
                <div></div>
                <div class="active"></div>
                <div></div>
            </div>
        </div>
    </section>



    <!-- This is my code -->
    <section class="light">
        <div class="container category">
            <div>
                <h1 class="responsive-margin">Popular Categories</h1>
                <hr>
                <div class="category-div responsive-margin">
                    <div v-for="item in 5">
                        <div class="image-container"><img src="../public/images/image_3.jpg" alt="ddf"></div>
                        <div>
                            <p>Item 1</p>
                            <p>120 items</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="light">
        <div class="container products">
            <h2 class="responsive-margin">Watches</h2>
            <div class="card-container responsive-margin">
                <ProductCard v-for="item in 7" />
                <div class="show-more">
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M13.267 4.209a.75.75 0 0 0-1.034 1.086l6.251 5.955H3.75a.75.75 0 0 0 0 1.5h14.734l-6.251 5.954a.75.75 0 0 0 1.034 1.087l7.42-7.067a.996.996 0 0 0 .3-.58.758.758 0 0 0-.001-.29.995.995 0 0 0-.3-.578l-7.419-7.067Z" />
                    </svg>
                    <span>View All</span>
                </div>
            </div>
        </div>
    </section>

    <section class="light">
        <div class="container products">
            <h2 class="responsive-margin">Watches</h2>
            <div class="card-container responsive-margin">
                <ProductCard v-for="item in 7" />
                <div class="show-more">
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M13.267 4.209a.75.75 0 0 0-1.034 1.086l6.251 5.955H3.75a.75.75 0 0 0 0 1.5h14.734l-6.251 5.954a.75.75 0 0 0 1.034 1.087l7.42-7.067a.996.996 0 0 0 .3-.58.758.758 0 0 0-.001-.29.995.995 0 0 0-.3-.578l-7.419-7.067Z" />
                    </svg>
                    <span>View All</span>
                </div>
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
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>
    </section>

    <Footer></Footer>
</template>
<style scoped>

.profile{
    margin-top: 4rem;
    color: var(--color-on-secondary);
}

.profile h2{
    text-align: center;
}

.profile p{
    font-size: var(--medium-font);
}


.profile-container{
    padding: 1.5rem;
    margin: 2rem auto;
    max-width: 600px;
    width: 100%;
    background-color: var(--color-surface-variant);
    border-radius: var(--radius-medium);
}

.profile-container div{
    display: flex;
    align-items: center;
    gap: 1rem;
}

.profile-container img{
    width: 60px;
    height: auto;
    border-radius: 50%;
}

.profile-container h3{
    font-weight: 600;
}
.card-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
}

.show-more{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--color-surface);
    border-radius: var(--radius-medium);
    border: 1px solid var(--color-surface-dark);
    font-size: var(--medium-font);
    color: var(--color-primary);
}

.show-more svg{
    fill: var(--color-primary);
}


.products {
    padding: 2rem 0;
}



.responsive-margin {
    margin-left: 1rem;
    margin-right: 1rem;
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

.category-div .image-container {
    display: flex;
    align-items: center;
}

.category-div div div p:first-child {
    color: var(--color-on-secondary);
    font-weight: 600;
    font-size: var(--medium2-font);
}

.category-div img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: var(--radius-medium);

}

.category-div>div {
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
}

/* End of the CSS  */





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
    gap: 24px;
}

.slideshow .image-holder {
    width: 100%;
    flex: 0 0 auto;
}

.image-holder img {
    width: 100%;
    height: auto;
    max-height: 400px;
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