
import { useState } from 'react';
import propTypes from 'prop-types';

export default function AddPayment({ addCard, onClose }) {
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const onCardNumber = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.match(/.{1,4}/g)?.join(" ") || value;
    setCardNumber(value);
  };

  const onExpiryDate = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 2) {
      value = value.slice(0, 2) + "/" + value.slice(2, 4);
    }
    setExpiryDate(value);
  };

  const submitCard = (e) => {
    e.preventDefault();
    const newCard = { cardNumber, cvv, expiryDate };
    addCard(newCard);
    onClose();
    setCardNumber("");
    setCvv("");
    setExpiryDate("");
  };

  return (
    <div className="flex flex-col justify-between">
      <h3 className="self-start mt-6 pd-h3 leading-8 text-pd-black">Add Payment Method</h3>
      <form onSubmit={submitCard}>
        <div className="mt-4 md:mt-8">
            <label className="pd-p font-semibold text-pd-black">Card Number</label>
            <div className="justify-center ">
                <input type="text" value={cardNumber} onChange={onCardNumber} maxLength="19" required placeholder="1234 5678 9101 1121" className="tracking-widest pd-p px-4 py-3 mt-2 md:mt-4 rounded-sm border border-pd-black border-solid text-pd-black w-full"/>
            </div>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-0 mt-4 md:mt-8">
            <label className="pd-p font-semibold text-pd-black">Expiration Date</label>
            <label className="pd-p font-semibold text-pd-black">CVV</label>
            <input type="text" placeholder="MM/YY" value={expiryDate} onChange={onExpiryDate} maxLength="5" required className="tracking-widest pd-p w-full px-4 py-3 mt-2 md:mt-4 rounded-sm border border-pd-black border-solid text-pd-black"/>
            <input type="text" placeholder="123" value={cvv} onChange={(e) => setCvv(e.target.value)} maxLength="4" required className="tracking-widest pd-p w-full px-4 py-3 mt-2 md:mt-4 rounded-sm border border-pd-black border-solid text-pd-black"/>
        </div>
        <div>
          <button className="w-full mt-10 mb-5 py-4 px-10 flex items-center justify-center gap-2 bg-pd-red text-pd-white rounded-[3.25rem] font-medium pd-button font-montserrat with-shadow">Save Card Details</button>
        </div>
      </form>
        <p className="pd-p leading-6 text-neutral-500">Your personal data will be used to process your order, support your experience throughout this website, and for other purposes.</p>
    </div>
  );
}

AddPayment.propTypes = {
  addCard: propTypes.func,
  onClose: propTypes.func
}
