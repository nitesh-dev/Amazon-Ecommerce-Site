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


        <!-- Write from here -->
        <div>

            <p>Hello World</p>
        </div>
    </div>
</template>
<style scoped>
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