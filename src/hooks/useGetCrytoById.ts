import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { ICryto } from "../interfaces/cryto.interface";
import { getCrytoById } from "../services/cryto.service";

export default function useGetCrytoById(id: string) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["crypto", id],
    queryFn: () => getCrytoById(id),
  });
  const crypto: ICryto = useMemo(() => data?.[0] ?? ({} as ICryto), [data]);
  return {
    data: crypto,
    error,
    isLoading,
  };
}
