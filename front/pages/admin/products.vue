<script setup lang='ts'>
// import { runDatabase } from '../../lib/mongodb'
// runDatabase()

import Api from '../api/api'
import { ProductData, ScrapData } from '../api/apiDataType';
import { stringToNumber, unixMillisecondsToDateString } from '../api/utils';
import { useRouter } from 'vue-router';
const router = useRouter();

const productUrl = ref("")
const slideImageUrl = ref("")
const scrapData = ref(new ScrapData())
const isLoaded = ref(false)
const isSubmitting = ref(false)

const allProducts = ref<ProductData[]>()

var adminId: string | null = null

var isSlideshow = ref(false)
onMounted(function () {

    let mode = openedMode()
    if(mode == null){
        history.back()
    }else{
        isSlideshow.value = mode
    }

    adminId = getAdminId()
    if (adminId == null) {
        window.location.href = "/"
        return
    }

    setTitle('Category - Admin')
    loadData()
})

function setTitle(title: string){
    document.title = title
}



function getAdminId() {
    return localStorage.getItem("adminId")
}




enum Status {
    Ideal,
    Scrap,
    Submit
}

const status = ref<Status>(Status.Ideal)


async function loadData() {
    isLoaded.value = false
    status.value = Status.Ideal
    const res = await Api.getCategoryProducts(getCategoryId(), 0)
    if (res.isError) {
        router.push('/error')
    } else {
        if (res.result == null) {
            alert("Something went wrong")
        } else {
            allProducts.value = res.result
            isLoaded.value = true
        }
    }

}


function openedMode(){
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const type = `${url.searchParams.get("slideShow")}`
    if(type == 'true'){
        return true
    }else if(type == 'false'){
        return false
    }

    return null
}

function getCategoryId() {

    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const id = `${url.searchParams.get("categoryId")}`
    return stringToNumber(id)
}

async function startScrapping() {

    if (status.value != Status.Ideal) return
    if (adminId == null) return

    status.value = Status.Scrap
    const res = await Api.getScrapData(productUrl.value, adminId)
    if (res.isError) {
        status.value = Status.Ideal
        alert("Unable to scrap | " + res.error)
    } else {
        if (res.result != null) {
            status.value = Status.Submit
            scrapData.value = res.result
            await nextTick()
            adjustAllTextareaHeight()
        } else {
            status.value = Status.Ideal
            alert("Unable to scrap")
        }
    }

}

async function submitProduct() {

    if (isSubmitting.value) return
    if (adminId == null) return

    const categoryId = getCategoryId()
    isSubmitting.value = true
    const thumbnailUrl = scrapData.value.landingImages[0]
    if(thumbnailUrl == undefined){
        alert("thumbnail missing with this product")
        return
    }

    const res = await Api.addProduct(adminId, categoryId, thumbnailUrl, productUrl.value, slideImageUrl.value, scrapData.value)
    isSubmitting.value = false
    if (res.isError) {
        alert(res.error)
    } else {
        if (res.result == null) {
            alert("Something went wrong")
        } else {
            productUrl.value = ""
            slideImageUrl.value = ""
            loadData()
        }
    }
}



function adjustAllTextareaHeight() {
    document.querySelectorAll("textarea").forEach(textarea => {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    });

}

