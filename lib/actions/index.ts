"use server"; //all the code written here will only execute on the server
import { revalidatePath } from "next/cache";

import Product from "../models/product.model";
//async actions will always be executed in try catch block

import { connectToDB } from "../mongoose";
import { scrapeAmazonProduct } from "../scaper";
import { getHighestPrice, getLowestPrice, getAveragePrice } from "../utils";

export async function scrapeAndStoreProduct(productUrl: string) {
  if (!productUrl) return;
  try {
    connectToDB();

    const scrapedProduct = await scrapeAmazonProduct(productUrl);

    if (!scrapedProduct) return;

    let product = scrapedProduct;
    const existingProduct = await Product.findOne({ url: scrapedProduct.url });
    if (existingProduct) {
      const updatedPriceHistory: any = [
        ...existingProduct.priceHistory,
        { price: scrapedProduct.currentPrice },
      ];

      product = {
        ...scrapedProduct, ///shallow copy
        priceHistory: updatedPriceHistory,
        lowestPrice: getLowestPrice(updatedPriceHistory),
        highestPrice: getHighestPrice(updatedPriceHistory),
        averagePrice: getAveragePrice(updatedPriceHistory),
      };
    }
    const newProduct = await Product.findOneAndUpdate(
      { url: scrapedProduct.url },
      product,
      { upsert: true, new: true },
    );
    revalidatePath(`/products/${newProduct._id}`);
  } catch (err: any) {
    throw new Error(`Failed to create/update product: ${err.message}`);
  }
}

export async function getProductById(productId: string) {
  try {
    connectToDB();

    const product = await Product.findOne({ _id: productId });
    if (!product) return null;

    return product;
  } catch (err) {
    console.log(err);
  }
}

export async function getAllProducts() {
  try {
    connectToDB();
    const products = await Product.find();
    return products;
  } catch (err) {
    console.log(err);
  }
}

export async function getSimilarProducts(productId: string) {
  try {
    connectToDB();
    const currentProduct = await Product.findById(productId);

    if (!currentProduct) return null;
    const similarProducts = await Product.find({
      _id: { $ne: productId },
    }).limit(3);

    return similarProducts;
  } catch (err) {
    console.log(err);
  }
}

export async function addUserEmailToProduct(productId: string, email: string) {
  try {
    connectToDB();
    const product = await Product.findById(productId);
    if (!productId) return;

    const userExists = product.users.some((user: User) => user.email);
  } catch (e) {
    console.log(e);
  }

  return;
}
