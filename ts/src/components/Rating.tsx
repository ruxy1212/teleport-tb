import Star from "./icons/Star"
import propTypes from 'prop-types'

type RatingProps = {
    amount: number
}

export default function Rating(props: RatingProps) {
    const starFill = props.amount<0?0:props.amount>5?5:props.amount;
    const stars = Array(5).fill(0).map((_, index) => (
        <Star key={index} fill={index < starFill} />
    ));
    return <div>{stars}</div>
}

Rating.propTypes = {
    amount: propTypes.number
}