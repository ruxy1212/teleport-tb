// import propTypes from 'prop-types'
import Close from "../assets/img/icons/Close.svg";
import { useEffect, useRef } from 'react';

type ModalProps = {
    children: React.ReactNode,
    open: boolean,
    setOpen: (open: boolean) => void,
    canClose?: boolean,
    canBlur?: boolean
}

export default function Modal(props: ModalProps) {
    const {children, open, setOpen, canClose = true, canBlur = true} = props;
    const modalRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if(canBlur){
            const handleClickOutside = (event: MouseEvent) => {
                if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
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
        }
    }, [open, setOpen, canBlur]);
    
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
            <div className="max-h-[95vh] overflow-y-auto shadow-lg border border-black border-solid bg-pd-white rounded-xl w-[380px] max-w-[90%] mx-auto" ref={modalRef}>
                <div className="p-8 leading-[150%]">
                    {
                        canClose &&
                        <div className="flex justify-end">
                            <button onClick={()=>setOpen(false)} className="with-opacity">
                                <img loading="lazy" src={Close} className="self-end aspect-square"/>
                            </button>
                        </div>
                    }
                    {children}
                </div>
            </div>
        </div>
    )
}

// Modal.propTypes = {
//     children: propTypes.node,
//     open: propTypes.bool,
//     setOpen: propTypes.func,
//     canClose: propTypes.bool,
//     canBlur: propTypes.bool
// }