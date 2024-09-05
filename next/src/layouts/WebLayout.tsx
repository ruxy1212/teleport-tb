import Logo from '../components/icons/Logo';
import ArrowRight from '../components/icons/ArrowRight';
import Close from '../assets/img/icons/Close.svg';
import Menu from '../assets/img/icons/Menu.svg';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import ShoppingCart from '../components/icons/ShoppingCart';
import Footer from '@/components/Footer';


const WebLayout = ({ cartItems = 0, children = null }: {
    cartItems: number;
    children: React.ReactNode;
}) => {
    const [open, setOpen] = useState(false);
    const offCanvasRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (offCanvasRef.current && !offCanvasRef.current.contains(event.target as Node)) {
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
                    <Link href="/" className="logo py-2 w-[144px]  md:w-[213px]">
                        <Logo />
                    </Link>
                    <ul className="hidden md:flex gap-0 lg:gap-6">
                        <li><Link href="/" className="uppercase p-2 lg:p-4 font-semibold">Home</Link></li>
                        <li><Link href="/pricing" className="uppercase p-2 lg:p-4 font-semibold">Pricing</Link></li>
                        <li><Link href="/events" className="uppercase p-2 lg:p-4 font-semibold">Events</Link></li>
                        <li><Link href="/company" className="uppercase p-2 lg:p-4 font-semibold">Company</Link></li>
                    </ul>
    
                    <div className={`${pathname=='/'?'':'invisible p-0'} items-center gap-2 py-2 hidden md:flex`}>
                        <ShoppingCart text={cartItems}/>
                        <Link href="/cart" className="py-3 px-8 flex items-center gap-2 bg-pd-black text-pd-white rounded-[3.25rem] font-medium pd-button font-montserrat border-2 border-pd-black black-to-red-border"><span className="hide-at-half-md">Go To </span>Cart<ArrowRight className="h-5 w-5"/></Link>
                    </div>
                    
                    <div className="flex items-center gap-2 py-2 md:hidden">
                        <Link href="/cart"><ShoppingCart text={cartItems}/></Link>
                        <button className="flex w-12 h-12 justify-end items-center with-opacity" onClick={()=>setOpen(true)} >
                            <Image src={Menu} alt="" />
                        </button>
                    </div>
                </nav>
            </header>
            <div className={`${open?'flex':'hidden'} md:hidden fixed top-0 left-0 w-screen h-screen overflow-hidden z-40 bg-pd-black/50 justify-end pd-off-canvas`}>
                <nav className="relative right-0 w-[80%] w-max-[300px] z-40 bg-pd-white rounded-s-3xl py-2 px-4 md:px-6 xl:px-0" onBlur={()=>setOpen(false)} ref={offCanvasRef}>
                    <div className="flex justify-end py-2">
                        <button className="flex w-12 h-12 justify-end items-center with-opacity" onClick={()=>setOpen(false)}>
                            <Image src={Close} alt="" />
                        </button>
                    </div>
                    <div className="py-16 flex flex-col justify-between" style={{ height: 'calc(100% - 64px)' }}>
                        <ul className="flex flex-col gap-6">
                            <li><Link className="uppercase p-4 font-semibold" href="/">Home</Link></li>
                            <li><Link  className="uppercase p-4 font-semibold" href="/pricing">Pricing</Link></li>
                            <li><Link  className="uppercase p-4 font-semibold" href="/events">Events</Link></li>
                            <li><Link  className="uppercase p-4 font-semibold" href="/company">Company</Link></li>
                        </ul>
                        {
                            pathname == '/' && 
                            <Link href="/cart"  className="mx-4 py-4 px-9 flex items-center justify-center gap-2 bg-pd-red text-pd-white rounded-[3.25rem] font-medium pd-button font-montserrat">Go To Cart<ArrowRight className="h-5 w-5"/></Link>
                        }
                    </div>
                </nav>
            </div>
            <div className="mt-20 mb-24 lg:mb-32">{children}</div>
            <Footer />
        </>
    )
}

export default WebLayout;
