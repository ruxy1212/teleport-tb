
import { ChangeEvent, FormEvent, useState } from 'react';

type AddBillingProps = {
  addBilling: (data: dataProps) => void,
  onClose: () => void
}

type dataProps = {
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  address: string,
}

interface Errors {
  firstName?: boolean,
  lastName?: boolean,
  email?: boolean,
  phone?: boolean,
  address?: boolean,
}

export default function AddBilling(props: AddBillingProps) {
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  });

  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFocus = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false,
    }));
  };

  const submitBilling = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(validateFields(data)){
            props.addBilling(data);
            props.onClose();
            setData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                address: '',
            });
        }
    };

    const validateFields = (payload: dataProps) => {
        let verdict = true;
        const newErrors: Errors = {};
    
        if (!payload.firstName) {
          newErrors.firstName = true;
          verdict = false;
        }
        if (!payload.lastName) {
          newErrors.lastName = true;
          verdict = false;
        }
        if (!payload.email) {
          newErrors.email = true;
          verdict = false;
        }
        if (!payload.phone) {
          newErrors.phone = true;
          verdict = false;
        }
        if (!payload.address) {
          newErrors.address = true;
          verdict = false;
        }
    
        setErrors(newErrors);
        return verdict;
    };

  return (
    <div className="flex flex-col justify-between">
      <h3 className="self-start mt-6 pd-h3 leading-8 text-pd-black">Shipping Address</h3>
      <form onSubmit={submitBilling}>
        <div className="grid grid-cols-2 gap-x-3 gap-y-0 mt-4 md:mt-8">
            <label className="pd-p font-semibold text-pd-black">First Name</label>
            <label className="pd-p font-semibold text-pd-black">Last Name</label>
            <input type="text" name="firstName" placeholder="John" value={data.firstName} onChange={handleChange} onFocus={handleFocus} className={`pd-p w-full px-4 py-3 mt-2 md:mt-4 rounded-sm border border-solid text-pd-black ${errors.firstName?'border-pd-red':'border-pd-black'}`}/>
            <input type="text" name="lastName" placeholder="Thomas" value={data.lastName} onChange={handleChange} onFocus={handleFocus} className={`pd-p w-full px-4 py-3 mt-2 md:mt-4 rounded-sm border border-solid text-pd-black ${errors.lastName?'border-pd-red':'border-pd-black'}`}/>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-0 mt-4 md:mt-8">
            <label className="pd-p font-semibold text-pd-black">Email</label>
            <label className="pd-p font-semibold text-pd-black">Phone</label>
            <input type="email" name="email" placeholder="john.thomas@email.com" value={data.email} onChange={handleChange} onFocus={handleFocus} className={`pd-p w-full px-4 py-3 mt-2 md:mt-4 rounded-sm border border-solid text-pd-black ${errors.email?'border-pd-red':'border-pd-black'}`}/>
            <input type="tel" name="phone" placeholder="+23490909893" value={data.phone} onChange={handleChange} onFocus={handleFocus} className={` pd-p w-full px-4 py-3 mt-2 md:mt-4 rounded-sm border border-solid text-pd-black ${errors.phone?'border-pd-red':'border-pd-black'}`}/>
        </div>
        <div className="mt-4 md:mt-8">
            <label className="pd-p font-semibold text-pd-black">Shipping Address</label>
            <div className="justify-center ">
                <input type="text" name="address" value={data.address} onChange={handleChange} onFocus={handleFocus} placeholder="1 Apt, street name, City, State, Country" className={` pd-p w-full px-4 py-3 mt-2 md:mt-4 rounded-sm border border-solid text-pd-black ${errors.address?'border-pd-red':'border-pd-black'}`}/>
            </div>
        </div>
        <div>
          <button className="w-full mt-10 mb-5 py-4 px-10 flex items-center justify-center gap-2 bg-pd-red text-pd-white rounded-[3.25rem] font-medium pd-button font-montserrat with-shadow">Save Billing Address</button>
        </div>
      </form>
        <p className="pd-p leading-6 text-neutral-500">Your personal data will be used to process your order, support your experience throughout this website.</p>
    </div>
  );
}

// AddBilling.propTypes = {
//   addBilling: propTypes.func,
//   onClose: propTypes.func
// }
