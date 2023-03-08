import httpClient from "../utils/httpClient";
import { useQuery } from "react-query";
import { Count } from "../types/count";

export const useCountProduct = () => {
    return useQuery<Count>("countProduct", async () => {
        const { data } = await httpClient.get("/product/count");
        return data.data;
    });
}

