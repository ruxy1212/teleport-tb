import React from 'react';

type CardItemProps = {
    card: {
        cardNumber: string,
        cvv: string,
        expiryDate: string
    },
    index: number,
    cardType: CardTypeMap,
    setSelectedCard: (value: string) => void,
    removeCard: (index: number) => void,
    cards: CardItemProps['card'][],
    cardValidation: boolean,
    pdcard: string
}

type CardTypeMap = {
    [key: string]: string;
};

export default function CardItem(props: CardItemProps){
    const { card, index, cardType, setSelectedCard, removeCard, cards, cardValidation, pdcard } = props;
    return (
        <React.Fragment>
            <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full p-2 pb-0 md:pb-2">
                <label htmlFor={'card'+index} className="flex gap-0 md:gap-5 justify-between flex-col md:flex-row">
                <div className="flex gap-3.5">
                    <div className="flex flex-col justify-center p-0.5">
                    <div className="flex flex-col justify-center items-center">
                        <input type="radio" name="radio_payment" onChange={(e)=>setSelectedCard(e.target.value)} value={index} id={'card'+index} className="w-6 h-6 accent-pd-blue" />
                    </div>
                    </div>
                    <img loading="lazy" src={Object.hasOwn(cardType, card.cardNumber[0])?cardType[card.cardNumber[0]]:pdcard} className="shrink-0 my-auto w-6 aspect-[1.41]"/>
                    <div className="pd-p font-semibold leading-6 text-pd-black"> •••• {card.cardNumber.replace(/\s/g, "").slice(-4)}</div>
                </div>
                <div className="pd-p leading-6 text-gray-400">Expires {card.expiryDate.replace('/', '/20')}</div>
                </label>
                <button onClick={() => removeCard(index)} className="text-pd-red pd-p font-semibold with-opacity">Remove</button>
            </div>
            {index < cards.length - 1 && <hr className={`shrink-0 my-2 h-0 border-t border-solid max-md:max-w-full ${cardValidation?'border-pd-red':'border-pd-black'}`} />}
            </React.Fragment>
    )
}