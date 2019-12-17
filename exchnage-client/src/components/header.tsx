import Link from "./Link";
import { useUserState } from "../libs/user";

const LIST_GENERAL = [
  {
    route: "/",
    name: "Exchange",
    alt: "Home icon"
  },
  {
    route: "/login",
    name: "Login",
    alt: "Blog icon"
  },
  {
    route: "/register",
    name: "Register",
    alt: "Resources icon"
  },
  {
    route: "/",
    name: "Services",
    alt: "Services icon"
  }
];

const LIST = [
  {
    route: "/",
    name: "Exchange",
    alt: "Home icon"
  },
  {
    route: "/",
    name: "Services",
    alt: "Services icon"
  }
];

function Header() {
  const user = useUserState();

  const list = user.isAuth ? LIST : LIST_GENERAL;

  return (
    <header className="flex">
      <nav className="w-full py-4 sm:py-6 border-b-2 sm:border-0 border-gray-200 sm:shadow-md">
        <img
          className="h-32  w-48 mx-auto rounded-full object-contain"
          src="/logo.png"
          alt="Company logo"
        />

        <ul className="flex flex-col sm:flex-row sm:justify-center mt-4 list-none">
          {list.map(({ route, name, alt }) => (
            <li
              className="flex justify-center items-center mt-2 sm:mx-4 md:mx-6"
              key={name}
            >
              <Link href={route}>
                <p className="pl-2 font-thin text-gray-700 cursor-pointer hover:text-gray-500">
                  {name}
                </p>
              </Link>
            </li>
          ))}
          {user.isAuth && (
            <li className="flex justify-center items-center mt-2 sm:mx-4 md:mx-6">
              <p className="pl-2 font-thin text-gray-700 cursor-pointer hover:text-gray-500">
                Logout
              </p>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
