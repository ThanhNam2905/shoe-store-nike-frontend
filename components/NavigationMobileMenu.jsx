import React from 'react'
import Link from 'next/link';
import { BsChevronDown  } from "react-icons/bs";

const data = [
    { id: 1, name: "Home", url: '/' },
    { id: 2, name: "About", url: '/about' },
    { id: 1, name: "Category", subMenu: true },
    { id: 1, name: "Contact", url: '/contact' },
];

const NavigationMobileMenu = ({ showCategoryMenu, setShowCategoryMenu, setMobileMenu, categories }) => {
    return (
        <nav>
            <ul className='flex flex-col md:hidden absolute top-[50px] left-0 w-full h-[calc(100vh-50px)] bg-white text-gray-950 font-bold border-t'>
                {
                    data.map((item, index) => {
                        return (
                            <React.Fragment key={index}>
                                { !!item?.subMenu ? (
                                    <li className='relative flex flex-col cursor-pointer px-4 py-5 border-b'
                                        onClick={() => setShowCategoryMenu(!showCategoryMenu)}>
                                        <div className='flex justify-between items-center'>
                                            <span>{item.name}</span>
                                            <BsChevronDown size={14} className={`mt-1 transition-all ease-linear duration-300 ${showCategoryMenu ? "transform rotate-180" : ""}`}/>
                                        </div>

                                        { showCategoryMenu &&
                                            <ul className='bg-black/[0.05] -mx-5 my-4'>
                                                { categories?.map(({attributes: category, id}) => {
                                                        return (
                                                            <Link 
                                                                href={`/category/${category.slug}`} 
                                                                key={id}
                                                                onClick={() => {
                                                                    setShowCategoryMenu(false)
                                                                    setMobileMenu(false)
                                                                }}>
                                                                <li className='py-4 px-8 flex justify-between border-t'>
                                                                    <span>{category.nameCategory}</span>
                                                                    <span className='text-gray-400 text-[14px]'>({category.products.data.length})</span>
                                                                </li>
                                                            </Link>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        }
                                    </li>
                                ) : (
                                    <li className='cursor-pointer px-5 py-4 border-b'>
                                        <Link 
                                            href={item.url}
                                            onClick={() => setMobileMenu(false)}>
                                            {item.name}
                                        </Link>
                                    </li>
                                )}
                            </React.Fragment>
                        )
                    })
                }
            </ul>
        </nav>
    )
}

export default NavigationMobileMenu