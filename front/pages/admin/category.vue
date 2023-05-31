<script setup lang='ts'>
import Api from '../api/api';
import { CategoryData, CategoryUpdate } from '../api/apiDataType';
import { unixMillisecondsToDateString } from '../api/utils.js';
import { useRouter } from 'vue-router';
const router = useRouter();


const isLoaded = ref(false)
const isSubmitting = ref(false)
const categoryName = ref("")
const imageUrl = ref("")
var adminId: string | null = null
const categories = ref<CategoryData[]>()

const categoryUpdatedData = ref<CategoryUpdate>({ categoryId: 0, name: '', imageUrl: '' })


onMounted(function () {

    adminId = getAdminId()
    if (adminId == null) {
        window.location.href = "/"
        return
    }
    setTitle('Home - Admin')
    loadData()
})

function getAdminId() {
    return localStorage.getItem("adminId")
}

function setTitle(title: string) {
    document.title = title
}

async function loadData() {
    isLoaded.value = false
    const res = await Api.getAllCategory()
    if (res.isError) {
        router.push('/error')
    } else {
        if (res.result == null) {
            alert("Something went wrong!")
        } else {
            categories.value = res.result
            isLoaded.value = true
            if (res.result.length == 0) {
                categoryName.value = "SlideShow"
                createCategory(true)
            }
        }
    }
}

async function createCategory(isSlideshow = false) {

    if (adminId == null) return
    if (isSubmitting.value) return
    let name = categoryName.value.trim()
    if (name.length == 0) return

    isSubmitting.value = true
    const res = await Api.addCategory(adminId, name, isSlideshow, imageUrl.value)
    isSubmitting.value = false

    if (res.isError) {
        alert(res.error)
    } else {
        categoryName.value = ''
        imageUrl.value = ''
        loadData()
    }

}

function openCategory(id: number, slideshow: boolean) {
    window.location.href = `/admin/products?categoryId=${id}&slideShow=${slideshow}`
}


const isCategoryUpdateHidden = ref(true)

const isProcessing = ref(false)
function setupUpdateCategoryData(data: CategoryData) {
    let categoryData: CategoryUpdate = {
        categoryId: data.categoryId,
        name: data.name,
        imageUrl: data.imageUrl
    }

    categoryUpdatedData.value = categoryData
    isCategoryUpdateHidden.value = false
}

async function onUpdateSubmit() {
    let adminId = getAdminId()
    if (adminId == null) return

    isProcessing.value = true
    let res = await Api.updateCategory(adminId, categoryUpdatedData.value)
    isProcessing.value = false

    if (res.isError) {
        alert('Unable to update')
    } else {
        if (res.result == null) {
            alert("Something went wrong!")
        } else {
            isCategoryUpdateHidden.value = true
            loadData()
        }
    }
}



async function onDeleteSubmit(categoryId: number, name: string, target: EventTarget | null) {
    if(target == null) return
    
    let adminId = getAdminId()
    if (adminId == null) return

    let text = `Do you really want to delete '${name}'? \n This will delete all it's products.`
    if (confirm(text) == false) {
        return
    }

    (target as HTMLElement).style.display = 'none';
    let next = (target as HTMLElement).nextElementSibling as HTMLDivElement | null;
    if(next){
        next.style.display = 'block';
    }

    let res = await Api.deleteCategory(adminId, categoryId)

    if (res.isError) {
        alert('Unable to delete')
    } else {
        if (res.result == null) {
            alert("Something went wrong!")
        } else {
            loadData()
        }
    }
}



