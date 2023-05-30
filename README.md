#  Amazon-Ecommerce-Site
Amazon-Ecommerce-Site is a user-friendly and visually appealing website that draws inspiration from the renowned Amazon platform. Designed with the familiar Amazon layout and aesthetics, this website provides a seamless and intuitive shopping experience for users.

Featuring an extensive collection of products, Amazon-Ecommerce-Site leverages Amazon's vast database to offer a wide range of categories, including electronics, books, fashion, home goods, and more. Users can browse through the diverse selection, read detailed product descriptions, and view high-quality images to make informed purchasing decisions.

Just like Amazon, this website incorporates a robust search functionality, allowing users to quickly find their desired items. Additionally, it offers user-friendly filters and sorting options to refine search results based on various criteria, such as price range, brand, ratings, and more.

Amazon-Ecommerce-Site also integrates secure payment gateways, ensuring a safe and hassle-free checkout process. Users can add products to their shopping cart, review their order details, and proceed to make secure transactions with confidence.

Moreover, the website incorporates customer reviews and ratings, enabling users to gain insights from others' experiences before making a purchase. This feature enhances transparency and assists users in making informed buying decisions.

In summary, Amazon-Ecommerce-Site brings the familiar Amazon design and comprehensive product range to create an immersive shopping experience. Whether you're looking for electronics, fashion, books, or any other product, this website aims to provide a seamless and reliable platform for your online shopping needs.

## Scrap

A Sample code of scraper used in this project

```bash
import axios from "axios";
import cheerio from "cheerio";

interface Listing {
  title: string;
  price: string;
  image: string;
  link: string;
}

async function scrapeAmazonListings(url: string): Promise<Listing[]> {
  const headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    "Accept-Language": "en-US,en;q=0.9"
  };

  const response = await axios.get(url, { headers });
  const $ = cheerio.load(response.data);

  const listings: Listing[] = [];

  $("div.s-result-item").each((_, element) => {
    const title = $(element).find("h2.a-size-mini").text().trim();
    const price = $(element).find("span.a-offscreen").text().trim();
    const image = $(element).find("img.s-image").attr("src");
    const link = $(element).find("a.a-link-normal").attr("href");

    const listing: Listing = {
      title,
      price,
      image,
      link: `https://www.amazon.com${link}`
    };

    listings.push(listing);
  });

  return listings;
}

// Example usage
const amazonUrl = "https://www.amazon.com/s?k=laptops";
scrapeAmazonListings(amazonUrl)
  .then(listings => {
    listings.forEach(listing => {
      console.log("Title:", listing.title);
      console.log("Price:", listing.price);
      console.log("Image:", listing.image);
      console.log("Link:", listing.link);
      console.log();
    });
  })
  .catch(error => {
    console.error("Error:", error);
  });

```

## Screenshorts
<img width="1680" alt="Screenshot 2023-05-31 at 3 19 24 AM" src="https://github.com/StartCodeingWithSayam/Amazon-Ecommerce-Site/assets/92935635/85829b84-fe6e-4360-800b-303013cb03c4"><img width="1680" alt="Screenshot 2023-05-31 at 3 20 06 AM" src="https://github.com/StartCodeingWithSayam/Amazon-Ecommerce-Site/assets/92935635/c3f8502b-010f-4b83-83ac-c340c2e8f3f0">
<img width="1680" alt="Screenshot 2023-05-31 at 3 20 15 AM" src="https://github.com/StartCodeingWithSayam/Amazon-Ecommerce-Site/assets/92935635/858c8d0f-8c51-4470-b456-3e97fadd4e81">


## Contributers

- [@Nitish kumar](https://github.com/nitish-dev) [Back end developer]
- [@Anubhav ](https://github.com/Anubhav0114) [Front end developer]
- [@Sayam Sharma](https://github.com/StartCodeingWithSayam) [Front end developer]

## License

[FLAX STUDIO](https://flax-studio.versel.app)
