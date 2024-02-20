import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";
import { tw } from "../lib/helpers";

export default function Pagination({
  pageNumber,
  pageNumbersList,
  handleClickPageNumber,
  setPageNumber,
}) {
  return (
    <div className="space-x-6 mt-20 hidden md:flex-wrap md:flex">
      <button
        type="button"
        aria-label="two previous"
        onClick={() =>
          setPageNumber(pageNumber <= 2 ? pageNumber : pageNumber - 2)
        }
      >
        <ChevronsLeftIcon
          className={tw(pageNumber <= 2 ? "text-gray-300" : "")}
        />
      </button>
      <button
        type="button"
        aria-label="previous"
        onClick={() =>
          setPageNumber(pageNumber <= 1 ? pageNumber : pageNumber - 1)
        }
      >
        <ChevronLeftIcon
          className={tw(pageNumber <= 1 ? "text-gray-300" : "")}
        />
      </button>
      {pageNumbersList.map((item) => (
        <button
          type="button"
          aria-label="show per page"
          onClick={() => handleClickPageNumber(item)}
          className={tw(
            "p-4 rounded-md",
            pageNumber === item ? "bg-orange-500 text-white" : ""
          )}
          key={item}
        >
          {item}
        </button>
      ))}
      <>
        <button
          type="button"
          aria-label="next"
          onClick={() =>
            setPageNumber(
              pageNumber >= pageNumbersList.length
                ? pageNumbersList.length
                : pageNumber + 1
            )
          }
        >
          <ChevronRightIcon
            className={tw(
              pageNumber >= pageNumbersList.length ? "text-gray-300" : ""
            )}
          />
        </button>
        <button
          type="button"
          aria-label="two next"
          onClick={() =>
            setPageNumber(
              pageNumber >= pageNumbersList.length - 1
                ? pageNumbersList.length
                : pageNumber + 2
            )
          }
        >
          <ChevronsRightIcon
            className={tw(
              pageNumber >= pageNumbersList.length - 1 ? "text-gray-300" : ""
            )}
          />
        </button>
      </>
    </div>
  );
}
