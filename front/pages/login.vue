<script setup lang='ts'>
import Api from './api/api';
const isProcessing = ref(false)
const email = ref("")
const password = ref("")

onMounted(function () {

    let adminId = getAdminId()
    if (adminId != null) {
        window.location.href = "/admin/category"
    }
})

function getAdminId() {
    return localStorage.getItem("adminId")
}

async function loginIn() {

    if (isProcessing.value) return
    isProcessing.value = true
    let res = await Api.loginIn(email.value, password.value)
    isProcessing.value = false

    if (res.isError) {
        alert(res.error)
    } else {
        if (res.result == null) {
            alert("Something went wrong!")
        } else {
            let adminId = (res.result as { id: string }).id
            localStorage.setItem("adminId", adminId)
            window.location.href = "/admin/category"
        }
    }
}




</script>
<template>
    <div class="login-form">
        <form method="post" @submit.prevent="loginIn()">
            <h1>Login</h1>
            <div class="content">
                <div class="input-field">
                    <input type="email" placeholder="Email" required v-model="email">
                </div>
                <div class="input-field">
                    <input type="password" placeholder="Password" required v-model="password">
                </div>
            </div>
            <div class="action">
                <button type="submit">
                    <span v-if="!isProcessing">Sign in</span>
                    <div v-else class="loader2"></div>
                </button>
            </div>
        </form>
    </div>
</template>
<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
}

body {
    background: #e35869;
    font-family: 'Rubik', sans-serif;
}

.login-form {
    background: #fff;
    width: 500px;
    margin: 65px auto;
    display: -webkit-box;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    border-radius: 4px;
    box-shadow: 0 2px 25px rgba(0, 0, 0, 0.2);
}

.login-form h1 {
    padding: 35px 35px 0 35px;
    font-weight: 300;
}

.login-form .content {
    padding: 35px;
    text-align: center;
}

.login-form .input-field {
    padding: 12px 5px;
}

.login-form .input-field input {
    font-size: 16px;
    display: block;
    font-family: 'Rubik', sans-serif;
    width: 100%;
    padding: 10px 1px;
    border: 0;
    border-bottom: 1px solid #747474;
    outline: none;
    -webkit-transition: all .2s;
    transition: all .2s;
}

.login-form .action button {
    height: 3.5rem;
    width: 100%;
    border: none;
    font-family: 'Rubik', sans-serif;
    cursor: pointer;
    text-transform: uppercase;
    background: var(--color-primary);
    color: white;
    border-bottom-left-radius: var(--radius-medium);
    border-bottom-right-radius: var(--radius-medium);
    letter-spacing: 0.2px;
    outline: 0;
    -webkit-transition: all .3s;
    transition: all .3s;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-form .action button:hover {
    background: var(--color-primary-variant);
}
</style>