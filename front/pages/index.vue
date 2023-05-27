<script setup lang='ts'>

function slideLeft() {

}

function slideRight() {

}

</script>
<template>
    <div class="container">
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
        <!-- This is my code -->
        <section class="light">
            <div class="container category">
                <!-- Write from here -->
                <div>
                    <h1>Popular Categories</h1>
                    <hr>
                    <div class="category-div">
                        <div>
                            <div class="image-container"><img src="../public/images/image_3.jpg" alt="ddf"></div>
                            <div>
                                <p>Item 1</p>
                                <p>120 items</p>
                            </div>
                        </div>
                        <div>
                            <div><img src="../public/images/image_3.jpg" alt="ddf"></div>
                            <div>
                                <p>Item 1</p>
                                <p>120 items</p>
                            </div>
                        </div>
                        <div>
                            <div><img src="../public/images/image_3.jpg" alt="ddf"></div>
                            <div>
                                <p>Item 1</p>
                                <p>120 items</p>
                            </div>
                        </div>
                        <div>
                            <div><img src="../public/images/image_3.jpg" alt="ddf"></div>
                            <div>
                                <p>Item 1</p>
                                <p>120 items</p>
                            </div>
                        </div>


                        <p>Hello World</p>
                    </div>
                </div>
            </div>
        </section>
        <!-- Till Here -->





    </div>
</template>
<style scoped>


/*This is the CSS Code */


.light {
    background-color: var(--color-surface-variant);
    overflow: auto;
}

.category {
    padding: 4rem 0px;
}

.category hr{
    border: none;
    border-top: 2px solid var(--color-surface);
    margin: 3rem 0;
}


.category-div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
}

.category-div .image-container {
    display: flex;
    align-items: center;
}

.category-div div div p:first-child {
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
</style>