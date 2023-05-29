<script setup lang='ts'>
const props = defineProps({
  error: Object
})

</script>
<template>
  <div class="error">
    <h1>404</h1>
    <h2>Not Found</h2>
    <NuxtLink to="/">Home page</NuxtLink>
  </div>
</template>
<style scoped>
.error {
  width: 100%;
  height: 100Vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

h1 {
  color: var(--color-primary);
  font-size: 10vw;
  margin: 0;
}

h2{
  color: var(--color-on-secondary);
  margin: 0;
}

a{
  text-decoration: none;
  font-size: var(--medium-font);
  display: inline-block;
  color: var(--color-on-secondary);
  border: 1px solid var(--color-surface-dark);
  padding: 0.6rem 1rem;
  margin: 1rem;
  margin-top: 2rem;
  background-color: white;
  scale: 1;
  transition: scale 200ms;
  border-radius: var(--radius-medium);
}

a:hover{
  scale: 1.1;
}
</style>