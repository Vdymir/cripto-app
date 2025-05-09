import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { ICryto } from "../interfaces/cryto.interface";
import { getAllCryto } from "../services/cryto.service";

export default function useGetTopFive() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["top"],
    queryFn: () => getAllCryto({ pageParam: 0, limit: 5 }),
  });
  const crypto: ICryto[] = useMemo(() => data?.data ?? [], [data]);

  return {
    data: crypto,
    error,
    isLoading,
  };
}
