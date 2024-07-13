import PropTypes from 'prop-types';
import Logo from '../components/icons/Logo';
import ArrowRight from '../components/icons/ArrowRight';
import Email from '../components/icons/Email';
import Phone from '../components/icons/Phone';
import Close from '../assets/img/icons/Close.svg';
import Menu from '../assets/img/icons/Menu.svg';
import { useRef, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ShoppingCart from '../components/icons/ShoppingCart';
// import Footer from '../components/Footer';

export default function WebLayout({children, cartItems = null}){
    const [open, setOpen] = useState(false);
    const offCanvasRef = useRef(null);
    const location = useLocation();
    useEffect(() => {
        const handleClickOutside = (event) => {
          if (offCanvasRef.current && !offCanvasRef.current.contains(event.target)) {
            setOpen(false);
          }
        };
        if (open) {
          document.addEventListener('mousedown', handleClickOutside);
        } else {
          document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]);
    return (
        <>
            <header className="fixed top-0 left-0 w-full z-30 bg-pd-white">
                <nav className="flex shadow-md md:shadow-sm w-full justify-between items-center self-stretch py-2 px-4 md:px-6 xl:px-0 bg-pd-white max-w-[1200px] mx-auto">
                    <Link to="/" className="logo py-2 w-[144px]  md:w-[213px]" href="#">
                        <Logo />
                    </Link>
                    <ul className="hidden md:flex gap-0 lg:gap-6">
                        <li><Link to="/" className="uppercase p-2 lg:p-4 font-semibold">Home</Link></li>
                        <li><Link to="/pricing" className="uppercase p-2 lg:p-4 font-semibold">Pricing</Link></li>
                        <li><Link to="/events" className="uppercase p-2 lg:p-4 font-semibold">Events</Link></li>
                        <li><Link to="/company" className="uppercase p-2 lg:p-4 font-semibold">Company</Link></li>
                        {/* <a className="p-4 uppercase font-semibold" href="#">Login</a> */}
                    </ul>
    {/*                 
                    {
                        location.pathname == '/' &&  */}
                        <div className={`${location.pathname=='/'?'':'invisible p-0'} items-center gap-2 py-2 hidden md:flex`}>
                            <ShoppingCart text={cartItems}/>
                            <Link to="/cart" className="py-3 px-8 flex items-center gap-2 bg-pd-black text-pd-white rounded-[3.25rem] font-medium pd-button font-montserrat border-2 border-pd-black black-to-red-border"><span className="hide-at-half-md">Go To </span>Cart<ArrowRight className="h-5 w-5"/></Link>
                        </div>
                    {/* } */}
                    
                    <div className="flex items-center gap-2 py-2 md:hidden">
                        <Link to="/cart"><ShoppingCart text={cartItems}/></Link>
                        <button className="flex w-12 h-12 justify-end items-center with-opacity" onClick={()=>setOpen(true)} >
                            <img src={Menu} alt="" />
                        </button>
                    </div>
                </nav>
            </header>
            <div className={`${open?'flex':'hidden'} md:hidden fixed top-0 left-0 w-screen h-screen overflow-hidden z-40 bg-pd-black/50 justify-end pd-off-canvas`}>
                <nav className="relative right-0 w-[80%] w-max-[300px] z-40 bg-pd-white rounded-s-3xl py-2 px-4 md:px-6 xl:px-0" onBlur={()=>setOpen(false)} ref={offCanvasRef}>
                    <div className="flex justify-end py-2">
                        <button className="flex w-12 h-12 justify-end items-center with-opacity" onClick={()=>setOpen(false)}>
                            <img src={Close} alt="" />
                        </button>
                    </div>
                    <div className="py-16 flex flex-col justify-between" style={{ height: 'calc(100% - 64px)' }}>
                        <ul className="flex flex-col gap-6">
                            <li><Link className="uppercase p-4 font-semibold" to="/">Home</Link></li>
                            <li><Link  className="uppercase p-4 font-semibold" to="/pricing">Pricing</Link></li>
                            <li><Link  className="uppercase p-4 font-semibold" to="/events">Events</Link></li>
                            <li><Link  className="uppercase p-4 font-semibold" to="/company">Company</Link></li>
                            {/* <a className="p-4 uppercase font-semibold" href="#">Login</a> */}
                        </ul>
                        {
                            location.pathname == '/' && 
                            <Link to="/cart"  className="mx-4 py-4 px-9 flex items-center justify-center gap-2 bg-pd-red text-pd-white rounded-[3.25rem] font-medium pd-button font-montserrat">Go To Cart<ArrowRight className="h-5 w-5"/></Link>
                        }
                    </div>
                </nav>
            </div>
            <div className="mt-20 mb-24 lg:mb-32">{children}</div>
            <footer className="max-w-[1200px] mx-auto px-4 md:px-6 xl:px-0 py-4 flex justify-between gap-6 lg:gap-12 flex-wrap lg:flex-nowrap">
                <div className="flex flex-col justify-between max-w-96 gap-2 md:gap-4 lg:gap-6">
                    <div className="logo py-2 w-[144px]  md:w-[213px]"><Logo /></div>
                    <p className="font-normal pd-p py-1">Shop the latest models from top brands at unbeatable prices. Limited time offer - don&apos;t miss out!</p>
                </div>
                <div className="flex justify-between gap-3 md:gap-6 lg:gap-[70px] flex-wrap md:flex-nowrap w-full">
                    <div className="flex flex-col gap-0 md:gap-3 w-full">
                        <h3 className="text-[22px] font-extrabold font-montserrat mt-2">Company</h3>
                        <ul>
                            <li className="font-normal py-1 font-montserrat leading-7 whitespace-nowrap"><Link to="/page404">About Us</Link></li>
                            <li className="font-normal py-1 font-montserrat leading-7 whitespace-nowrap"><Link to="/page404">Products Digital</Link></li>
                            <li className="font-normal py-1 font-montserrat leading-7 whitespace-nowrap"><Link to="/page404">Customer Reviews</Link></li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-0 md:gap-3 w-full">
                        <h3 className="text-[22px] font-extrabold font-montserrat mt-2">Information</h3>
                        <ul>
                            <li className="font-normal py-1 font-montserrat leading-7 whitespace-nowrap"><Link to="/page404">Help Center</Link></li>
                            <li className="font-normal py-1 font-montserrat leading-7 whitespace-nowrap"><Link to="/page404">Payment Methods</Link></li>
                            <li className="font-normal py-1 font-montserrat leading-7 whitespace-nowrap"><Link to="/page404">Return & Refund</Link></li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-0 md:gap-3 w-full">
                        <h3 className="text-[22px] font-extrabold font-montserrat mt-2">Contact</h3>
                        <ul>
                            <li className="font-normal py-1 font-montserrat leading-7 whitespace-nowrap"><Link to="/page404"><Phone className="inline-block me-2"/>(+1) 123-456-7890</Link></li>
                            <li className="font-normal py-1 font-montserrat leading-7 whitespace-nowrap"><Link to="/page404"><Email className="inline-block me-2"/>email@youremail.com</Link></li>
                        </ul>
                    </div>
                </div>
            </footer>
            {/* <Footer/> */}
        </>
    )
}
WebLayout.propTypes = {
	children: PropTypes.node,
    cartItems: PropTypes.number
};
