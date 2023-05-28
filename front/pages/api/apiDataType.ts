
export class SimpleScrapData {
    smallInfo: { heading: string, content: string }[] = []
    technicalDetails: { heading: string, content: string }[] = []
    aboutItem: string[] = []
    featureImages: string[] = []
    landingImages: string[] = []
}

export class ScrapData {
    scrapUrl = ""
    info = {
        title: "",
        rating: 0,
        reviewCount: 0,
        price: 0,
        discountPrice: 0
    }
    smallInfo: { heading: string, content: string }[] = []
    technicalDetails: { heading: string, content: string }[] = []
    aboutItem: string[] = []
    featureImages: string[] = []
    landingImages: string[] = []

    toSimpleData() {
        let data = new SimpleScrapData()
        data.smallInfo = this.smallInfo
        data.technicalDetails = this.technicalDetails
        data.aboutItem = this.aboutItem
        data.featureImages = this.featureImages
        data.landingImages = this.landingImages

        return JSON.stringify(data)
    }
}


export interface CategoryData {
    categoryId: number,
    clicks: number,
    views: number,
    createAt: number,
    name: string,
    imageUrl: string,
    count: number,
    isSlide: boolean
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
    allDetail: string,
    imageUrl: string,
    scrapUrl: string,
    slideImageUrl: string
  }


  export interface SimpleProductData{
    categoryId: number,
    productId: number,
    views: number,
    name: string,
    rating: number,
    reviewCount: number,
    price: number,
    discountPrice: number,
    imageUrl: string,
    slideImageUrl: string
  }
  
  export interface SimpleCategoryData {
    categoryId: number,
    name: string,
    imageUrl: string,
    count: number,
    isSlide: boolean
  }
  export interface HomeData{
    category: SimpleCategoryData, 
    products: SimpleProductData[]
  }
  