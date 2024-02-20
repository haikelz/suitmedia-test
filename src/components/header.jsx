import { MenuIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useScroll } from "../hooks";
import { tw } from "../lib/helpers";

const linksList = [
  {
    id: 1,
    name: "Work",
    route: "/work",
  },
  {
    id: 2,
    name: "About",
    route: "/about",
  },
  {
    id: 3,
    name: "Services",
    route: "/services",
  },
  {
    id: 4,
    name: "Ideas",
    route: "/ideas",
  },
  {
    id: 5,
    name: "Careers",
    route: "/careers",
  },
  {
    id: 6,
    name: "Contact",
    route: "/contact",
  },
];

export default function Header() {
  const { show, scroll } = useScroll();

  const location = useLocation();

  return (
    <>
      {show ? (
        <header
          className={tw(
            "w-full flex px-4 justify-center items-center fixed top-0 backdrop-blur-md z-[99999]",
            scroll > 0 ? "bg-orange-600/80" : "bg-orange-600"
          )}
        >
          <nav className="max-w-6xl w-full">
            <div className="py-4 w-full flex justify-between items-center">
              <Link to="/">
                <img
                  src="/images/logo.png"
                  alt="suitmedia logo"
                  className="h-[50px]"
                />
              </Link>
              <ul className="space-x-5 justify-center hidden md:flex items-center text-white">
                {linksList.map((item) => (
                  <li
                    key={item.id}
                    className={tw(
                      location.pathname === item.route
                        ? "font-semibold underline decoration-solid decoration-4 underline-offset-8"
                        : ""
                    )}
                  >
                    <Link to={item.route}>{item.name}</Link>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                aria-label="open menu"
                className="block md:hidden"
              >
                <MenuIcon color="white" />
              </button>
            </div>
          </nav>
        </header>
      ) : null}
    </>
  );
}
