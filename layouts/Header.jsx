import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import { BsHeart, BsCart2  } from "react-icons/bs";
import { BiMenuAltRight } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";
import { fetchDataFromAPI } from '@/utils/api';
import NavigationMenu from '@/components/NavigationMenu';
import Wrapper from '@/components/Wrapper';
import NavigationMobileMenu from '@/components/NavigationMobileMenu';
import { useSelector } from 'react-redux'

const Header = () => {
    const [mobileMenu, setMobileMenu] = useState(false);
    const [showCategoryMenu, setShowCategoryMenu] = useState(false);
    const [show, setShow] = useState("translate-y-0");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [categories, setCategories] = useState(null);

    const controlNavbar = () => {
        if(window.scrollY > 200) {
            if(window.scrollY > lastScrollY && !mobileMenu) {
                setShow("-translate-y-[80px]");
            }
            else {
                setShow("shadow-md");
            }
        }
        else {
            setShow("translate-y-0");
        }
        setLastScrollY(window.scrollY);
    }

    useEffect(() => {
        window.addEventListener("scroll", controlNavbar);
    
        return () => {
            window.removeEventListener("scroll", controlNavbar);
        };
    }, [lastScrollY]);

    useEffect(() => {
        fetchDataCategories();
    }, []);

    const fetchDataCategories = async() => {
        const { data } = await fetchDataFromAPI("/api/categories?populate=*");
        setCategories(data);
    }

    const { cartItems } = useSelector((state) => state.cart);

    return (
        <header className={`w-full h-[50px] md:h-[80px] bg-white flex items-center justify-center 
            sticky z-[999] top-0 transition-transform duration-300 ${show}`}>
            <Wrapper className="flex items-center justify-between h-[60px]">
                <Link href={"/"}>
                    <img src="/assets/logo.svg" alt="Logo Website" 
                        className='w-[40px] md:w-[65px]'/>
                </Link>

                <NavigationMenu 
                    showCategoryMenu={showCategoryMenu} 
                    setShowCategoryMenu={setShowCategoryMenu}
                    categories={categories}
                />

                { mobileMenu && (
                    <NavigationMobileMenu
                        showCategoryMenu={showCategoryMenu}
                        setShowCategoryMenu={setShowCategoryMenu}
                        setMobileMenu={setMobileMenu}
                        categories={categories}
                    />)
                }

                <div className='flex items-center gap-3 text-gray-950'>
                    {/* Heart Icon start */}
                    <div className='relative flex items-center justify-center cursor-pointer w-8 md:w-12 h-8 md:h-12 
                        transition-all ease-linear duration-300 hover:bg-black/[0.1] rounded-full'>
                        <BsHeart className='text-[15px] md:text-[20px]'/>
                        <span className='h-[16px] md:h-[19px] min-w-[16px] md:min-w-[19px] absolute top-1 left-5 md:left-7 bg-red-600 text-white
                            flex items-center justify-center text-[11px] md:text-[12px] rounded-full px-[2px] md:px-[5px]'>
                                19
                        </span>
                    </div>
                    {/* Heart Icon end */}

                    {/* Cart Icon start */}
                    <Link href={"/cart"}>
                        <div className='relative flex items-center justify-center cursor-pointer w-8 md:w-12 h-8 md:h-12 
                            transition-all ease-linear duration-300 hover:bg-black/[0.1] rounded-full'>
                            <BsCart2 className='text-[16px] md:text-[22px]'/>
                            { cartItems.length > 0 && (
                                    <span className='h-[16px] md:h-[19px] min-w-[16px] md:min-w-[19px] absolute top-1 left-5 md:left-7 bg-red-600 text-white
                                        flex items-center justify-center text-[11px] md:text-[12px] rounded-full px-[2px] md:px-[5px]'>
                                            {cartItems.length}
                                    </span>
                                )
                            }
                        </div>
                    </Link>
                    
                    {/* Cart Icon end */}

                    {/* Mobile menu start */}
                    <div className='relative flex md:hidden items-center justify-center cursor-pointer w-8 md:w-12 h-8 md:h-12 
                        transition-all ease-linear duration-300 hover:bg-black/[0.1] rounded-full -mr-2'>
                        { mobileMenu ? (
                            <VscChromeClose 
                                className='text-[20px]'
                                onClick={() => setMobileMenu(false)}/>
                        ) : (
                            <BiMenuAltRight 
                                className='text-[22px]'
                                onClick={() => setMobileMenu(true)}/>
                        )}
                    </div>
                    {/* Mobile menu end */}
                </div>
            </Wrapper>
            
        </header>
    )
}

export default Header