import { useState } from "react";
import Layout from "../components/Layout";
import Input from "../components/Input";
import Button from "../components/Button";
import useAsyncFn from "react-use/lib/useAsyncFn";
import { API_URL, API_PREFIX } from "../contants";
import { useRouter } from "next/router";
import useAsync from "react-use/lib/useAsync";

function Register() {
  const [password, setPassword] = useState("123456");

  const [email, setEmail] = useState("johinsdev8@gmail.com");

  const { push } = useRouter();

  const [{ loading }, onClick] = useAsyncFn(async () => {
    try {
      const res = await fetch(`${API_URL}${API_PREFIX}/auth/signin`, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          password,
          email
        })
      });
      const json = await res.json();

      localStorage.setItem("token", json.token);

      push("/");
      return json;
    } catch (error) {
      throw error;
    }
  }, [password, email]);

  return (
    <Layout>
      <div className="w-full h-full bg-gray-600">
        <div className="mx-auto w-4/12 my-8 items-center flex flex-col">
          <Input
            type="text"
            name="email"
            id="email"
            placeholder="e-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            label="E-mail"
          />

          <Input
            type="password"
            name="password"
            id="password"
            placeholder="********"
            value={password}
            onChange={e => setPassword(e.target.value)}
            label="Password"
          />

          <Button label="SIGN IN" onClick={onClick} loading={loading} />
        </div>
      </div>
    </Layout>
  );
}

export default () => {
  const { replace } = useRouter();

  const { value, loading } = useAsync(async () => {
    try {
      const res = await fetch(`${API_URL}${API_PREFIX}/auth/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      const json = await res.json();

      replace("/");

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

  return <Register />;
};
