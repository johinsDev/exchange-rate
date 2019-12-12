import React from "react";
import Link from "next/link";

const SECTIONS = [
  {
    name: "LINKS",
    options: [
      { optionName: "FAQ", route: "#" },
      { optionName: "Help", route: "#" },
      { optionName: "Support", route: "#" }
    ]
  },
  {
    name: "LEGAL",
    options: [
      { optionName: "Terms", route: "#" },
      { optionName: "Privacy", route: "#" }
    ]
  },
  {
    name: "SOCIAL",
    options: [
      { optionName: "Facebook", route: "#" },
      { optionName: "LinkedIn", route: "#" },
      { optionName: "Twitter", route: "#" }
    ]
  }
];

const Footer = () => {
  return (
    <footer className="bg-gray-700">
      <div className="container mx-auto py-10">
        <div className="flex flex-wrap">
          {SECTIONS.map(({ name, options }) => (
            <div key={name} className="w-1/4 text-center md:text-left">
              <h5 className="uppercase mb-6 font-bold text-white">{name}</h5>

              <ul className="mb-4">
                {options.map(({ optionName, route }) => (
                  <li key={optionName} className="mt-2">
                    <Link href={route}>
                      <p className="hover:underline text-gray-600 hover:text-orange-500">
                        {optionName}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="w-1/4 text-center md:text-left">
            <h5 className="uppercase mb-6 font-bold text-white text-uppercase">
              partners
            </h5>

            <div className="flex">
              <img
                src="partners/belatrix.jpg"
                alt="belatrix"
                className="w-12 h-12 mr-4"
              />

              <img
                src="partners/globant.jpg"
                alt="globant"
                className="w-12 h-12 mr-4"
              />

              <img
                src="partners/react.png"
                alt="react"
                className="w-12 h-12 mr-4 bg-white"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
