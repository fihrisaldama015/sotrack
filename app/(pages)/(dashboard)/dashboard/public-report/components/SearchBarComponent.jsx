import Search from "@mui/icons-material/Search";
import Stack from "@mui/material/Stack";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const SearchBar = () => {
  const [searchParams, setSearchParams] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const s_params = useSearchParams();

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(s_params);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    let timerId;

    const onSubmit = () => {
      router.push(
        pathname + "?" + createQueryString("search", `${searchParams}`)
      );
    };

    // Debounce function to delay search submission
    const debounceSearchSubmit = () => {
      clearTimeout(timerId);
      timerId = setTimeout(onSubmit, 500); // Adjust delay time as needed
    };

    // Call debounce function when searchTerm changes
    if (searchParams.trim() !== null) {
      debounceSearchSubmit();
    }
    // Clear timer on component unmount
    return () => clearTimeout(timerId);
  }, [searchParams]);

  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      spacing={0.5}
      className="flex-1 lg:w-1/3 h-fit rounded-[20px] ring-1 bg-white ring-[#F0F0F0] hover:ring-slate-400 transition-all pl-4 py-1 pr-4 cursor-pointer "
    >
      <Search sx={{ width: 18 }} />
      <form className="w-full" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Search"
          className="py-2 w-full border-none focus:outline-none text-[rgb(0,0,0,0.7)] text-base font-semibold"
          value={searchParams}
          onChange={(e) => setSearchParams(e.target.value)}
        />
        <input type="submit" hidden />
      </form>
    </Stack>
  );
};

export default SearchBar;
