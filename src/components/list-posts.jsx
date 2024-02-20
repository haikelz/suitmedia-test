import { ofetch } from "ofetch";
import { useEffect, useState } from "react";
import { toIdDate, tw } from "../lib/helpers";
import { API_URL } from "../lib/utils/constants";
import Pagination from "./pagination";
import { Image } from "./ui";

export default function ListPosts() {
  const [posts, setPosts] = useState([]);
  const [totalPageNumber, setTotalPageNumber] = useState(
    Number(localStorage.getItem("total-page-number")) || 10
  );

  const [postsPerPage, setPostsPerPage] = useState(
    Number(localStorage.getItem("posts-per-page")) || 10
  );
  const [pageNumber, setPageNumber] = useState(
    Number(localStorage.getItem("page-number")) || 1
  );
  const [sortBy, setSortBy] = useState(
    localStorage.getItem("sort-by") || "Newest"
  );

  const pageNumbersList = new Array(totalPageNumber)
    .fill(null)
    .map((_, index) => index + 1);

  // load posts-per-page, page-number, and sort-by value from localStorage
  // instead of this, saya bisa langsung masukin value localStorage nya langsung sebagai nilai awal
  /*useEffect(() => {
    if (localStorage.getItem("posts-per-page")) {
      setPostsPerPage(Number(localStorage.getItem("posts-per-page")));
    }

    if (localStorage.getItem("page-number")) {
      setPageNumber(Number(localStorage.getItem("page-number")));
    }

    if (localStorage.getItem("sort-by")) {
      setSortBy(localStorage.getItem("sort-by"));
    }
  }, [setPostsPerPage, setPageNumber, setSortBy]);*/

  // fetch data

  useEffect(() => {
    /* Ngefetch data
     * - Kenapa pakai try catch? Karena functionnya dibuat async, jadi lebih cocok pakai try catch ketimbang .then((res) => res.json() ).catch((err) => console.log(err))
     * - Setelah lancar proses fetching data, kemudian akan dimasukkan ke dalam state posts
     */
    async function getPostsList() {
      try {
        const response = await ofetch(
          `${API_URL}?page[number]=${pageNumber}&page[size]=${postsPerPage}&append[]=small_image&append[]=medium_image&sort=-published_at`,
          {
            method: "GET",
            responseType: "json",
            parseResponse: JSON.parse,
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        setPosts(response.data);
      } catch (err) {
        console.error(err);
      }
    }

    getPostsList();
  }, [setPosts, pageNumber, postsPerPage]);

  // buat ngesort data berdasarkan terbaru dan terlama
  const sortedPosts = posts.sort((a, b) => {
    if (sortBy === "Newest")
      return new Date(b.published_at) - new Date(a.published_at);
    if (sortBy === "Oldest")
      return new Date(a.published_at) - new Date(b.published_at);
  });

  // handle sort posts
  function handleSortBy(e) {
    localStorage.setItem("sort-by", e.target.value);
    setSortBy(e.target.value);
  }

  // handle posts per page
  function handlePostsPerPage(e) {
    localStorage.setItem("posts-per-page", e.target.value);
    setPostsPerPage(e.target.value);

    const totalPage = Math.ceil(100 / Number(e.target.value));

    localStorage.setItem("total-page-number", totalPage);
    setTotalPageNumber(Math.ceil(100 / totalPage));
  }

  // handle page number pagination
  function handleClickPageNumber(item) {
    localStorage.setItem("page-number", item);
    setPageNumber(item);
  }

  return (
    <section className="px-4 w-full flex justify-center items-center">
      <div className="max-w-6xl mt-20 w-full">
        <div className="w-full flex justify-center items-center flex-col">
          <div className="w-full mb-10 md:flex hidden justify-between items-center">
            <span className="text-black">
              Showing{" "}
              {pageNumber === 1
                ? 1
                : postsPerPage * pageNumber - (postsPerPage - 1)}
              -{postsPerPage * pageNumber} of 100
            </span>
            <div className="flex space-x-4 items-center">
              <div className="flex space-x-3">
                <span>Show per page</span>
                <select
                  value={postsPerPage}
                  onChange={handlePostsPerPage}
                  className={tw(
                    "bg-gray-50 w-34 px-2.5 select-qori border border-gray-300",
                    "font-medium rounded-lg",
                    "focus:ring-blue-500 focus:border-blue-500 block"
                  )}
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>
              <div className="flex space-x-3 items-center">
                <span>Sort by:</span>
                <select
                  value={sortBy}
                  onChange={handleSortBy}
                  className={tw(
                    "bg-gray-50 w-34 px-2.5 select-qori border border-gray-300",
                    "font-medium rounded-lg",
                    "focus:ring-blue-500 focus:border-blue-500 block"
                  )}
                >
                  <option value="Newest">Newest</option>
                  <option value="Oldest">Oldest</option>
                </select>
              </div>
            </div>
          </div>
          {posts.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 grid-rows-1">
              {sortedPosts.map((item) => (
                <div
                  className="rounded-md overflow-hidden drop-shadow-lg bg-white"
                  key={item.id}
                >
                  <Image
                    src={
                      item.medium_image[0].url ??
                      "https://placehold.co/600x400?text=No+Image"
                    }
                    alt="image"
                  />
                  <div className="mt-2 p-3">
                    <span className="text-gray-500">
                      {toIdDate(item.published_at)}
                    </span>
                    <a href={`/posts/${item.slug}`}>
                      <h4 className="text-gray-900 text-xl font-semibold line-clamp-3">
                        {item.title}
                      </h4>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center font-bold text-xl mt-6">
              Tidak ada data!
            </p>
          )}
          <Pagination
            pageNumber={pageNumber}
            handleClickPageNumber={handleClickPageNumber}
            pageNumbersList={pageNumbersList}
            setPageNumber={setPageNumber}
          />
        </div>
      </div>
    </section>
  );
}
