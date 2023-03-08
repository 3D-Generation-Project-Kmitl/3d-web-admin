import httpClient from "../utils/httpClient";
import { useQuery } from "react-query";
import { Transaction } from "../types/transaction";

export const useGetTransaction = () => {
    return useQuery<Transaction[]>("getTransaction", async () => {
        const { data } = await httpClient.get("/wallet/all");
        return data.data;
    });
}
