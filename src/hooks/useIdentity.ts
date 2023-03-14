import httpClient from "../utils/httpClient";
import { useQuery, useMutation } from "react-query";
import { queryClient } from "../utils/queryClient";
import { Identity } from "../types/identity";

export const useGetPendingIdentity = () => {
    return useQuery<Identity[]>("getPendingIdentity", async () => {
        const { data } = await httpClient.get("/identity/admin");
        return data.data;
    });
}

export const useUpdateIdentity = () => {
    return useMutation(async ({
        userId,
        status,
        issue
    }: {
        userId: number,
        status: string,
        issue?: string
    }) => {
        const { data } = await httpClient.patch(`/identity/admin`, {
            userId: userId,
            status: status,
            issue: issue
        });
        console.log(data);
        return data.data;
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries("getPendingIdentity");
        }
    });
};