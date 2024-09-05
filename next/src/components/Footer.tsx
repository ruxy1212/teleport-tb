import Logo from "./icons/Logo";
import Email from './icons/Email';
import Phone from './icons/Phone';
import Link from "next/link";

export default function Footer(){
    return (
        <footer className="max-w-[1200px] mx-auto px-4 md:px-6 xl:px-0 py-4 flex justify-between gap-6 lg:gap-12 flex-wrap lg:flex-nowrap">
            <div className="flex flex-col justify-between max-w-96 gap-2 md:gap-4 lg:gap-6">
                <div className="logo py-2 w-[144px]  md:w-[213px]"><Logo /></div>
                <p className="font-normal pd-p py-1">Shop the latest models from top brands at unbeatable prices. Limited time offer - don&apos;t miss out!</p>
            </div>
            <div className="flex justify-between gap-3 md:gap-6 lg:gap-[70px] flex-wrap md:flex-nowrap w-full">
                <div className="flex flex-col gap-0 md:gap-3 w-full">
                    <h3 className="text-[22px] font-extrabold font-montserrat mt-2">Company</h3>
                    <ul>
                        <li className="font-normal py-1 font-montserrat leading-7 whitespace-nowrap"><Link href="/page404">About Us</Link></li>
                        <li className="font-normal py-1 font-montserrat leading-7 whitespace-nowrap"><Link href="/page404">Products Digital</Link></li>
                        <li className="font-normal py-1 font-montserrat leading-7 whitespace-nowrap"><Link href="/page404">Customer Reviews</Link></li>
                    </ul>
                </div>
                <div className="flex flex-col gap-0 md:gap-3 w-full">
                    <h3 className="text-[22px] font-extrabold font-montserrat mt-2">Information</h3>
                    <ul>
                        <li className="font-normal py-1 font-montserrat leading-7 whitespace-nowrap"><Link href="/page404">Help Center</Link></li>
                        <li className="font-normal py-1 font-montserrat leading-7 whitespace-nowrap"><Link href="/page404">Payment Methods</Link></li>
                        <li className="font-normal py-1 font-montserrat leading-7 whitespace-nowrap"><Link href="/page404">Return & Refund</Link></li>
                    </ul>
                </div>
                <div className="flex flex-col gap-0 md:gap-3 w-full">
                    <h3 className="text-[22px] font-extrabold font-montserrat mt-2">Contact</h3>
                    <ul>
                        <li className="font-normal py-1 font-montserrat leading-7 whitespace-nowrap"><Link href="/page404"><Phone className="inline-block me-2"/>(+1) 123-456-7890</Link></li>
                        <li className="font-normal py-1 font-montserrat leading-7 whitespace-nowrap"><Link href="/page404"><Email className="inline-block me-2"/>email@youremail.com</Link></li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}