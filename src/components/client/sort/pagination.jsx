import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import Product from '../products/product';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../../redux/slice/productSlice';

function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
          <div key={item.id} className="w-full">
            <Product
              _id={item.id}
              img={item.images?.[0]?.url || 'https://via.placeholder.com/150'} // Get first image or fallback
              productName={item.name}
              price={item.price}
              stockQuantity={item.stockQuantity}
              color="N/A" // Since color is not in API data
              badge={false} // Since badge is not in API data
              des={item.descriptions}
              category={item.category}
            />
          </div>
        ))}
    </>
  );
}

const Pagination = ({ itemsPerPage }) => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.product);
  const [itemOffset, setItemOffset] = useState(0);
  const [itemStart, setItemStart] = useState(1);

  // Initial data fetch
  useEffect(() => {
    dispatch(
      fetchProducts({
        current: 1,
        pageSize: itemsPerPage,
      })
    );
  }, [dispatch, itemsPerPage]);

  const items = products?.result || [];
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
    setItemStart(newOffset);

    // Fetch new page data
    dispatch(
      fetchProducts({
        current: event.selected + 1,
        pageSize: itemsPerPage,
      })
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10">
        <Items currentItems={currentItems} />
      </div>
      <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center">
        <ReactPaginate
          nextLabel=""
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel=""
          pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
          pageClassName="mr-6"
          containerClassName="flex text-base font-semibold font-titleFont py-10"
          activeClassName="bg-black text-white"
        />

        <p className="text-base font-normal text-lightText">
          Products from {itemStart === 0 ? 1 : itemStart} to {endOffset} of{' '}
          {items.length}
        </p>
      </div>
    </div>
  );
};

export default Pagination;
