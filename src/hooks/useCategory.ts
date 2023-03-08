import httpClient from "../utils/httpClient";
import { useQuery } from "react-query";
import { CategoryProduct } from "../types/categoryProduct";

export const useGetCategoryProduct = () => {
    return useQuery<CategoryProduct[]>("getCategoryProduct", async () => {
        const { data } = await httpClient.get("/category/product");
        return data.data;
    });
}

