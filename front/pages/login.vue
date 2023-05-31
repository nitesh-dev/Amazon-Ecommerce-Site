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

.login-form {
    background-color: var(--color-surface);
    display: flex;
    min-height: 100vh;
    align-items: center;
    justify-content: center;
}
.login-form h1{
    text-align: center;
    font-size: 2.4rem;
    font-weight: 800 !important;
    margin-bottom: 1rem;
    color:var(--color-primary)
}

.login-form form{
    max-width: 500px;
    width: 100%;
    margin: 1rem;
    background-color: var(--color-surface-variant);
    padding: 1.2rem;
    border-radius: 1rem;
}


.login-form .content {
    text-align: center;
}

.login-form .input-field {
    padding: 12px 5px;
}

.login-form .input-field input {
    font-size: 16px;
    display: block;
    width: 100%;
    padding: 10px 1px;
    border: 0;
    border: 1px solid var(--color-surface-dark);
    outline: none;
    border-radius: 10px;
    padding: 1rem 1.4rem;
    -webkit-transition: all .2s;
    transition: all .2s;
}

.login-form .action button {
    margin-top: 2rem;
    height: 3.5rem;
    width: 100%;
    border: none;
    cursor: pointer;
    text-transform: uppercase;
    background: var(--color-primary);
    color: white;
    font-size: var(--medium2-font);
    font-weight: 600;
    border-radius: var(--radius-medium);
    box-shadow: 0 5px 10px 0 #3086c855;
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