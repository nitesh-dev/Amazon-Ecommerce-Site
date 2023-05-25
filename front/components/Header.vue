<script setup lang='ts'>
</script>
<template>
    <div id="header">
        <div class="container">
            <NuxtLink class="home" to="/">
                <h2>ShopCart</h2>
            </NuxtLink>
            <div class="search">
                <input type="text" placeholder="Search products">
                <button>
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10 2.75a7.25 7.25 0 0 1 5.63 11.819l4.9 4.9a.75.75 0 0 1-.976 1.134l-.084-.073-4.901-4.9A7.25 7.25 0 1 1 10 2.75Zm0 1.5a5.75 5.75 0 1 0 0 11.5 5.75 5.75 0 0 0 0-11.5Z" />
                    </svg>
                </button>
            </div>

            <button class="account">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"  class="bi bi-person"
                    viewBox="0 0 16 16">
                    <path
                        d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                </svg>
            </button>
        </div>
    </div>
</template>
<style scoped>
#header {
    height: max-content;
    background-color: var(--color-surface-variant);
}

#header>div {
    display: flex;
    align-items: center;
    gap: 24px;
}

#header .search {
    position: relative;
    display: flex;
    align-items: center;
    height: 45px;
    max-width: 600px;
    flex-grow: 1;
    background-color: var(--color-surface);
    border-radius: var(--radius-medium);
    border: 1px solid var(--color-surface-dark);
    margin-left: auto;
}

#header .search input {
    outline: none;
    border: none;
    background-color: transparent;
    padding: 0 24px;
    font-size: var(--medium-font);
    width: 100%;
}

#header .search button {
    border: none;
    padding: 4px 12px;
    display: flex;
    align-items: center;
    background-color: transparent;
    height: 45px;
    width: 45px;


}

#header .search svg {
    fill: var(--color-primary);
}

#header .account{
    width: 45px;
    height: 45px;
    background-color: var(--color-primary);
    outline: none;
    border: none;
    border-radius: 50px;
}

#header .account svg{
    fill: var(--color-on-primary);
}


#header .home {
    text-decoration: none !important;
}
</style>