import useAsyncFn from "react-use/lib/useAsyncFn";
import { API_URL, API_PREFIX } from "../contants";

const CURRNECIES = ["USD", "EUR", "COP"];

const URL = "/exchange/convert?";

const useExchange = (from: string, to: string, amount: string) => {
  const [state, onClick] = useAsyncFn(async () => {
    if (
      !amount ||
      CURRNECIES.indexOf(to) === -1 ||
      CURRNECIES.indexOf(from) === -1
    ) {
      return;
    }

    try {
      const res = await fetch(
        `${API_URL}${API_PREFIX}${URL}from=${from.toLocaleLowerCase()}&to=${to.toLocaleLowerCase()}&amount=${amount}`
      );
      return await res.json();
    } catch (error) {}
  }, [from, to, amount]);

  return { state, onClick };
};

export default useExchange;
