import httpClient from "../utils/httpClient";
import { useQuery } from "react-query";
import { Count } from "../types/count";

export const useCountUser = () => {
    return useQuery<Count>("countUser", async () => {
        const { data } = await httpClient.get("/user/count");
        return data.data;
    });
}

