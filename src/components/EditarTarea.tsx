import { Estado, TareaData } from "../App";
import { TareaForm } from "./TareaForm";
import { useTarea } from "./TareaLayout";

type EditarTareaProps = {
    onSubmit: (id: string, data: TareaData) => void
    onAddEstado: (estado: Estado) => void
    availableEstados: Estado[]
}

export function EditarTarea({ onSubmit, onAddEstado, availableEstados }:
    EditarTareaProps) {
    const tarea = useTarea()
    return (
        <>
            <h1 className="mb-4">Edit Tarea</h1>
            <TareaForm
                titulo={tarea.titulo}
                descripcion={tarea.descripcion}
                estados={tarea.estados}
                onSubmit={data => onSubmit(tarea.id, data)}
                onAddEstado={onAddEstado}
                availableEstados={availableEstados} />
        </>
    )
}