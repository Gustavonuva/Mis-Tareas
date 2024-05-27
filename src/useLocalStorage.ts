import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
    // Estado para almacenar el valor
    const [value, setValue] = useState<T>(() => {
        // Obtiene el valor almacenado en localStorage
        const jsonValue = localStorage.getItem(key);
        // Si no existe valor en localStorage, usa el valor inicial proporcionado
        if (jsonValue == null) {
            // Si el valor inicial es una función, la ejecuta para obtener el valor
            if (typeof initialValue === "function") {
                return (initialValue as () => T)();
            } else {
                return initialValue;
            }
        } else {
            // Si existe valor en localStorage, lo parsea de JSON
            return JSON.parse(jsonValue);
        }
    });

    // Efecto que guarda el valor en localStorage cuando el valor cambia
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    // Retorna el valor actual y la función para actualizarlo
    return [value, setValue] as [T, typeof setValue];
}