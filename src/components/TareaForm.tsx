import { FormEvent, SetStateAction, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CreateTableReactSelect from "react-select/creatable"
import { Estado, TareaData } from "../App";
import { v4 as uuidV4 } from "uuid"


type TareaFormProps = {
    onSubmit: (data: TareaData) => void
    onAddEstado: (estado: Estado) => void
    availableEstados: Estado[]
} & Partial<TareaData>

export function TareaForm({
    onSubmit,
    onAddEstado,
    availableEstados,
    titulo = "",
    descripcion = "",
    estados = []
}: TareaFormProps) {
    const tituloRef = useRef<HTMLInputElement>(null);
    const descripcionRef = useRef<HTMLTextAreaElement>(null)
    const [selectedEstado, setSelectedEstado] = useState<Estado[]>(estados)
    const [selectedDate, setSelectedDate] = useState('');
    const navigate = useNavigate()

    const handleDateChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setSelectedDate(event.target.value);
    };

    function handleSubmit(e: FormEvent) {
        e.preventDefault()

        onSubmit({
            titulo: tituloRef.current!.value,
            descripcion: descripcionRef.current!.value,
            estados: selectedEstado,
            vencimiento: selectedDate,
            notas: [],
            noteIds: []
        })

        navigate("..")
    }
    return (
        <Form onSubmit={handleSubmit}>
            <Stack gap={4}>
                <Row>
                    <Col xs={12} md={6}>
                        <Form.Group controlId="Titulo">
                            <Form.Label>Título</Form.Label>
                            <Form.Control ref={tituloRef} required defaultValue={titulo} />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                        <Form.Group controlId="Estado">
                            <Form.Label>Estado actual</Form.Label>
                            <CreateTableReactSelect
                                onCreateOption={label => {
                                    const newEstado = { id: uuidV4(), label }
                                    onAddEstado(newEstado)
                                    setSelectedEstado(prev => [...prev, newEstado])
                                }}
                                value={selectedEstado.map(estado => {
                                    return { label: estado.label, value: estado.id }
                                })}
                                options={availableEstados.map(estado => {
                                    return { label: estado.label, value: estado.id }
                                })}
                                onChange={estados => {
                                    setSelectedEstado(
                                        estados.map(estado => {
                                            return { label: estado.label, id: estado.value }
                                        }))
                                }}
                                isMulti />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6}>
                        <Form.Group controlId="descripcion">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                defaultValue={descripcion}
                                ref={descripcionRef}
                                required as="textarea"
                                rows={10}
                            />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                        <Form.Group controlId="date">
                            <Form.Label>Fecha de Vencimiento</Form.Label>
                            <Form.Control
                                type="date"
                                value={selectedDate}
                                onChange={handleDateChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Stack direction={{ base: "column", sm: "row" }} gap={2} className="justify-content-end">
                    <Button type="submit">Salvar</Button>
                    <Link to="..">
                        <Button type="button" variant="outline-secondary">Cancelar</Button>
                    </Link>
                </Stack>
            </Stack>
        </Form>
    )
}
