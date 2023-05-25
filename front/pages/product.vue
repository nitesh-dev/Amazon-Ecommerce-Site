<script setup lang='ts'>

</script>
<template>
    <div class="container">
        <section class="product-container">
            <div class="image-container">
                <div class="image-holder">
                    <img src="/images/image_1.jpg">
                </div>

                <div class="thumbnail-container">
                    <div>
                        <img src="/images/image_1.jpg">
                        <img src="/images/image_1.jpg">
                        <img src="/images/image_1.jpg">
                        <img src="/images/image_1.jpg">
                        <img src="/images/image_1.jpg">
                        <img src="/images/image_1.jpg">
                    </div>
                </div>

            </div>
            <div class="detail-container">
                <h3>Samsung Galaxy M14 5G (Berry Blue,6GB,128GB Storage)</h3>

                <div class="rating">
                    <img src="/icons/full_star.svg">
                    <img src="/icons/full_star.svg">
                    <img src="/icons/full_star.svg">
                    <img src="/icons/half_star.svg">
                    <img src="/icons/empty_star.svg">
                    <span>(120)</span>
                </div>

                <hr>
                <div class="pricing">
                    <span>₹10,999</span>
                    <span>₹12,999</span>

                </div>
                <button>Buy from Amazon</button>
                <hr>
                <table>
                    <tbody>
                        <tr>
                            <td>Color</td>
                            <td>Army Green</td>
                        </tr>
                        <tr>
                            <td>Brand</td>
                            <td>Sony</td>
                        </tr>
                        <tr>
                            <td>Product Care</td>
                            <td>Do Not Machine Wash, Do Not Use Dryer, Hand Wash OnlyProduct</td>
                        </tr>
                        <tr>
                            <td>Dimensions</td>
                            <td>180L x 61W x 0.6Th Centimeters</td>
                        </tr>

                    </tbody>

                </table>
            </div>

        </section>
        <section class="about-container">
            <h2>About this item</h2>
            <ul>
                <li>Eco-friendly material: Excellent-quality, eco-friendly, 100% non-toxic material that will prevent sweat and dirt from absorbing into the mat</li>
                <li>Ergonomic design: Functional design with 6mm thick for a perfect yoga asana or workout drill</li>
                <li>Anti-slip technology: The anti-slip technology ensures perfect grip & stability</li>
                <li>Easy to clean: the moisture-resistant technology and good quality make the mat to be easily washed with soap and water</li>
                <li>Carry Bag : The durable and lightweight carry bag comes with a stretch closure for easy and safe travels.</li>
            </ul>
        </section>

        <section class="more-detail">
            <h2>Technical details</h2>
            <table>
                <tbody>
                    <tr>
                        <td>OS</td>
                        <td>Android</td>
                    </tr>
                    <tr>
                        <td>Product Dimensions</td>
                        <td>16.6 x 7.6 x 0.8 cm; 190 Grams</td>
                    </tr>
                    <tr>
                        <td>OS</td>
                        <td>Android</td>
                    </tr>
                    <tr>
                        <td>OS</td>
                        <td>Android</td>
                    </tr>
                    <tr>
                        <td>OS</td>
                        <td>Android</td>
                    </tr>
                    <tr>
                        <td>OS</td>
                        <td>Android</td>
                    </tr>
                </tbody>
            </table>
        </section>

        <section class="images-list">
            <h2>From the Manufacturer</h2>
            <img src="/images/image_1.jpg">
            <img src="/images/image_2.jpg">
            <img src="/images/image_3.jpg">
        </section>
    </div>
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
}

.product-container .thumbnail-container img {
    width: 80px;
    height: 80px;
}


.product-container .detail-container {
    padding: 16px;
    color: var(--color-on-secondary);
}

.product-container h3 {
    font-weight: 600;
    font-size: var(--big-font);
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

.product-container button {
    border: none;
    outline: none;
    padding: 0.6rem 1rem;
    font-size: var(--medium-font);
    background-color: var(--color-primary);
    color: var(--color-on-primary);
    margin-bottom: 0.5rem;
    margin-top: 1.5rem;
    border-radius: var(--radius-medium);

}

.product-container button:hover {
    background-color: var(--color-primary-variant);
}

.product-container table {
    width: 100%;
    font-size: inherit;
}

.product-container table td{
    line-height: 1.5;
}
.product-container table td:first-child{
    font-weight: 600;
    width: 200px;
    overflow: auto;
}


.about-container{
    margin-top: 8px;
    background-color: var(--color-surface-variant);
    padding: 24px;
}

.about-container * {
    color: var(--color-on-secondary);
}

.about-container h2{
    font-weight: 600;
    font-size: var(--big-font);
}

.about-container ul{
    padding-left: 24px;
}

.about-container li{
    margin-bottom: 16px;
    line-height: 1.5;
    font-size: var(--medium-font);
}


.more-detail{
    background-color: var(--color-surface-variant);
    padding: 24px;
    margin-top: 8px;
}

.more-detail * {
    color: var(--color-on-secondary);
}

.more-detail h2{
    font-size: var(--big-font);
    font-weight: 600;

}

.more-detail table{
    width: 100%;
    border-collapse: collapse;
}


.more-detail tr:nth-child(odd){
    background-color: var(--color-surface);
}


.more-detail td{
    padding: 0.7rem;
    line-height: 1.5;
    font-size: var(--medium-font);
    
}

.more-detail td:first-child{
    font-weight: 600;
}


.images-list{
    background-color: var(--color-surface-variant);
    padding: 24px;
    margin-top: 8px;
}

.images-list h2{
    color: var(--color-on-secondary);
    font-size: var(--big-font);
    font-weight: 600;
}

.images-list img{
    width: 100%;
    height: auto;
    border-radius: var(--radius-medium);
    margin-bottom: 0.5rem;
}


</style>