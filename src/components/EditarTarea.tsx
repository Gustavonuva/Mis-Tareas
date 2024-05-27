import { Estado, TareaData } from "../App";
import { TareaForm } from "./TareaForm";
import { useTarea } from "./TareaLayout";

type EditarTareaProps = {
    onSubmit: (id: string, data: TareaData) => void;
    onAddEstado: (estado: Estado) => void;
    availableEstados: Estado[];
};

// Componente EditarTarea que se encarga de mostrar y manejar el formulario de edición de una tarea
export function EditarTarea({ onSubmit, onAddEstado, availableEstados }: EditarTareaProps) {
    // Obtener la tarea actual usando el hook useTarea
    const tarea = useTarea();

    return (
        <>
            {/* Título de la página de edición */}
            <h1 className="mb-4">Edit Tarea</h1>
            {/* Componente TareaForm para editar la tarea */}
            <TareaForm
                titulo={tarea.titulo}
                descripcion={tarea.descripcion}
                estados={tarea.estados}
                // Función que se ejecuta al enviar el formulario con los datos actualizados
                onSubmit={data => onSubmit(tarea.id, data)}
                // Función para añadir un nuevo estado
                onAddEstado={onAddEstado}
                // Lista de estados disponibles
                availableEstados={availableEstados}
            />
        </>
    );
}
