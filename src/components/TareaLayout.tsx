import { Navigate, Outlet, useOutletContext, useParams } from "react-router-dom";
import { Tarea } from "../App";

// Props para el componente TareaLayout
type TareaLayoutProps = {
    tareas: Tarea[]; // Lista de tareas
};

// Componente TareaLayout para manejar la presentación de las tareas
export function TareaLayout({ tareas }: TareaLayoutProps) {
    // Obtiene el parámetro de la URL (ID de la tarea)
    const { id } = useParams();

    // Encuentra la tarea correspondiente al ID en la lista de tareas
    const tarea = tareas.find((t) => t.id === id);

    // Si la tarea no existe, redirige a la página principal
    if (!tarea) {
        return <Navigate to="/" />;
    }

    // Renderiza el contenido secundario (Outlet) con el contexto de la tarea actual
    return <Outlet context={tarea} />;
}

// Hook para obtener el contexto de la tarea actual
export function useTarea() {
    return useOutletContext<Tarea>();
}
