import httpClient from "../utils/httpClient";
import { useMutation, useQuery } from "react-query";
import { Transaction } from "../types/transaction";
import { WithdrawTransaction } from "../types/withdrawTransaction";
import { queryClient } from "../utils/queryClient";

export const useGetTransaction = () => {
    return useQuery<Transaction[]>("getTransaction", async () => {
        const { data } = await httpClient.get("/wallet/all");
        return data.data;
    });
}

export const useGetWithdrawTransaction = () => {
    return useQuery<WithdrawTransaction[]>("getWithdrawTransaction", async () => {
        const { data } = await httpClient.get("/wallet/admin");
        return data.data;
    });
}

export const useAcceptWithdrawTransaction = () => {
    return useMutation(async ({
        walletTransactionId,
        evidence
    }: {
        walletTransactionId: number,
        evidence: File
    }) => {
        const formData = new FormData();
        formData.append("walletTransactionId", walletTransactionId.toString());
        formData.append("status", "APPROVED");
        formData.append("evidence", evidence);
        const { data } = await httpClient.patch(`/wallet/admin`, formData);
        return data.data;
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries("getWithdrawTransaction");
        }
    });
}

export const useRejectWithdrawTransaction = () => {
    return useMutation(async ({
        walletTransactionId,

    }: {
        walletTransactionId: number,
    }) => {
        const formData = new FormData();
        formData.append("walletTransactionId", walletTransactionId.toString());
        formData.append("status", "REJECTED");
        const { data } = await httpClient.patch(`/wallet/admin`, formData);
        return data.data;
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries("getWithdrawTransaction");
        }
    });
}
