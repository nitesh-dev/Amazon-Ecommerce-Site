import { ScrapData } from "./apiDataType"

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

    export async function getScrapData(url: string) {
        return get<ScrapData>("scrap-url", `url=${url}`)
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
                const data = JSON.parse(await res.json()) as T
                return createResult<T>(data, false)
            } else {
                return createResult<T>(null, true, await res.text())
            }
        } catch (error) {
            return createResult<T>(null, true, "fetch error")
        }
    }

}

export default Api