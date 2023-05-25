<script setup lang='ts'>
</script>
<template>
    <section id="footer">
        <div class="container section">
            <div class="grid">
                <div class="left">
                    <h2>Shopcart</h2>
                    <p>Discover endless possibilities at our premier eCommerce shopping website. From fashion to electronics, home decor to gifts, we have it all. Enjoy secure transactions, reliable shipping, and exceptional customer support. Embrace the joy of online shopping and explore a world of convenience and style today.</p>
                </div>
                <div class="right">
                    <ul>
                        <li class="heading">Categories</li>
                        <li><NuxtLink to="/terms" class="link">Shoes</NuxtLink></li>
                        <li><NuxtLink to="/privacy" class="link">Phones</NuxtLink></li>
                        <li><NuxtLink to="/rules" class="link">Watches</NuxtLink></li>
                    </ul>

                    <ul>
                        <li class="heading">More</li>
                        <li><NuxtLink to="/blogs" class="link">About</NuxtLink></li>
                        <li><NuxtLink to="/docs" class="link">Privacy</NuxtLink></li>
                    </ul>

                    <ul>
                        <li class="heading">Follow me</li>
                        <li><NuxtLink to="/discord" class="link">Discord</NuxtLink></li>
                        <li><NuxtLink to="/twitter" class="link">Twitter</NuxtLink></li>
                        <li><NuxtLink to="/instagram" class="link">Instagram</NuxtLink></li>
                    </ul>
                </div>
            </div>
        </div>
        <hr>
        <div class="container copyright">
            <p>Copyright © 2023. All Rights Reserved</p>
        </div>
    </section>
</template>
<style scoped>


#footer hr{
    border: none;
    border-top: 1px solid rgba(255, 255, 255, 0.171);
}
#footer .grid {
    display: grid;
    grid-template-columns: 4fr 5fr;
    gap: 40px;
}

#footer .section{
    padding-top: 60px;
    padding-bottom: 40px;
}

#footer {
    overflow: auto;
    margin-top: 50px;
    background-color: var(--color-primary);
    min-height: 300px;
    color: var(--color-on-primary);
}

#footer h2 {
    font-size: var(--big2-font);
    font-weight: 600;
    margin-top: 0;
}

#footer .left p {
    margin-top: 12px;
    font-size: var(--medium-font);
}

#footer .right{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
}



#footer ul {
    padding: 0;
    list-style-type: none;
}

#footer li {
    color: inherit;
    padding: 0 8px;
    margin-bottom: 6px;
}

#footer li.heading{
    color: inherit;
    font-size: var(--medium-2-font);
    font-weight: 600;
    margin-bottom: 12px;
}


#footer li a {
    opacity: 0.8;
    color: inherit;
    text-decoration: none;
    font-size: var(--medium-font);
    margin-bottom: 8px;
}

#footer li a:hover{
    font-weight: 600;
}

#footer .copyright{
    font-size: var(--small-font);
    color: inherit;
    text-align: center;
    margin: 24px auto;
}




@media only screen and (max-width: 800px) {
   #footer .grid{
    grid-template-columns: 100%;
  }

  #footer .left{
    text-align: center;
  }
  #footer .right{
    margin-top: 40px;
    text-align: center;
  }
}


@media only screen and (max-width: 400px) {
  #footer .right{
    grid-template-columns: 100%;
  }
}
</style>