function adjustTextareaHeight(target: EventTarget | null) {
    if (target == null) return
    const textarea = target as HTMLTextAreaElement
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

async function onDeleteSubmit(productId: number, categoryId: number, name: string, target: EventTarget | null) {
    if(target == null) return
    
    let adminId = getAdminId()
    if (adminId == null) return

    let text = `Do you really want to delete '${name}'?`
    if (confirm(text) == false) {
        return
    }

    (target as HTMLElement).style.display = 'none';
    let next = (target as HTMLElement).nextElementSibling as HTMLDivElement | null;
    if(next){
        next.style.display = 'block';
    }

    let res = await Api.deleteProduct(adminId, productId, categoryId)

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


function removeBasicInfoData(index: number){
    scrapData.value.smallInfo.splice(index, 1)
}

function removeTechnicalData(index: number){
    scrapData.value.technicalDetails.splice(index, 1)
}

function removeAboutData(index: number){
    scrapData.value.aboutItem.splice(index, 1)
}

function removeFeatureData(index: number){
    scrapData.value.featureImages.splice(index, 1)
}

function removeLandingData(index: number){
    scrapData.value.landingImages.splice(index, 1)
}


</script>
<template>
    <div class="loader-holder" v-if="!isLoaded">
        <div class="loader"></div>
    </div>


    <div v-if="isLoaded">
        <section class="container panel">
            <h2>Add Product</h2>
            <div class="add-product">
                <form method="get" @submit.prevent="startScrapping">
                    <input type="url" placeholder="Product url" v-model="productUrl" required>
                    <input type="url" placeholder="Slideshow Url" v-model="slideImageUrl" required v-if="isSlideshow">
                    <button type="submit">
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M11.883 3.007 12 3a1 1 0 0 1 .993.883L13 4v7h7a1 1 0 0 1 .993.883L21 12a1 1 0 0 1-.883.993L20 13h-7v7a1 1 0 0 1-.883.993L12 21a1 1 0 0 1-.993-.883L11 20v-7H4a1 1 0 0 1-.993-.883L3 12a1 1 0 0 1 .883-.993L4 11h7V4a1 1 0 0 1 .883-.993L12 3l-.117.007Z" />
                        </svg>
                    </button>
                </form>
            </div>
        </section>

        <section class="container" v-if="status == Status.Scrap">
            <div class="loader"></div>
        </section>

        <section class="container scrap" v-if="status == Status.Submit">
            <h2>Scrap Data</h2>
            <h3>Basic Info</h3>
            <div class="scrap-data">
                <p>Title</p>
                <textarea v-model="scrapData.info.title" @input="adjustTextareaHeight($event.target)"></textarea>
            </div>
            <div class="parent">
                <div class="scrap-data">
                    <p>Rating</p>
                    <input type="number" v-model="scrapData.info.rating">
                </div>
                <div class="scrap-data">
                    <p>Reviews</p>
                    <input type="number" v-model="scrapData.info.reviewCount">
                </div>
            </div>
            <div class="parent">
                <div class="scrap-data">
                    <p>Discount Price</p>
                    <input type="number" v-model="scrapData.info.discountPrice">
                </div>
                <div class="scrap-data">
                    <p>Real Price</p>
                    <input type="number" v-model="scrapData.info.price">
                </div>
            </div>

            <!-- More info -->
            <div class="table-holder" style="margin-top: 1rem;">
                <h3>More Info</h3>
                <table>
                    <colgroup>
                        <col style="width: 4rem;">
                        <col style="width: auto;">
                        <col style="width: auto;">
                        <col style="width: 5rem;">
                    </colgroup>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Heading</th>
                            <th>Content</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr v-for="item, index in scrapData.smallInfo" :key="index">
                            <td>{{ index }}</td>
                            <td><input type="text" v-model="item.heading" /></td>
                            <td><input type="text" v-model="item.content" /></td>

                            <td>
                                <button class="delete" @click="removeBasicInfoData(index)">
                                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M12 1.75a3.25 3.25 0 0 1 3.245 3.066L15.25 5h5.25a.75.75 0 0 1 .102 1.493L20.5 6.5h-.796l-1.28 13.02a2.75 2.75 0 0 1-2.561 2.474l-.176.006H8.313a2.75 2.75 0 0 1-2.714-2.307l-.023-.174L4.295 6.5H3.5a.75.75 0 0 1-.743-.648L2.75 5.75a.75.75 0 0 1 .648-.743L3.5 5h5.25A3.25 3.25 0 0 1 12 1.75Zm6.197 4.75H5.802l1.267 12.872a1.25 1.25 0 0 0 1.117 1.122l.127.006h7.374c.6 0 1.109-.425 1.225-1.002l.02-.126L18.196 6.5ZM13.75 9.25a.75.75 0 0 1 .743.648L14.5 10v7a.75.75 0 0 1-1.493.102L13 17v-7a.75.75 0 0 1 .75-.75Zm-3.5 0a.75.75 0 0 1 .743.648L11 10v7a.75.75 0 0 1-1.493.102L9.5 17v-7a.75.75 0 0 1 .75-.75Zm1.75-6a1.75 1.75 0 0 0-1.744 1.606L10.25 5h3.5A1.75 1.75 0 0 0 12 3.25Z" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>


            <!-- Technical details -->
            <div class="table-holder" style="margin-top: 1rem;">
                <h3>Technical Details</h3>
                <table>
                    <colgroup>
                        <col style="width: 4rem;">
                        <col style="width: auto;">
                        <col style="width: auto;">
                        <col style="width: 5rem;">
                    </colgroup>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Heading</th>
                            <th>Content</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr v-for="item, index in scrapData.technicalDetails" :key="index">
                            <td>{{ index }}</td>
                            <td><input type="text" v-model="item.heading" /></td>
                            <td><input type="text" v-model="item.content" /></td>

                            <td>
                                <button class="delete" @click="removeTechnicalData(index)">
                                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M12 1.75a3.25 3.25 0 0 1 3.245 3.066L15.25 5h5.25a.75.75 0 0 1 .102 1.493L20.5 6.5h-.796l-1.28 13.02a2.75 2.75 0 0 1-2.561 2.474l-.176.006H8.313a2.75 2.75 0 0 1-2.714-2.307l-.023-.174L4.295 6.5H3.5a.75.75 0 0 1-.743-.648L2.75 5.75a.75.75 0 0 1 .648-.743L3.5 5h5.25A3.25 3.25 0 0 1 12 1.75Zm6.197 4.75H5.802l1.267 12.872a1.25 1.25 0 0 0 1.117 1.122l.127.006h7.374c.6 0 1.109-.425 1.225-1.002l.02-.126L18.196 6.5ZM13.75 9.25a.75.75 0 0 1 .743.648L14.5 10v7a.75.75 0 0 1-1.493.102L13 17v-7a.75.75 0 0 1 .75-.75Zm-3.5 0a.75.75 0 0 1 .743.648L11 10v7a.75.75 0 0 1-1.493.102L9.5 17v-7a.75.75 0 0 1 .75-.75Zm1.75-6a1.75 1.75 0 0 0-1.744 1.606L10.25 5h3.5A1.75 1.75 0 0 0 12 3.25Z" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- About item -->
            <div class="table-holder" style="margin-top: 1rem;">
                <h3>About Items</h3>
                <table>
                    <colgroup>
                        <col style="width: 4rem;">
                        <col style="width: auto;">
                        <col style="width: 5rem;">
                    </colgroup>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Content</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr v-for="item, index in scrapData.aboutItem" :key="index">
                            <td>{{ index }}</td>
                            <td><textarea v-model="scrapData.aboutItem[index]"
                                    @input="adjustTextareaHeight($event.target)"></textarea></td>

                            <td>
                                <button class="delete" @click="removeAboutData(index)">
                                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M12 1.75a3.25 3.25 0 0 1 3.245 3.066L15.25 5h5.25a.75.75 0 0 1 .102 1.493L20.5 6.5h-.796l-1.28 13.02a2.75 2.75 0 0 1-2.561 2.474l-.176.006H8.313a2.75 2.75 0 0 1-2.714-2.307l-.023-.174L4.295 6.5H3.5a.75.75 0 0 1-.743-.648L2.75 5.75a.75.75 0 0 1 .648-.743L3.5 5h5.25A3.25 3.25 0 0 1 12 1.75Zm6.197 4.75H5.802l1.267 12.872a1.25 1.25 0 0 0 1.117 1.122l.127.006h7.374c.6 0 1.109-.425 1.225-1.002l.02-.126L18.196 6.5ZM13.75 9.25a.75.75 0 0 1 .743.648L14.5 10v7a.75.75 0 0 1-1.493.102L13 17v-7a.75.75 0 0 1 .75-.75Zm-3.5 0a.75.75 0 0 1 .743.648L11 10v7a.75.75 0 0 1-1.493.102L9.5 17v-7a.75.75 0 0 1 .75-.75Zm1.75-6a1.75 1.75 0 0 0-1.744 1.606L10.25 5h3.5A1.75 1.75 0 0 0 12 3.25Z" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Featured images -->
            <div class="table-holder" style="margin-top: 1rem;">
                <h3>Featured Images</h3>
                <table>
                    <colgroup>
                        <col style="width: 4rem;">
                        <col style="width: auto;">
                        <col style="width: 5rem;">
                    </colgroup>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>URI</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr v-for="item, index in scrapData.featureImages">
                            <td>{{ index }}</td>
                            <td>{{ item }}</td>
                            <td>
                                <button class="delete" @click="removeFeatureData(index)">
                                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M12 1.75a3.25 3.25 0 0 1 3.245 3.066L15.25 5h5.25a.75.75 0 0 1 .102 1.493L20.5 6.5h-.796l-1.28 13.02a2.75 2.75 0 0 1-2.561 2.474l-.176.006H8.313a2.75 2.75 0 0 1-2.714-2.307l-.023-.174L4.295 6.5H3.5a.75.75 0 0 1-.743-.648L2.75 5.75a.75.75 0 0 1 .648-.743L3.5 5h5.25A3.25 3.25 0 0 1 12 1.75Zm6.197 4.75H5.802l1.267 12.872a1.25 1.25 0 0 0 1.117 1.122l.127.006h7.374c.6 0 1.109-.425 1.225-1.002l.02-.126L18.196 6.5ZM13.75 9.25a.75.75 0 0 1 .743.648L14.5 10v7a.75.75 0 0 1-1.493.102L13 17v-7a.75.75 0 0 1 .75-.75Zm-3.5 0a.75.75 0 0 1 .743.648L11 10v7a.75.75 0 0 1-1.493.102L9.5 17v-7a.75.75 0 0 1 .75-.75Zm1.75-6a1.75 1.75 0 0 0-1.744 1.606L10.25 5h3.5A1.75 1.75 0 0 0 12 3.25Z" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Landing images -->
            <div class="table-holder" style="margin-top: 1rem;">
                <h3>Landing Images</h3>
                <table>
                    <colgroup>
                        <col style="width: 4rem;">
                        <col style="width: auto;">
                        <col style="width: 5rem;">
                    </colgroup>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>URI</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr v-for="item, index in scrapData.landingImages">
                            <td>{{ index }}</td>
                            <td>{{ item }}</td>
                            <td>
                                <button class="delete" @click="removeLandingData(index)">
                                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M12 1.75a3.25 3.25 0 0 1 3.245 3.066L15.25 5h5.25a.75.75 0 0 1 .102 1.493L20.5 6.5h-.796l-1.28 13.02a2.75 2.75 0 0 1-2.561 2.474l-.176.006H8.313a2.75 2.75 0 0 1-2.714-2.307l-.023-.174L4.295 6.5H3.5a.75.75 0 0 1-.743-.648L2.75 5.75a.75.75 0 0 1 .648-.743L3.5 5h5.25A3.25 3.25 0 0 1 12 1.75Zm6.197 4.75H5.802l1.267 12.872a1.25 1.25 0 0 0 1.117 1.122l.127.006h7.374c.6 0 1.109-.425 1.225-1.002l.02-.126L18.196 6.5ZM13.75 9.25a.75.75 0 0 1 .743.648L14.5 10v7a.75.75 0 0 1-1.493.102L13 17v-7a.75.75 0 0 1 .75-.75Zm-3.5 0a.75.75 0 0 1 .743.648L11 10v7a.75.75 0 0 1-1.493.102L9.5 17v-7a.75.75 0 0 1 .75-.75Zm1.75-6a1.75 1.75 0 0 0-1.744 1.606L10.25 5h3.5A1.75 1.75 0 0 0 12 3.25Z" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <button @click="submitProduct">
                <span v-if="!isSubmitting">Submit</span>
                <div v-if="isSubmitting" class="loader2"></div>
            </button>

        </section>


        <section class="container">
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
                        <col style="width: 5rem;">
                    </colgroup>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Id</th>
                            <th>Name</th>
                            <th>Click</th>
                            <th>Views</th>
                            <th>Date</th>
                            <th>Detail</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr v-for="product, index in allProducts">
                            <td>{{ index }}</td>
                            <td>{{ product.productId }}</td>
                            <td class="name">{{ product.name }}</td>
                            <td>{{ product.clicks }}</td>
                            <td>{{ product.views }}</td>
                            <td>{{ unixMillisecondsToDateString(product.createAt) }}</td>
                            <td>
                                <button>
                                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M13.267 4.209a.75.75 0 0 0-1.034 1.086l6.251 5.955H3.75a.75.75 0 0 0 0 1.5h14.734l-6.251 5.954a.75.75 0 0 0 1.034 1.087l7.42-7.067a.996.996 0 0 0 .3-.58.758.758 0 0 0-.001-.29.995.995 0 0 0-.3-.578l-7.419-7.067Z" />
                                    </svg>
                                </button>
                            </td>

                            <td>
                                <button class="delete" @click="onDeleteSubmit(product.productId, product.categoryId, product.name, $event.target)">
                                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M12 1.75a3.25 3.25 0 0 1 3.245 3.066L15.25 5h5.25a.75.75 0 0 1 .102 1.493L20.5 6.5h-.796l-1.28 13.02a2.75 2.75 0 0 1-2.561 2.474l-.176.006H8.313a2.75 2.75 0 0 1-2.714-2.307l-.023-.174L4.295 6.5H3.5a.75.75 0 0 1-.743-.648L2.75 5.75a.75.75 0 0 1 .648-.743L3.5 5h5.25A3.25 3.25 0 0 1 12 1.75Zm6.197 4.75H5.802l1.267 12.872a1.25 1.25 0 0 0 1.117 1.122l.127.006h7.374c.6 0 1.109-.425 1.225-1.002l.02-.126L18.196 6.5ZM13.75 9.25a.75.75 0 0 1 .743.648L14.5 10v7a.75.75 0 0 1-1.493.102L13 17v-7a.75.75 0 0 1 .75-.75Zm-3.5 0a.75.75 0 0 1 .743.648L11 10v7a.75.75 0 0 1-1.493.102L9.5 17v-7a.75.75 0 0 1 .75-.75Zm1.75-6a1.75 1.75 0 0 0-1.744 1.606L10.25 5h3.5A1.75 1.75 0 0 0 12 3.25Z" />
                                    </svg>
                                </button>
                                <div class="loader2 delete-loader"></div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </section>
    </div>
</template>
<style scoped>
/* -------------------- scrap detail ----------------- */
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

.scrap {
    margin-bottom: 10rem;
}

.scrap>button {
    margin-top: 2rem;
    width: 100%;
    border: none;
    padding: 0.8em 1em;
    font-size: var(--medium-font);
    background-color: var(--color-primary);
    border-radius: var(--radius-medium);
    color: var(--color-on-primary);
}

.scrap>button:hover {
    background-color: var(--color-primary-variant);
}

.scrap-data {
    margin-bottom: 0.8rem;
}

.scrap-data textarea {
    border: none;
    border: 1px solid var(--color-surface-dark);
    padding: 0.6em 1em;
    font-size: var(--medium-font);
    width: 100%;
    height: auto;
    resize: none;
    overflow: hidden;

}

.scrap h2 {
    text-align: center;
}

.parent {
    display: flex;
    align-items: center;
    gap: 1.5rem;
}

.scrap-data p {
    margin: 0.4em 0;
    font-weight: 600;
}

.scrap-data input {
    font-size: var(--medium-font);
    padding: 0.5em 1em;
    width: 100%;
    border: none;
    background-color: var(--color-surface-variant);
    border: 1px solid var(--color-surface-dark);
    border-radius: var(--radius-medium);
    margin: 0;
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

.add-product form {
    display: flex;
    gap: 1em;
    margin-bottom: 4em;
}

.add-product input {
    outline: none;
    border: none;
    background-color: var(--color-surface);
    border: 1px solid var(--color-surface-dark);
    border-radius: var(--radius-medium);
    flex: 1;
    font-size: var(--medium-font);
    padding: 0.6em 1em;
}

.add-product button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.8em;
    border: none;
    outline: none;
    background-color: var(--color-primary);
    border-radius: var(--radius-medium);
}

.add-product button:hover {
    background-color: var(--color-primary-variant);
}

.add-product button svg {
    fill: var(--color-on-primary);
}
</style>
