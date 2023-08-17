function useDebounce(callback, delay=1000){
    let timerId;
    return (...args)=>{
        clearTimeout(timerId); // if there is any old time running then stop it.
       timerId = setTimeout(() => {
            callback(...args);
        }, delay);
    }
}

export default useDebounce;

