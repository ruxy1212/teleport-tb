import { useEffect } from 'react';
import Subtract from '../assets/img/icons/Subtract.svg';

type PopupProps = {
  message: string,
  duration: number,
  onClose: () => void
}

export default function Popup(props: PopupProps){
    const { message, duration, onClose } = props;
    useEffect(() => {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }, [duration, onClose]);
  
    return (
      <div className="w-[428px] max-w-[80%] fixed z-[999] top-20 left-1/2 transform -translate-x-1/2 bg-pd-white border border-pd-mid-gray text-white p-4 rounded-lg shadow-lg text-center border-b-[5px] border-b-pd-red">
        <img className="inline me-1" src={Subtract}/>{message}
      </div>
    );
}

