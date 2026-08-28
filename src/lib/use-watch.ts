import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";

import {
  completeTask,
  getFeed,
  getTaskDetail,
  getWalletOverview,
  getWithdrawals,
  requestWithdrawal,
  startTask,
} from "@/lib/watch.functions";
import { getMyAccount } from "@/lib/account.functions";

export function useAccount() {
  const fn = useServerFn(getMyAccount);
  return useQuery({
    queryKey: ["we", "account"],
    staleTime: 60_000,
    placeholderData: keepPreviousData,
    queryFn: () => fn(),
  });
}

export function useFeed() {
  const fn = useServerFn(getFeed);
  return useQuery({
    queryKey: ["we", "feed"],
    staleTime: 60_000,
    placeholderData: keepPreviousData,
    queryFn: () => fn(),
  });
}

export function useWalletOverview() {
  const fn = useServerFn(getWalletOverview);
  return useQuery({
    queryKey: ["we", "wallet"],
    staleTime: 30_000,
    placeholderData: keepPreviousData,
    queryFn: () => fn(),
  });
}

export function useTaskDetail(taskId: string) {
  const fn = useServerFn(getTaskDetail);
  return useQuery({
    queryKey: ["we", "task", taskId],
    staleTime: 30_000,
    queryFn: () => fn({ data: { taskId } }),
  });
}

export function useStartTask() {
  const fn = useServerFn(startTask);
  return useMutation({
    mutationFn: (taskId: string) => fn({ data: { taskId } }),
  });
}

export function useCompleteTask() {
  const fn = useServerFn(completeTask);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: { taskId: string; sessionId: string }) => fn({ data: input }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["we"] });
    },
  });
}

export function useWithdrawals() {
  const fn = useServerFn(getWithdrawals);
  return useQuery({
    queryKey: ["we", "withdrawals"],
    staleTime: 30_000,
    placeholderData: keepPreviousData,
    queryFn: () => fn(),
  });
}

export function useRequestWithdrawal() {
  const fn = useServerFn(requestWithdrawal);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: {
      coins: number;
      accountNumber: string;
      ifscCode: string;
      holderName: string;
    }) => fn({ data: input }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["we"] });
    },
  });
}
