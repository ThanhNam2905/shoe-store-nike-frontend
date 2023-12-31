import React, { useMemo, useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import Wrapper from '@/components/Wrapper';
import CartItems from '@/components/CartItems';
import { useSelector } from 'react-redux'
import { BsCurrencyDollar } from 'react-icons/bs';

import {loadStripe} from '@stripe/stripe-js';
import { makePaymentRequest } from '@/utils/api';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CartPage = () => {
    const { cartItems } = useSelector((state) => state.cart);

    const subTotalPrice = useMemo(() => {
        return cartItems.reduce((total, item) => total + item.totalPriceCartItem, 0);
    }, [cartItems]);

    const subTotalQuantity = useMemo(() => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    }, [cartItems]);

    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        try {
            setLoading(true);
            const stripe = await stripePromise;
            const res = await makePaymentRequest("/api/orders", {
                products: cartItems,
            });
            await stripe.redirectToCheckout({
                sessionId: res.stripeSession.id,
            });
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    return (
        <div className='w-full md:my-20'>
            <Wrapper>
                {/* Heading start */}
                <div className="text-center max-w-[800px] mx-auto mt-10 md:mt-0">
                    <h3 className="text-[28px] md:text-[34px] font-semibold mb-5 md:mb-7 leading-tight capitalize">Shopping cart</h3>
                </div>
                {/* Heading end */}

                { cartItems.length > 0 ? (
                    <>
                        {/* Cart content start */}
                        <div className='flex flex-col md:flex-row gap-12 md:py-10'>
                            <div className='flex-[2]'>
                                <h5 className='text-lg font-semibold capitalize'>Cart items</h5>
                                {/* CartItems */}
                                {cartItems.map((item, index) => (
                                        <CartItems 
                                            key={index} 
                                            data={item}
                                            idItemCart={index}
                                        />
                                    ))
                                }
                            </div>
                            <div className='flex-[1] '>
                                <h5 className='text-lg font-semibold capitalize'>Summary</h5>
                                <div className='mt-5 py-5 px-6 bg-black/[0.05] rounded-xl'>
                                    <div className='flex items-center justify-between pb-4'>
                                        <h5 className='text-base md:text-lg font-medium'>Subtotal</h5>
                                        <p className='flex items-center text-base md:text-lg font-medium'>
                                            <BsCurrencyDollar size={18}/>
                                            {new Intl.NumberFormat('en-IN', {
                                                    currencySign: 'accounting',
                                                })
                                                .format(subTotalPrice)
                                            }.00
                                        </p>
                                    </div>
                                    <div className='flex items-center justify-between border-b border-gray-300/80 pb-4'>
                                        <h5 className='text-base md:text-lg font-medium'>Item</h5>
                                        <p className='flex items-center text-base md:text-lg font-medium'>
                                            { subTotalQuantity }
                                        </p>
                                    </div>
                                    <div className='pt-4 text-[12px] md:text-sm'>
                                        <em className='leading-6 text-black/[0.7]'>
                                            The subtotal reflects the total price of your order, including duties and taxes, 
                                            before any applicable discounts. It does not include delivery costs and international transaction fees.
                                        </em>
                                    </div>
                                </div>
                                <button 
                                    className={`flex items-center justify-center w-full mt-6 py-4 px-9 bg-black text-white font-oswald text-lg font-medium rounded-full
                                    transition-all ease-linear duration-300 active:scale-[0.9] hover:opacity-80 ${loading ? " !bg-black/[0.6]" : ""}`}
                                    onClick={handlePayment}>
                                        Checkout
                                        { loading &&(
                                            <AiOutlineLoading3Quarters 
                                                size={17}
                                                className='animate-spin ml-3'    
                                            />
                                        )}
                                </button>
                            </div>
                        </div>
                        {/* Cart content end */}
                    </>
                ) : (
                    <>
                        {/* Cart Empty Screen start */}
                        <div className='flex-[2] flex flex-col items-center pb-[50px]'>
                            <Image
                                src="/assets/empty-cart.jpg"
                                alt='empty-cart.png'
                                width={300}
                                height={300}
                                className='w-[280px] md:w-[380px]'
                            />
                            <span className='font-bold text-xl'>
                                Your cart is empty.
                            </span>
                            <em className='mt-4 text-center text-black/[0.6]'>
                                Looks like you have not added anything in your cart.
                                <br />
                                Go ahead and explore top categories.
                            </em>
                            <Link
                                href={"/"}
                                className='py-4 px-12 bg-black rounded-full text-white cursor-pointer mt-8 mb-4 font-oswald font-medium text-lg
                                transition-all ease-linear duration-300 active:scale-90 hover:opacity-75'
                            >
                                Continue Shopping
                            </Link>
                        </div>
                        {/* Cart Empty Screen end */}
                    </>
                )}
            </Wrapper>
        </div>
    )
}

export default CartPage