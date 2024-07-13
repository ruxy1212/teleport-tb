import propTypes from 'prop-types'
import Close from "../assets/img/icons/Close.svg";
import { useEffect } from 'react';

export default function Modal({children, open, setOpen}){
    useEffect(() => {
        if (open) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'auto';
        }
        return () => {
          document.body.style.overflow = 'auto';
        };
    }, [open]);
    return (
        <div className={`${open?'flex':'hidden'} fixed top-0 left-0 w-screen h-screen z-[90] bg-pd-black/60 justify-center items-center`}>
            <div className="max-h-[95vh] overflow-y-auto shadow-lg border border-black border-solid bg-pd-white rounded-xl w-[380px] max-w-[90%] mx-auto">
                <div className="p-8 leading-[150%]">
                    <div className="flex justify-end">
                        <button onClick={()=>setOpen(false)}>
                            <img loading="lazy" src={Close} className="self-end aspect-square"/>
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
}

Modal.propTypes = {
    children: propTypes.node,
    open: propTypes.bool,
    setOpen: propTypes.func
}