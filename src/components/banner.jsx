import { useLocation } from "react-router-dom";
import { tw } from "../lib/helpers";

export default function Banner() {
  const location = useLocation();

  const pathname = location.pathname.replace("/", "");
  const title =
    location.pathname === "/"
      ? "Home"
      : pathname[0].toUpperCase() + pathname.slice(1);

  return (
    <section
      className={tw(
        "overflow-y-scroll banner flex bg-fixed bg-cover justify-center",
        "items-center relative w-full bg-banner md:h-[500px]"
      )}
    >
      <div className="absolute text-center text-white bg-fixed">
        <h2 className="font-semibold text-4xl">{title}</h2>
        <p className="text-lg font-medium">Where all our great things begin</p>
      </div>
    </section>
  );
}
