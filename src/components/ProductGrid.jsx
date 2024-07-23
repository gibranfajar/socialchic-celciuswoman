import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export const ProductGrid = ({ products }) => {
  const [sortedProducts, setSortedProducts] = useState([...products]);
  const [viewType, setViewType] = useState("tampilan2");
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [sortOption, setSortOption] = useState("");
  const [sortedProductsByPrice, setSortedProductsByPrice] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([...products]);

  const columnPositions = [
    { colStart: 1, colSpan: 6 }, // baris pertama, 2 foto
    { colStart: 7, colSpan: 6 },
    { colStart: 1, colSpan: 4 }, // baris kedua, 3 foto
    { colStart: 5, colSpan: 4 },
    { colStart: 9, colSpan: 4 },
    { colStart: 1, colSpan: 6 }, // baris ketiga, 2 foto
    { colStart: 7, colSpan: 6 },
    { colStart: 1, colSpan: 4 }, // baris keempat, 3 foto
    { colStart: 5, colSpan: 4 },
    { colStart: 9, colSpan: 4 },
    { colStart: 1, colSpan: 4 }, // baris kelima, 3 foto
    { colStart: 5, colSpan: 4 },
    { colStart: 9, colSpan: 4 },
    { colStart: 1, colSpan: 6 }, // baris keenam, 2 foto
    { colStart: 7, colSpan: 6 },
  ];

  const getProductPosition = (index) => {
    const numPositions = columnPositions.length;
    const positionIndex = index % numPositions;
    return columnPositions[positionIndex];
  };

  const handleViewChange = (view) => {
    setViewType(view);
  };

  useEffect(() => {
    const sortedProducts = [...products].sort((a, b) => b.id - a.id);
    setSortedProducts(sortedProducts);
  }, [products]);

  useEffect(() => {
    const filtered = sortedProducts.filter((product) =>
      product.product_name.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchKeyword, sortedProducts]);

  const handleSortChange = (option) => {
    setSortOption(option);
    let sortedProductsCopy = [...sortedProducts];

    if (option === "Price Low to High") {
      sortedProductsCopy.sort((a, b) => a.price - b.price);
    } else if (option === "Price High to Low") {
      sortedProductsCopy.sort((a, b) => b.price - a.price);
    }

    setSortedProductsByPrice(sortedProductsCopy);
  };

  const displayedProducts = sortOption
    ? sortedProductsByPrice
    : filteredProducts;

  function formatRupiah(number) {
    return number.toLocaleString("id-ID");
  }

  return (
    <div className="bg-base-100 text-mono">
      <div className="w-full flex justify-between sticky top-0 bg-white">
        <div className="flex">
          <summary
            className="m-1 btn btn-sm btn-ghost text-xs hover:bg-transparent"
            aria-label="Sort by"
            onClick={() =>
              handleViewChange(
                viewType === "tampilan1" ? "tampilan2" : "tampilan1"
              )
            }
          >
            Switch View
          </summary>
        </div>
        <div className="flex items-center gap-2">
          <form
            action=""
            className="flex gap-2 items-center border-b border-black relative"
            onSubmit={(e) => e.preventDefault()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search"
              className="focus:outline-none flex-grow"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            {searchKeyword && (
              <button
                type="button"
                className="absolute right-0 p-1"
                onClick={() => setSearchKeyword("")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </form>
          <details className="dropdown dropdown-end">
            <summary
              className="m-1 btn btn-sm btn-ghost text-xs hover:bg-transparent"
              aria-label="Sort by"
            >
              Sort by
            </summary>
            <ul className="p-2 text-xs shadow menu dropdown-content z-[1] bg-base-100 w-44">
              <li onClick={() => handleSortChange("Price Low to High")}>
                <a>Price Low to High</a>
              </li>
              <li onClick={() => handleSortChange("Price High to Low")}>
                <a>Price High to Low</a>
              </li>
            </ul>
          </details>
        </div>
      </div>

      {/* Tampilan 1 */}
      {viewType === "tampilan1" && (
        <>
          <div className="grid-template grid grid-cols-2 lg:grid-cols-3 gap-1 mx-1">
            {displayedProducts.map((product) => (
              <div
                key={product.id}
                className="mb-5"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <Link
                  to={`/product/${product.product_slug}/${product.article_name}`}
                >
                  <img
                    alt={product.product_name}
                    src={
                      hoveredProduct === product.id
                        ? import.meta.env.VITE_IMG_STORAGE + product.image2
                        : import.meta.env.VITE_IMG_STORAGE + product.image1
                    }
                    loading="eager"
                  />
                  <div className="text-xs text-mono">
                    <p>{product.product_name}</p>
                    {product.price_disc !== 0 ? (
                      <>
                        <span className="opacity-30 line-through pr-2">
                          IDR {formatRupiah(product.price)}
                        </span>
                        <span>IDR {formatRupiah(product.price_discount)}</span>
                      </>
                    ) : (
                      <span>IDR {formatRupiah(product.price)}</span>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Tampilan 2 */}
      {viewType === "tampilan2" && (
        <div className="grid-template grid grid-cols-12 gap-2">
          {displayedProducts.map((product, index) => (
            <div
              key={product.id}
              className={`mb-5`}
              style={{
                gridColumn: `${getProductPosition(index).colStart} / span ${
                  getProductPosition(index).colSpan
                }`,
              }}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <Link
                to={`/product/${product.product_slug}/${product.article_name}`}
              >
                <img
                  alt={product.product_name}
                  width={762}
                  height={1100}
                  src={
                    hoveredProduct === product.id
                      ? import.meta.env.VITE_IMG_STORAGE + product.image2
                      : import.meta.env.VITE_IMG_STORAGE + product.image1
                  }
                />
                <div className="text-xs text-mono">
                  <p>{product.product_name}</p>
                  {product.price_disc !== 0 ? (
                    <>
                      <span className="opacity-30 line-through pr-2">
                        IDR {formatRupiah(product.price)}
                      </span>
                      <span>IDR {formatRupiah(product.price_disc)}</span>
                    </>
                  ) : (
                    <span>IDR {formatRupiah(product.price)}</span>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
