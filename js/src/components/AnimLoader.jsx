const AnimLoader = () => {
    let classes = 'h-2.5 w-2.5 bg-pd-mid-gray rounded-full';

    return (
        <div className='flex'>
            <div className={`${classes} mr-1 animate-bounce`}></div>
            <div className={`${classes} mr-1 animate-bounce duration-100`}></div>
            <div className={`${classes} animate-bounce duration-300`}></div>
        </div>
    );
};

export default AnimLoader;