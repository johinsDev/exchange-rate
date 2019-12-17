import * as React from "react";
import Layout from "../components/Layout";
import useExchange from "../libs/useExchange";
import useDebounce from "react-use/lib/useDebounce";
import Input from "../components/Input";
import Button from "../components/Button";
import { API_URL, API_PREFIX } from "../contants";
import useAsyncFn from "react-use/lib/useAsync";
import { useRouter } from "next/router";
import { useUserDispatch } from "../libs/user";

const from = "USD";

const to = "EUR";

function Home() {
  const [amount, setAmount] = React.useState("");

  const { onClick, state } = useExchange(from, to, amount);

  useDebounce(
    () => {
      onClick();
    },
    500,
    [amount]
  );

  return (
    <Layout>
      <div className="w-full bg-gray-700 border-gray-800 border-2">
        <div className="container my-8 items-center flex flex-col">
          <div className="flex flex-row w-full">
            <Input
              label={from}
              type="number"
              name="from"
              id="from"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="FROM"
            />

            <div className="w-full ml-12">
              <Input
                type="text"
                name="to"
                id="to"
                placeholder="TO"
                disabled
                value={state.value ? state.value.exchange : ""}
                label={to}
              />
            </div>
          </div>

          <Button label="CALCULATE" loading={state.loading} onClick={onClick} />
        </div>
      </div>
    </Layout>
  );
}

export default () => {
  const { replace } = useRouter();

  const dispatch = useUserDispatch();

  const { value, loading } = useAsyncFn(async () => {
    try {
      const res = await fetch(`${API_URL}${API_PREFIX}/auth/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      const json = await res.json();

      dispatch({ type: "add_user", payload: json });
      return json;
    } catch (error) {}
  });

  if (loading) {
    // LOADING SCREEN
    return (
      <Layout>
        <h1>LOADING ...</h1>
      </Layout>
    );
  }

  if (value.error) {
    replace("/login");
  }

  return <Home />;
};
