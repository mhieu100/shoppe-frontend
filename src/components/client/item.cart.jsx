import { DeleteOutlined } from '@ant-design/icons';
import React from 'react';
import { useDispatch } from 'react-redux';
import { cartApi } from '../../service/api.cart';
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from '../../redux/slice/cartSlice';

const ItemCard = ({ item }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      const response = await cartApi.removeFromCart(item.id);
      if (response.status === 200) {
        dispatch(removeFromCart(item.id));
      }
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const handleIncrease = async () => {
    if (item.quantity >= item.stockQuantity) return;
    try {
      const response = await cartApi.increaseQuantity(item.id);
      if (response.status === 200) {
        dispatch(incrementQuantity(item.id));
      }
    } catch (error) {
      console.error('Error increasing quantity:', error);
    }
  };

  const handleDecrease = async () => {
    if (item.quantity <= 1) return;
    try {
      const response = await cartApi.decreaseQuantity(item.id);
      if (response.status === 200) {
        dispatch(decrementQuantity(item.id));
      }
    } catch (error) {
      console.error('Error decreasing quantity:', error);
    }
  };

  return (
    <div className="w-full grid grid-cols-5 mb-4 border py-2">
      <div className="flex col-span-5 mdl:col-span-2 items-center gap-4 ml-4">
        <DeleteOutlined
          onClick={handleDelete}
          className="text-primeColor hover:text-red-500 duration-300 cursor-pointer"
        />
        <img className="w-32 h-32" src={item.imageUrl} alt="productImage" />
        <h1 className="font-titleFont font-semibold">{item.productName}</h1>
      </div>
      <div className="col-span-5 mdl:col-span-3 flex items-center justify-between py-4 mdl:py-0 px-4 mdl:px-0 gap-6 mdl:gap-0">
        <div className="flex w-1/3 items-center text-lg font-semibold">
          ${item.price}
        </div>
        <div className="w-1/3 flex items-center gap-6 text-lg">
          <span
            onClick={handleDecrease}
            className={`w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center ${
              item.quantity <= 1
                ? 'cursor-not-allowed opacity-50'
                : 'hover:bg-gray-300 cursor-pointer'
            } duration-300 border-[1px] border-gray-300 hover:border-gray-300`}
          >
            -
          </span>
          <p>{item.quantity}</p>
          <span
            onClick={handleIncrease}
            className={`w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center ${
              item.quantity >= item.stockQuantity
                ? 'cursor-not-allowed opacity-50'
                : 'hover:bg-gray-300 cursor-pointer'
            } duration-300 border-[1px] border-gray-300 hover:border-gray-300`}
          >
            +
          </span>
        </div>
        <div className="w-1/3 flex items-center font-titleFont font-bold text-lg">
          <p>${item.quantity * item.price}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
