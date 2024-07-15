import Logo from "./icons/Logo";

export default function Footer(){
    return (
        <div className="flex justify-center items-center self-stretch px-16 max-md:px-5">
            <div className="w-full max-w-[1200px] max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0 justify-between">
                <div className="flex flex-col w-[35%] max-w-96 max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col grow text-base leading-6 text-black max-md:mt-10">
                    <div className="logo py-2 w-[144px]  md:w-[213px]"><Logo /></div>
                    <div className="font-normal pd-p py-1">
                        Shop the latest models from top brands at unbeatable prices.
                        Limited time offer – do not miss out!
                    </div>
                    </div>
                </div>
                <div className="flex flex-col ml-5 w-[60%] max-md:ml-0 max-md:w-full">
                    <div className="grow self-stretch my-auto max-md:mt-10 max-md:max-w-full">
                    <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                        <div className="flex flex-col w-[29%] max-md:ml-0 max-md:w-full">
                        <div className="flex flex-col grow text-lg leading-7 text-black max-md:mt-10">
                            <div className="text-2xl font-extrabold">Company</div>
                            <div className="mt-3.5">About Us</div>
                            <div className="mt-3.5">Products Digital</div>
                            <div className="mt-3.5">Customer Reviews</div>
                        </div>
                        </div>
                        <div className="flex flex-col ml-5 w-[29%] max-md:ml-0 max-md:w-full">
                        <div className="flex flex-col grow text-lg leading-7 text-black max-md:mt-10">
                            <div className="text-2xl font-extrabold">Information</div>
                            <div className="mt-3.5">Help Center</div>
                            <div className="mt-3.5">Payment Methods</div>
                            <div className="mt-3.5">Return & Refund</div>
                        </div>
                        </div>
                        <div className="flex flex-col ml-5 w-[41%] max-md:ml-0 max-md:w-full">
                        <div className="flex flex-col text-lg leading-7 text-black max-md:mt-10">
                            <div className="text-2xl font-extrabold">Contact</div>
                            <div className="flex gap-2.5 mt-6">
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/dffffb37956ba34d702fe9de51bb1adc06ddb528c5910e21d42520f9ac4e0733?"
                                className="shrink-0 my-auto aspect-square w-[23px]"
                            />
                            <div>(+1) 123-456-7890</div>
                            </div>
                            <div className="flex gap-2.5 mt-6 whitespace-nowrap">
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f83256f0c9a036bbd7d286b40337dc50f2f33086f928cb2a89dee0b8492848d2?"
                                className="shrink-0 my-auto aspect-square w-[23px]"
                            />
                            <div>email@youremail.com</div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}