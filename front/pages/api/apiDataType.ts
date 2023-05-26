
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
    categoryId: number,
    clicks: number,
    views: number,
    createAt: number,
    name: string,
    imageUrl: string,
    count: number
}


export interface ProductData {
    categoryId: number,
    productId: number,
    clicks: number,
    views: number,
    createAt: number,
    name: string,
    rating: number,
    reviewCount: number,
    price: number,
    discountPrice: number,
    affiliateUrl: string,
    allDetail: string
  }