</script>
<template>
    <div class="loader-holder" v-if="!isLoaded">
        <div class="loader"></div>
    </div>

    <section v-if="isLoaded" class="container panel">
        <h2>Add category</h2>
        <form class="add-collection" method="post" @submit.prevent="createCategory()">
            <input type="text" placeholder="Collection name" v-model="categoryName" required>
            <input type="url" placeholder="Image Url" v-model="imageUrl" required>
            <button type="submit">
                <div v-if="isSubmitting" class="loader2"></div>
                <svg v-if="!isSubmitting" width="24" height="24" fill="none" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M11.883 3.007 12 3a1 1 0 0 1 .993.883L13 4v7h7a1 1 0 0 1 .993.883L21 12a1 1 0 0 1-.883.993L20 13h-7v7a1 1 0 0 1-.883.993L12 21a1 1 0 0 1-.993-.883L11 20v-7H4a1 1 0 0 1-.993-.883L3 12a1 1 0 0 1 .883-.993L4 11h7V4a1 1 0 0 1 .883-.993L12 3l-.117.007Z" />
                </svg>
            </button>
        </form>

    </section>

    <section v-if="isLoaded" class="container">
        <div class="table-holder">
            <table>
                <colgroup>
                    <col style="width: 4rem;">
                    <col style="width: auto;">
                    <col style="width: auto;">
                    <col style="width: auto;">
                    <col style="width: auto;">
                    <col style="width: auto;">
                    <col style="width: auto;">
                    <col style="width: auto;">
                    <col style="width: auto;">
                    <col style="width: 6rem;">
                </colgroup>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Products</th>
                        <th>Visits</th>
                        <th>Views</th>
                        <th>Date</th>
                        <th>SlideShow</th>
                        <th>Edit</th>
                        <th>View</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="category, index in categories">
                        <td>{{ index }}</td>
                        <td>{{ category.name }}</td>
                        <td>{{ category.count }}</td>
                        <td>{{ category.clicks }}</td>
                        <td>{{ category.views }}</td>
                        <td>{{ unixMillisecondsToDateString(category.createAt) }}</td>
                        <td>{{ category.isSlide }}</td>
                        <td>
                            <button v-if="category.name != 'SlideShow'" @click="setupUpdateCategoryData(category)">
                                <svg width="24" height="24" fill="none" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M9.75 2h3.998a.75.75 0 0 1 .102 1.493l-.102.007H12.5v17h1.245a.75.75 0 0 1 .743.648l.007.102a.75.75 0 0 1-.648.743l-.102.007H9.75a.75.75 0 0 1-.102-1.493l.102-.007H11v-17H9.75a.75.75 0 0 1-.743-.648L9 2.75a.75.75 0 0 1 .648-.743L9.75 2h3.998H9.75Zm8.496 2.997a3.253 3.253 0 0 1 3.25 3.25l.004 7.504a3.249 3.249 0 0 1-3.064 3.246l-.186.005h-4.745v-1.5h4.803A1.749 1.749 0 0 0 20 15.751l-.003-7.505a1.753 1.753 0 0 0-1.752-1.75h-4.74v-1.5h4.74Zm-8.246 0v1.5H5.25a1.75 1.75 0 0 0-1.75 1.75v7.504c0 .967.784 1.75 1.75 1.75h4.745v1.5H5.25A3.25 3.25 0 0 1 2 15.751V8.247a3.25 3.25 0 0 1 3.25-3.25H10Z" />
                                </svg>
                            </button>
                        </td>
                        <td>
                            <button @click="openCategory(category.categoryId, category.isSlide)">
                                <svg width="24" height="24" fill="none" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M13.267 4.209a.75.75 0 0 0-1.034 1.086l6.251 5.955H3.75a.75.75 0 0 0 0 1.5h14.734l-6.251 5.954a.75.75 0 0 0 1.034 1.087l7.42-7.067a.996.996 0 0 0 .3-.58.758.758 0 0 0-.001-.29.995.995 0 0 0-.3-.578l-7.419-7.067Z" />
                                </svg>
                            </button>
                        </td>
                        <td>
                            <template v-if="category.name != 'SlideShow'">
                                <button class="delete" @click="onDeleteSubmit(category.categoryId, category.name, $event.target)">
                                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M12 1.75a3.25 3.25 0 0 1 3.245 3.066L15.25 5h5.25a.75.75 0 0 1 .102 1.493L20.5 6.5h-.796l-1.28 13.02a2.75 2.75 0 0 1-2.561 2.474l-.176.006H8.313a2.75 2.75 0 0 1-2.714-2.307l-.023-.174L4.295 6.5H3.5a.75.75 0 0 1-.743-.648L2.75 5.75a.75.75 0 0 1 .648-.743L3.5 5h5.25A3.25 3.25 0 0 1 12 1.75Zm6.197 4.75H5.802l1.267 12.872a1.25 1.25 0 0 0 1.117 1.122l.127.006h7.374c.6 0 1.109-.425 1.225-1.002l.02-.126L18.196 6.5ZM13.75 9.25a.75.75 0 0 1 .743.648L14.5 10v7a.75.75 0 0 1-1.493.102L13 17v-7a.75.75 0 0 1 .75-.75Zm-3.5 0a.75.75 0 0 1 .743.648L11 10v7a.75.75 0 0 1-1.493.102L9.5 17v-7a.75.75 0 0 1 .75-.75Zm1.75-6a1.75 1.75 0 0 0-1.744 1.606L10.25 5h3.5A1.75 1.75 0 0 0 12 3.25Z" />
                                    </svg>
                                </button>
                                <div class="loader2 delete-loader"></div>
                            </template>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    </section>


    <section v-if="!isCategoryUpdateHidden" class="container panel">
        <h2>Update Category</h2>
        <!-- About item -->
        <div class="table-holder" style="margin-top: 1rem;">

            <table>
                <colgroup>
                    <col style="width: 5rem;">
                    <col style="width: auto;">
                    <col style="width: auto;">
                    <col style="width: 6rem;">
                </colgroup>
                <thead>
                    <tr>
                        <th>CategoryId</th>
                        <th>Name</th>
                        <th>Image Url</th>
                        <th>Submit</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{{ categoryUpdatedData.categoryId }}</td>
                        <td><input type="text" v-model="categoryUpdatedData.name" /></td>
                        <td><input type="text" v-model="categoryUpdatedData.imageUrl" /></td>
                        <td>
                            <button @click="onUpdateSubmit" v-if="!isProcessing" class="update">
                                <svg width="24" height="24" fill="none" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M5.694 12 2.299 3.272c-.236-.607.356-1.188.942-.982l.093.04 18 9a.75.75 0 0 1 .097 1.283l-.097.058-18 9c-.583.291-1.217-.244-1.065-.847l.03-.096L5.694 12 2.299 3.272 5.694 12ZM4.402 4.54l2.61 6.71h6.627a.75.75 0 0 1 .743.648l.007.102a.75.75 0 0 1-.649.743l-.101.007H7.01l-2.609 6.71L19.322 12 4.401 4.54Z" />
                                </svg>
                            </button>
                            <div v-else class="loader2 success-loader"></div>

                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>
