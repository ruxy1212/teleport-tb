import { useEffect } from 'react';
import propTypes from 'prop-types';
import Subtract from '../assets/img/icons/Subtract.svg';

export default function Popup({ message, duration, onClose }){
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

Popup.propTypes = {
    message: propTypes.string,
    duration: propTypes.number,
    onClose: propTypes.func
}
