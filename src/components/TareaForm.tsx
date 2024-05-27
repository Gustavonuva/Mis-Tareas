import { FormEvent, SetStateAction, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CreateTableReactSelect from "react-select/creatable";
import { v4 as uuidV4 } from "uuid";
import { Estado, TareaData } from "../App";

type TareaFormProps = {
    onSubmit: (data: TareaData) => void;
    onAddEstado: (estado: Estado) => void;
    availableEstados: Estado[];
} & Partial<TareaData>;

// Componente TareaForm para mostrar y manejar el formulario de tarea
export function TareaForm({
    onSubmit,
    onAddEstado,
    availableEstados,
    titulo = "",
    descripcion = "",
    estados = [],
}: TareaFormProps) {
    const tituloRef = useRef<HTMLInputElement>(null);
    const descripcionRef = useRef<HTMLTextAreaElement>(null);
    const [selectedEstado, setSelectedEstado] = useState<Estado[]>(estados);
    const [selectedDate, setSelectedDate] = useState('');

    // Hook para navegar entre páginas
    const navigate = useNavigate();

    // Función para manejar el cambio de fecha
    const handleDateChange = (event: { target: { value: SetStateAction<string> } }) => {
        setSelectedDate(event.target.value);
    };

    // Función para manejar el envío del formulario
    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        // Construye el objeto de datos de la tarea y lo envía a la función onSubmit
        onSubmit({
            titulo: tituloRef.current!.value,
            descripcion: descripcionRef.current!.value,
            estados: selectedEstado,
            vencimiento: selectedDate,
            notas: [],
            noteIds: [],
        });

        // Navega de vuelta a la página anterior
        navigate("..");
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Stack gap={4}>
                <Row>
                    {/* Campo de entrada para el título de la tarea */}
                    <Col xs={12} md={6}>
                        <Form.Group controlId="Titulo">
                            <Form.Label>Título</Form.Label>
                            <Form.Control ref={tituloRef} required defaultValue={titulo} />
                        </Form.Group>
                    </Col>
                    {/* Selector creativo para el estado de la tarea */}
                    <Col xs={12} md={6}>
                        <Form.Group controlId="Estado">
                            <Form.Label>Estado actual</Form.Label>
                            <CreateTableReactSelect
                                // Función para crear un nuevo estado personalizado
                                onCreateOption={(label) => {
                                    const newEstado = { id: uuidV4(), label };
                                    onAddEstado(newEstado);
                                    setSelectedEstado((prev) => [...prev, newEstado]);
                                }}
                                // Valor seleccionado para el selector creativo
                                value={selectedEstado.map((estado) => {
                                    return { label: estado.label, value: estado.id };
                                })}
                                // Opciones disponibles para el selector creativo
                                options={availableEstados.map((estado) => {
                                    return { label: estado.label, value: estado.id };
                                })}
                                // Función para manejar el cambio de estado seleccionado
                                onChange={(estados) => {
                                    setSelectedEstado(
                                        estados.map((estado) => {
                                            return { label: estado.label, id: estado.value };
                                        })
                                    );
                                }}
                                // Permitir múltiples selecciones
                                isMulti
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    {/* Campo de entrada para la descripción de la tarea */}
                    <Col xs={12} md={6}>
                        <Form.Group controlId="descripcion">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                defaultValue={descripcion}
                                ref={descripcionRef}
                                required
                                as="textarea"
                                rows={10}
                            />
                        </Form.Group>
                    </Col>
                    {/* Campo de entrada para la fecha de vencimiento de la tarea */}
                    <Col xs={12} md={6}>
                        <Form.Group controlId="date">
                            <Form.Label>Fecha de Vencimiento</Form.Label>
                            <Form.Control
                                type="date"
                                value={selectedDate}
                                onChange={handleDateChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                {/* Botones para enviar o cancelar el formulario */}
                <Stack className="d-flex flex-column flex-sm-row justify-content-end" gap={2}>
                    <Button type="submit">Guardar</Button>
                    <Link to="..">
                        <Button type="button" variant="outline-secondary">Cancelar</Button>
                    </Link>
                </Stack>
            </Stack>
        </Form>
    );
}
