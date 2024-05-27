import { useState, useEffect } from "react";
import { Badge, Button, Col, Row, Stack, Form, Card } from "react-bootstrap";
import { useTarea } from "../TareaLayout";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import { Nota, TareaData } from "../../App";
import ReactMarkdown from "react-markdown"
import styles from './Tarea.module.css'

type TareaProps = {
    onDeletar: (id: string) => void;
    onUpdateTarea: (id: string, data: TareaData) => void;
    notas: Nota[];
};

export function Tarea({ onDeletar, onUpdateTarea, notas }: TareaProps) {
    const tarea = useTarea();
    const navigate = useNavigate();

    const [tareaNotas, setTareaNotas] = useState<Nota[]>([]);
    const [novaNotaDescripcion, setNovaNotaDescripcion] = useState("");

    useEffect(() => {
        const savedNotas = notas.filter(nota => tarea.noteIds.includes(nota.id));
        setTareaNotas(savedNotas);
    }, [tarea.noteIds, notas]);

    const handleAddNota = (descripcion: string) => {
        const newNota = { id: uuidV4(), descripcion };
        setTareaNotas(prevNotas => [...prevNotas, newNota]);
        onUpdateTarea(tarea.id, {
            ...tarea,
            noteIds: [...tarea.noteIds, newNota.id],
            notas: [...tarea.notas || [], newNota],
        });
        setNovaNotaDescripcion(""); // Limpa o estado da descrição da nova nota após adicionar
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (novaNotaDescripcion.trim()) {
            handleAddNota(novaNotaDescripcion.trim());
        }
    };

    const handleDeleteNota = (id: string) => {
        const updatedNotas = tareaNotas.filter(nota => nota.id !== id);
        setTareaNotas(updatedNotas);
        onUpdateTarea(tarea.id, {
            ...tarea,
            noteIds: updatedNotas.map(nota => nota.id),
            notas: updatedNotas,
        });
    };

    return (
        <>
            <Row className="align-items-center mb-5">
                <Col xs={12} md={8}>
                    <h1>Titulo: {tarea.titulo}</h1>
                    <strong>Fecha de Vencimiento: </strong><p>{tarea.vencimiento}</p>
                    {tarea.estados.length > 0 && (
                        <Stack
                            gap={1}
                            direction="horizontal"
                            className="flex-wrap"
                        >
                            {tarea.estados.map(estado => (
                                <Badge className="text-truncate" key={estado.id}>
                                    {estado.label}
                                </Badge>
                            ))}
                        </Stack>
                    )}
                </Col>
                <Col xs={12} md={4} className="d-flex justify-content-md-end mt-3 mt-md-0">
                    <Stack gap={2} direction="horizontal">
                        <Link to={`/${tarea.id}/edit`}>
                            <Button variant="primary">Editar</Button>
                        </Link>
                        <Button onClick={() => {
                            onDeletar(tarea.id);
                            navigate('/');
                        }} variant="outline-danger">Delete</Button>
                        <Link to="/">
                            <Button variant="outline-secondary">Volver</Button>
                        </Link>
                    </Stack>
                </Col>
            </Row>
            <ReactMarkdown className={`${styles.mark}`}>{tarea.descripcion}</ReactMarkdown>
            <Row>
                <Col className="mt-5">
                    <h2>Notas</h2>
                    <Form className="mt-3" onSubmit={handleSubmit}>
                        <Form.Group controlId="notaContenido">
                            <Form.Label>Nueva Nota</Form.Label>
                            <Form.Control
                                className="w-100"
                                type="text"
                                value={novaNotaDescripcion}
                                onChange={(e) => setNovaNotaDescripcion(e.target.value)}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-2">
                            Agregar Nota
                        </Button>
                    </Form>
                    <Row className="mt-4">
                        {tareaNotas.map(nota => (
                            <Col key={nota.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                                <NotaCard nota={nota} onDelete={() => handleDeleteNota(nota.id)} />
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </>
    );
}

function NotaCard({ nota }: { nota: Nota, onDelete: () => void }) {
    return (
        <Card className="h-100 text-reset text-decoration-none position-relative" >
            <Card.Header >
                <Card.Title >
                    NOTAS
                </Card.Title>
            </Card.Header>

            <Stack gap={3} className="align-items-center justify-content-center w-100 mt-4">
                <span className="fs-5">
                    {nota.descripcion}
                </span>
            </Stack>
        </Card >
    );
}
