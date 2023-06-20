import httpClient from "../utils/httpClient";
import { useMutation, useQuery } from "react-query";
import { queryClient } from "../utils/queryClient";
import { Report } from "../types/report";

export const useGetReports = () => {
    return useQuery<Report[]>("getReports", async () => {
        const { data } = await httpClient.get("/report/admin");
        return data.data;
    });
}

export const useCloseReport = () => {
    return useMutation(({
        userId,
        productId
    }: { userId: number, productId: number }) => httpClient.patch('/report/admin', {
        userId: userId,
        productId: productId,
        isClosed: true
    }), {
        onSuccess: () => {
            queryClient.invalidateQueries("getReports");
        }
    });
}