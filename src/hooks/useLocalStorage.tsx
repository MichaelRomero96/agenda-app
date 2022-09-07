import { useState } from "react";

export default function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedData, setStoredData] = useState(() => {
        try {
            const response = window.localStorage.getItem(key);
            return response ? JSON.parse(response) : initialValue;
        } catch (error) {
            console.error(error)
        }
    });

    const setData = <T,>(data: T) => {
        try {
            window.localStorage.setItem(key, JSON.stringify(data));
            setStoredData(data);
        } catch (error) {
            console.error(error)
        }
    }
    return [storedData, setData]
}