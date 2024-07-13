import Star from "./icons/Star"
import propTypes from 'prop-types'

export default function Rating({amount}){
    const starFill = amount<0?0:amount>5?5:amount;
    const stars = Array(5).fill(0).map((_, index) => (
        <Star key={index} fill={index < starFill} />
    ));
    return <div>{stars}</div>
}

Rating.propTypes = {
    amount: propTypes.number
}