<style scoped>
.success-loader {
    border-color: var(--color-secondary) !important;
    border-left-color: transparent !important;
}

.delete-loader {
    display: none;
    border-color: var(--color-error) !important;
    border-left-color: transparent !important;
}

.delete *{
    pointer-events: none;
}

.light {
    overflow: auto;
    margin-top: 2rem;
    background-color: var(--color-surface-variant);
}

.panel {
    overflow: auto;
    background-color: var(--color-surface-variant);
    color: var(--color-on-secondary);
    margin-top: 2rem;
    margin-bottom: 2rem;
    border-radius: var(--radius-medium);
}

.panel h2 {
    text-align: center;
    color: inherit;
}

.add-collection {
    display: flex;
    gap: 1em;
    margin-bottom: 4em;
}

.add-collection input {
    outline: none;
    border: none;
    background-color: var(--color-surface);
    border: 1px solid var(--color-surface-dark);
    border-radius: var(--radius-medium);
    flex: 1;
    font-size: var(--medium-font);
    padding: 0.6em 1em;
}

.add-collection button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.8em;
    border: none;
    outline: none;
    background-color: var(--color-primary);
    border-radius: var(--radius-medium);
}

.add-collection button:hover {
    background-color: var(--color-primary-variant);
}

.add-collection button svg {
    fill: var(--color-on-primary);
}
</style>