import {useEffect, useState} from "react";


const useNetworkStatus =()=>{
    const [online, setOnline] = useState(true)

    useEffect(() => {
        const controller = new AbortController();

        const handleOnline = () => setOnline(true);
        const handleOffline = () => setOnline(false);
        const checkConnection = () => {
            setOnline(navigator.onLine)
        };

        window.addEventListener('online', handleOnline, {
            signal: controller.signal,
        });
        window.addEventListener('offline', handleOffline, {
            signal: controller.signal,
        });

        const interval = setInterval(checkConnection, 5000);

        checkConnection()

        return () => {
            controller.abort();
            clearInterval(interval);
        };
    }, []);

    return online

}
export default useNetworkStatus;
