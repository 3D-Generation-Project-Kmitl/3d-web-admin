import httpClient from "../utils/httpClient";
import { useMutation, useQuery } from "react-query";
import { Count } from "../types/count";
import { queryClient } from "../utils/queryClient";
import { Product } from "../types/product";

export const useCountProduct = () => {
    return useQuery<Count>("countProduct", async () => {
        const { data } = await httpClient.get("/product/count");
        return data.data;
    });
}

export const useGetProducts = () => {
    return useQuery<Product[]>("getProducts", async () => {
        const { data } = await httpClient.get("/product/admin");
        return data.data;
    });
}

export const useUpdateStatusProduct = () => {
    return useMutation(({
        productId,
        status
    }: { productId: number, status: string }) => httpClient.patch('/product/admin', {
        productId: productId,
        status: status
    }), {
        onSuccess: () => {
            queryClient.invalidateQueries("getProducts");
        }
    });
}

