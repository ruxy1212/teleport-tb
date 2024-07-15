import propTypes from 'prop-types'
export default function Star({fill}){
    return (
        <svg width="20" height="20" className="inline" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 0L13.09 6.26L20 7.27L15 12.14L16.18 19.02L10 15.77L3.82 19.02L5 12.14L0 7.27L6.91 6.26L10 0Z" fill={`${fill?"#DF1406":"#bbb"}`}/>
        </svg>
    )
}
Star.propTypes = {
    fill: propTypes.bool
}