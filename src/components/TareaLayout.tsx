import { Navigate, Outlet, useOutletContext, useParams } from "react-router-dom"
import { Tarea } from "../App"

type TareaLayoutProps = {
    tareas: Tarea[]
}
export function TareaLayout({ tareas }: TareaLayoutProps) {
    const { id } = useParams();
    const tarea = tareas.find(t => t.id === id);

    if (!tarea) {
        return <Navigate to="/" />;
    }

    return <Outlet context={tarea} />;
}

export function useTarea() {
    return useOutletContext<Tarea>()
}