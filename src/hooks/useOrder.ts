import httpClient from "../utils/httpClient";
import { useQuery } from "react-query";
import { Count } from "../types/count";

export const useCountOrder = () => {
    return useQuery<Count>("countOrder", async () => {
        const { data } = await httpClient.get("/order/count");
        return data.data;
    });
}

