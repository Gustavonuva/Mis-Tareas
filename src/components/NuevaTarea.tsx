import { Estado, TareaData } from "../App";
import { TareaForm } from "./TareaForm";

type NuevaTareaProps = {
    onSubmit: (data: TareaData) => void;
    onAddEstado: (estado: Estado) => void;
    availableEstados: Estado[];
};

// Componente NuevaTarea que se encarga de mostrar y manejar el formulario para crear una nueva tarea
export function NuevaTarea({ onSubmit, onAddEstado, availableEstados }: NuevaTareaProps) {
    return (
        <>
            {/* Título de la página para crear una nueva tarea */}
            <h1 className="mb-4">Nueva Tarea</h1>
            {/* Componente TareaForm para crear la tarea */}
            <TareaForm
                // Función que se ejecuta al enviar el formulario con los datos de la nueva tarea
                onSubmit={onSubmit}
                // Función para añadir un nuevo estado
                onAddEstado={onAddEstado}
                // Lista de estados disponibles
                availableEstados={availableEstados}
            />
        </>
    );
}
