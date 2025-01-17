
import propTypes from 'prop-types'
export default function ShoppingCart({text}){
    return (
        <svg width="36" height="33" viewBox="0 0 36 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.55176 2H5.30193C7.00893 2 8.3524 3.43161 8.21015 5.07873L6.89829 20.4108C6.67701 22.9199 8.71592 25.0751 11.308 25.0751H28.141C30.417 25.0751 32.4085 23.2586 32.5823 21.0573L33.4358 9.5121C33.6255 6.95676 31.634 4.8786 28.9945 4.8786H8.58949" stroke="#33363F" strokeWidth="3.55625" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M23.7623 30C25.0954 30 26.1761 28.9475 26.1761 27.6491C26.1761 26.3507 25.0954 25.2982 23.7623 25.2982C22.4292 25.2982 21.3485 26.3507 21.3485 27.6491C21.3485 28.9475 22.4292 30 23.7623 30Z" stroke="#33363F" strokeWidth="4.34483" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13.4635 30C14.7966 30 15.8773 28.9475 15.8773 27.6491C15.8773 26.3507 14.7966 25.2982 13.4635 25.2982C12.1304 25.2982 11.0497 26.3507 11.0497 27.6491C11.0497 28.9475 12.1304 30 13.4635 30Z" stroke="#33363F" strokeWidth="4.34483" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="pd-p font-semibold" fill="#0C0A00">
                {text}
            </text>
        </svg>
    )
}

ShoppingCart.propTypes = {
    text: propTypes.number
}
