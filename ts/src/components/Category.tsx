type CategoryProps = {
    elem: string[]
}

export default function Category(props: CategoryProps) {
    return (
        <div className="flex justify-center py-px leading-6 w-1/3 md:w-[14.28%]">
            <div className="flex flex-col max-w-28">
                <img loading="lazy" src={props.elem[0]} className="self-center aspect-square w-[85px]" />
                <div className="mt-4">{props.elem[1]}</div>
            </div>
        </div>
    )
}