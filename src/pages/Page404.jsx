import { useNavigate } from "react-router-dom";
import rafiki from "../assets/img/rafiki.png";
import NavLeft from "../components/icons/NavLeft";

export default function Page404(){
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }
    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <header className="fixed top-0 left-0 w-full z-30 bg-pd-white">
                <nav className="py-4 px-5 md:px-6 xl:px-0 max-w-[1200px] mx-auto ">
                    <button onClick={goBack} className="logo py-2 md:py-4 w-[20px] md:w-[30px]">
                        <NavLeft />
                    </button>
                </nav>
            </header>
            <div className="flex flex-col gap-8 items-center">
                <img src={rafiki} alt="Maintenance" />
                <p className="pd-p-18 text-pd-black">This page is under maintenance</p>
            </div>
        </div>
    )
}