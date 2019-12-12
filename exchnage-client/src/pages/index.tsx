import * as React from "react";
import Layout from "../components/Layout";
import useExchange from "../libs/useExchange";

const Change = props => (
  <svg viewBox="0 0 24 24" {...props}>
    <defs>
      <path id="prefix__a" d="M0 0h24v24H0V0z" />
    </defs>
    <path
      clipPath="url(#prefix__b)"
      fill="currentColor"
      d="M9.01 14H2v2h7.01v3L13 15l-3.99-4v3zm5.98-1v-3H22V8h-7.01V5L11 9l3.99 4z"
    />
  </svg>
);

function Home() {
  const [amount, setAmount] = React.useState("");

  const [from, setFrom] = React.useState("EUR");

  const [to, setTo] = React.useState("USD");

  const { onClick, state } = useExchange(from, to, amount);

  const change = () => {
    setFrom(to);
    setTo(from);
    setTimeout(() => {
      onClick();
    }, 1000);
  };

  return (
    <Layout>
      <div className="w-full bg-gray-700 border-gray-800 border-2">
        <div className="container my-8 items-center flex flex-col">
          <div className="flex flex-row w-full">
            <div className="relative w-full">
              <label className="block font-semibold mb-2 text-white">
                {from}
              </label>
              <input
                type="text"
                name="from"
                id="from"
                value={amount}
                onChange={e =>
                  setAmount(e.target.value.replace(/^[0-9\b]+$/, ""))
                }
                placeholder="FROM"
                className="h-16 p-4 mb-4 w-full bg-white border-none focus:outline-none rounded-2xl mb-10 shadow-lg overflow-hidden"
              />
            </div>

            <Change
              className="w-24 h-24 cursor-pointer text-white currentColor mx-8"
              onClick={change}
            />

            <div className="relative w-full">
              <label className="block font-semibold mb-2 text-white">
                {to}
              </label>
              <input
                type="text"
                name="to"
                id="to"
                placeholder="TO"
                disabled
                value={state.value ? state.value.exchange : ""}
                className="h-16 p-4 mb-4 w-full bg-white border-none focus:outline-none rounded-2xl mb-10 shadow-lg overflow-hidden"
              />
            </div>
          </div>

          <button
            onClick={onClick}
            className={`bg-blue-500 font-semibold px-5 py-4 text-white h:text-white relative text-base inline-block rounded text-center w-1/4 focus:outline-none ${
              state.loading ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            {state.loading ? "CALCULING" : "CALCULATE"}
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
