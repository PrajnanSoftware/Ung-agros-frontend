import React, { useCallback, useEffect, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import logo from "../assets/logo (2).png";
import { CgProfile } from "react-icons/cg";
import { IoCartOutline } from "react-icons/io5";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import SearchSuggestionComponent from './SearchSuggetionComponent';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../redux/slice/cartSlice';
import { getCategory } from '../redux/slice/categorySlice';
import { axiosInstance } from '../utils/axiosInstance';
import { debounce } from 'lodash';
import { FaSearch } from "react-icons/fa";
import { getProducts } from '../redux/slice/productSlice';
import ProfileSliderComponent from './ProfileSliderComponent';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";





const HeaderComponent = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search_query, setSearchQuery] = useState("");
  const [search_result ,setSearchResult] = useState ([]);
  const [isCategoryOpen, setCategoryOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  
  const searchSuggestionRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, isAuthenticated, success, user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const { category } = useSelector((state) => state.category);

  useEffect(() => {
    if (location.pathname !== "/search-result") {
      setSearchQuery("");
    }
  }, [location.pathname]);

  useEffect(() => {
    dispatch(getCategory());
    if (isAuthenticated) {
      dispatch(getCart());
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchSuggestionRef.current && !searchSuggestionRef.current.contains(event.target)) {
        setSearchResult([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const fetchSuggestions = useCallback( async (query) => {
    if (!query) {
      setSearchResult([]);
      return;
    }

    try {
      const response = await axiosInstance.get(`/product/suggestions?query=${query}`);
      setSearchResult(response.data.data);
    } catch (error) {
      setSearchResult([]);
    }
  }, [])



  const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 300), [fetchSuggestions]);

  const onSearchInputChange = (e) => {
    
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    debouncedFetchSuggestions(query);
    
  }

  const onSearchSelection = (name) => {
    setSearchResult([]);
    setSearchQuery(name.toLowerCase());
    navigate(`/search-result?query=${name.toLowerCase()}`);
    // if (searchInputRef.current) {
    //   searchInputRef.current.focus();
    // }
  }

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search_query.trim()) return;
    setSearchResult([]);
    // dispatch(getProducts({name:search_query, page:1, limit:10}));
    try {
      navigate(`/search-result?query=${search_query}`);
    } catch (error) {
      console.error("Search failed", error);
    }
  };
  
  const handleProfileToggle = (e) => {
    setProfileOpen((prev) => {
      if (!prev) {
        document.body.style.overflow = "hidden"; 
      } else {
        document.body.style.overflow = ""; 
      }
      return !prev
    });
  }

  const toggleCategoryState = (e) => {
    setCategoryOpen((prev) => !prev);
  }

  const closeAllPopups = (e) => {
    setMenuOpen(false);
    setCategoryOpen(false);
  }

  return (
    <div className='h-32 lg:h-16 flex flex-wrap lg:flex-nowrap bg-primary items-center justify-between z-10'>

      <div className='flex-1 basis-1 lg:basis-0 lg:hidden pl-4'>
        { menuOpen ? (
          <HiX className=' text-3xl cursor-pointer text-white' onClick={() => setMenuOpen(false)} />
        ) : (
          <HiOutlineMenu className='text-3xl cursor-pointer text-white' onClick={() => setMenuOpen(true)} />
        )}
      </div>

      {/* Logo */}
      <div className='flex-1 basis-1 lg:basis-0 py-2 pl-6'>
        <img src={logo} alt="Unq Agro" className='m-auto  bg-white h-14 w-14 rounded-full hover:cursor-pointer' onClick={() => navigate('/')}/>
      </div>

      {/* Navigation Link */}
      <div className={`lg:flex lg:flex-grow gap-4 lg:pl-6 lg:items-end lg:pr-10 h-full lg:h-auto items-center lg:justify-center z-20 fixed lg:static top-0 left-0 w-full lg:w-auto bg-primary lg:bg-transparent flex-col lg:flex-row lg:flex-nowrap transition-all duration-300 ${menuOpen ? "flex" : "hidden" }`} role="navigation"
  aria-expanded={menuOpen}>
    {menuOpen && <div className='w-full'>
    <HiX className='text-3xl cursor-pointer text-white ml-auto mt-4 mr-4' onClick={() => setMenuOpen(false)} />
    </div>}
    <NavLink to={`/`} className={({ isActive }) => isActive ? "text-secondary font-bold border-b-4 border-secondary mx-2" : "text-background"} onClick={closeAllPopups} >Home</NavLink>
    
    
    <div className='relative text-center'>
      <button type='button' id='category-button' className={`flex items-center justify-center  gap-2 ${isCategoryOpen ? "text-secondary font-bold mx-2" : "text-background"}`} onClick={toggleCategoryState}>Categories {isCategoryOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</button>

      <div className={`${isCategoryOpen ? 'block': 'hidden'} lg:absolute lg:-left-2 lg:z-100 mt-4 lg:origin-center bg-primary text-nowrap text-start ${isCategoryOpen ? "opacity-100 scale-100": "opacity-0 scale-95 pointer-events-none"}`} role='category' >
        {
          category.map((item, index) => {
            // TODO: When clicked on NavLink redirects to search page 
            return <NavLink key={index} to={`/search-result/${item._id}`} role='categoryitem' id={`category-item-${index}`} className={({ isActive }) => isActive ? "block px-2 text-secondary font-bold border-b-4 border-secondary mx-2" : "block px-2 text-background"} onClick={closeAllPopups} >{item.name}</NavLink>
          })
        }
      </div>
    </div>


    <NavLink to={`/contact-us`} className={({ isActive }) => isActive ? "text-secondary font-bold border-b-4 border-secondary mx-2" : "text-background"} onClick={closeAllPopups} >Contact Us</NavLink>
    <NavLink to={`/about-us`} className={({ isActive }) => isActive ? "text-secondary font-bold border-b-4 border-secondary mx-2" : "text-background"} onClick={closeAllPopups} >About Us</NavLink>
    </div>

      <hr className='w-full flex-1 basis-full order-1 mx-2 lg:hidden'/>

      {/* Searchbox */}
      <form  action={"/search-result"} className="relative flex-1 basis-full lg:basis-auto order-1 lg:order-none min-w-[120px] lg:mt-0 pb-1 px-2">
        <div className={` ${search_result.length > 0 ? 'bg-white rounded-t-[20px] ' : ''}`} ref={searchSuggestionRef} >
          <input type="text" onChange={onSearchInputChange} name="search"  autoComplete="off" id="search" value={search_query} placeholder='Search Products...' 
              className={`w-full px-4 py-1 rounded-full border border-gray-300 focus:outline-none
              ${search_result.length > 0 ? 'rounded-b-[0px] rounded-t-[20px]' : ''} `} />
                <button type="submit" className="absolute right-5 top-2 text-gray-500 " onClick={handleSearch}><FaSearch /></button>
                <SearchSuggestionComponent result={search_result} onSearchSelection={onSearchSelection} />
        </div>
      </form>

      {/* Cart and Profile Icons */
        // TODO: add navigation to Cart and Profile page 
      }
      <div className='flex gap-4 flex-1 basis-1 lg:basis-0 justify-end items-center py-2 pr-4'>
        <div className='relative group z-10'>
          <NavLink to={`/cart`}>
            <IoCartOutline className='text-3xl cursor-pointer text-white' />
          </NavLink>
          <span className="absolute left-1/2 -translate-x-1/2 -bottom-8 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              Cart
          </span>
          { cart?.length > 0 && <p className='absolute bg-red-600 text-white px-1 text-xs rounded-full -top-1 -right-1'>{cart.length}</p> }
        </div>
        <div className='relative group z-10'>
          { isAuthenticated ? 
            <div className='px-3 py-1 rounded-full bg-white font-bold cursor-pointer' onClick={handleProfileToggle}>
              {(user.email).charAt(0).toUpperCase()}
            </div>
          : <CgProfile className='text-3xl cursor-pointer text-white' onClick={() => navigate('/login')}/> }
          {console.log(isAuthenticated)}
          <span className="absolute left-1/2 -translate-x-1/2 -bottom-6 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              Account
          </span>
        </div>
      </div>
      { isProfileOpen && <ProfileSliderComponent handleToggle={handleProfileToggle} />}
    </div>
  )
}

export default HeaderComponent