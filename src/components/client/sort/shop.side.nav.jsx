import React from "react";
import Category from "./category";
import Color from "./color";
import Brand from "./brand";
import Price from "./price";


const ShopSideNav = () => {
  return (
    <div className="w-full flex flex-col gap-6">
      <Category icons={false} />
      <Color />
      <Brand />
      <Price />
    </div>
  );
};

export default ShopSideNav;
