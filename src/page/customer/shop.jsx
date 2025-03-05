import { useState } from "react";
import Breadcrumbs from "../../components/client/props/breadcrumbs";
import ShopSideNav from "../../components/client/sort/shop.side.nav";
import ProductBanner from "../../components/client/sort/product.banner";
import Pagination from "../../components/client/sort/pagination";

const ShopPage = () => {
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const itemsPerPageFromBanner = (itemsPerPage) => {
      setItemsPerPage(itemsPerPage);
    };
  
    return (
      <div className="max-w-container mx-auto px-4">
        <Breadcrumbs title="Products" />
        {/* ================= Products Start here =================== */}
        <div className="w-full h-full flex pb-20 gap-10">
          <div className="w-[20%] lgl:w-[25%] hidden mdl:inline-flex h-full">
            <ShopSideNav />
          </div>
          <div className="w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10">
            <ProductBanner itemsPerPageFromBanner={itemsPerPageFromBanner} />
            <Pagination itemsPerPage={itemsPerPage} />
          </div>
        </div>
        {/* ================= Products End here ===================== */}
      </div>
    );
  };
  
  export default ShopPage;
  