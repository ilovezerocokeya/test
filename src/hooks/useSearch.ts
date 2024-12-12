import { useSearchParams, useRouter } from "next/navigation";
import { FormEvent, useState, useEffect, useCallback } from "react";

const useSearch = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    const searchParam = searchParams.get("search") || "";
    setSearchWord(searchParam);
  }, [searchParams]);

  const handleSearch = useCallback(
    (evt: FormEvent<HTMLFormElement>) => {
      evt.preventDefault();
      router.push(`?search=${encodeURIComponent(searchWord)}`);
    },
    [searchWord, router],
  );

  return { searchWord, setSearchWord, handleSearch };
};

export default useSearch;
