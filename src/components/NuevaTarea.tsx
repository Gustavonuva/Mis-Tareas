import { Estado, TareaData } from "../App";
import { TareaForm } from "./TareaForm";

type NuevaTareaProps = {
    onSubmit: (data: TareaData) => void
    onAddEstado: (estado: Estado) => void
    availableEstados: Estado[]
}

export function NuevaTarea({ onSubmit, onAddEstado, availableEstados }: NuevaTareaProps) {
    return (
        <>
            <h1 className="mb-4">Nueva Tarea</h1>
            <TareaForm
                onSubmit={onSubmit}
                onAddEstado={onAddEstado}
                availableEstados={availableEstados} />
        </>
    )
}