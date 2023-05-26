
export class ScrapData {
    info = {
        title: "",
        rating: "",
        reviewCount: "",
        currentPrice: "",
        discountPrice: ""
    }
    smallInfo: { heading: string, content: string }[] = []
    technicalDetails: { heading: string, content: string }[] = []
    aboutItem: string[] = []
    featureImages: string[] = []
    landingImages: string[] = []
}


export interface CategoryData {
    _id: string
    categoryId: number,
    clicks: number,
    views: number,
    createAt: number,
    name: string,
}