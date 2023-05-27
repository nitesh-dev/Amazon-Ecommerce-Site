import { CategoryData, ProductData, ScrapData } from "./apiDataType"

interface Result<T> {
    type(account_id: string, type: any): unknown
    isError: boolean,
    result: T | null,
    error: string
}
function createResult<T>(result: T | null, isError: boolean = true, error: string = "") {
    return { isError: isError, result: result, error: error } as Result<T>
}

namespace Api {

    const apiURL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3001'

    export async function getScrapData(url: string, adminId: string) {
        return getScrap<ScrapData>("admin/scrap-url", `url=${url}&adminId=${adminId}`)
    }


    export async function getProduct(productId: number) {
        return get<ProductData>("product", `productId=${productId}`)
    }


    export async function getCategoryProducts(categoryId: number, limit: number) {
        return get<ProductData[]>("category-products", `categoryId=${categoryId}&limit=${limit}`)
    }

    export async function getAllCategory() {
        return get<CategoryData[]>("all-category", '')
    }


    export async function addCategory(adminId: string, categoryName: string, imageUrl: string) {
        let categoryData = {
            adminId: adminId,
            name: categoryName,
            url: imageUrl

        }
        return post("admin/category", "", categoryData)
    }


    export async function addProduct(adminId: string, categoryId: number, imageUrl: string, affiliateUrl: string, scrapData: ScrapData) {
        let productData = {
            adminId: adminId,
            categoryId: categoryId,
            imageUrl: imageUrl,
            affiliateUrl: affiliateUrl,
            data: scrapData

        }
        return post("admin/product", "", productData)
    }

    // export async function getAllProducts(categoryId: number)















    async function getScrap<T>(path: string, query: string) {


        const requestOptions: RequestInit = {
            method: "GET",
            redirect: "follow",
        };

        try {
            const res = await fetch(`${apiURL}/${path}?${query}`, requestOptions);
            if (res.ok) {
                const data = JSON.parse(await res.json()) as T
                return createResult<T>(data, false)
            } else {
                return createResult<T>(null, true, await res.text())
            }
        } catch (error) {
            return createResult<T>(null, true, "fetch error")
        }
    }









    async function get<T>(path: string, query: string) {
        const requestOptions: RequestInit = {
            method: "GET",
            redirect: "follow",
        };

        // console.log(`${apiURL}/${path}?${query}`)

        try {
            const res = await fetch(`${apiURL}/${path}?${query}`, requestOptions);
            if (res.ok) {
                // const data = JSON.parse() as T
                return createResult<T>(await res.json(), false)
            } else {
                return createResult<T>(null, true, await res.text())
            }
        } catch (error) {
            return createResult<T>(null, true, "fetch error")
        }
    }

    async function post<T>(path: string, query: string, body: any) {
        const requestOptions: RequestInit = {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            redirect: "follow",
            body: JSON.stringify(body),
        };

        // console.log(`${apiURL}/${path}?${query}`)

        try {
            const res = await fetch(`${apiURL}/${path}?${query}`, requestOptions);
            if (res.ok) {
                return createResult<T>(await res.json(), false)
            } else {
                return createResult(null, true, await res.text())
            }
        } catch (error) {
            return createResult<T>(null, true, "fetch error")
        }
    }

}

export default Api