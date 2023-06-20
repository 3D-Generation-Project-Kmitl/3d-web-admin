import httpClient from "../utils/httpClient";
import { useQuery, useMutation } from "react-query";
import { Count } from "../types/count";
import { UserIdentity } from "../types/userIdentity";
import { queryClient } from "../utils/queryClient";
export const useCountUser = () => {
    return useQuery<Count>("countUser", async () => {
        const { data } = await httpClient.get("/user/count");
        return data.data;
    });
}

export const useGetUsers = () => {
    return useQuery<UserIdentity[]>("getUsers", async () => {
        const { data } = await httpClient.get("/user/admin");
        return data.data;
    });
}

export const useBanUser = () => {
    return useMutation(async ({
        userId,
    }: {
        userId: number,
    }) => {
        const { data } = await httpClient.patch(`/user/admin/ban`, {
            userId: userId,
        });
        return data.data;
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries("getUsers");
        }
    });
}

export const useUnBanUser = () => {
    return useMutation(async ({
        userId,
    }: {
        userId: number,
    }) => {
        const { data } = await httpClient.patch(`/user/admin/unBan`, {
            userId: userId,
        });
        return data.data;
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries("getUsers");
        }
    });
}



