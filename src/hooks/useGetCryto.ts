import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getAllCryto } from "../services/cryto.service";

export default function useGetCryto() {
  const { data, error, isLoading, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["crypto"],
      queryFn: getAllCryto,
      initialPageParam: 0,
      getNextPageParam: (_, pages) => {
        return pages.length * 25;
      },
    });
  const formattedData = useMemo(() => {
    return data?.pages?.flatMap((page) => page.data) ?? [];
  }, [data]);

  return {
    data: formattedData,
    error,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
  };
}
