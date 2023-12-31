import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from './ProductCard';

const RelatedProducts = ({ products }) => {
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4500, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
    };

    return (
        <div className='mt-[50px] md:mt-[100px] mb-[100px] md:mb-0'>
            <h3 className='text-2xl font-semibold mb-6'>You Might Also Like</h3>
            <Carousel 
                responsive={responsive}
                containerClass="-mx-[12px]"
                itemClass="px-[12px]"
            >
                {   products?.data?.map((product) => (
                        <ProductCard key={product?.id} data={product} />
                    ))
                }
            </Carousel>;
        </div>
    )
}

export default RelatedProducts