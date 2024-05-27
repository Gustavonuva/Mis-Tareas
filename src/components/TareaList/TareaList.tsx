import { useMemo, useState } from "react";
import { Badge, Button, Card, Col, Container, Form, Pagination, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Estado } from "../../App";
import styles from "./TareaList.module.css";

type TareasSimplificada = {
    estados: Estado[];
    titulo: string;
    id: string;
    vencimiento: string
};

type TareaListProps = {
    availableEstados: Estado[];
    tareas: TareasSimplificada[];
};

export function TareaList({ availableEstados, tareas }: TareaListProps) {
    const [selectedEstado, setSelectedEstado] = useState<Estado[]>([]);
    const [titulo, setTitulo] = useState("");
    const [currentPage, setCurrentPage] = useState(1);


    const filteredTareas = useMemo(() => {
        return tareas.filter((tarea) => {
            return (
                (titulo === "" || tarea.titulo.toLowerCase().includes(titulo.toLowerCase())) &&
                (selectedEstado.length === 0 ||
                    selectedEstado.every((estado) =>
                        tarea.estados.some((tareaEstado) => tareaEstado.id === estado.id)
                    ))
            );
        });
    }, [titulo, selectedEstado, tareas]);

    const totalPages = Math.ceil(filteredTareas.length / 5);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const paginatedTareas = useMemo(() => {
        const startIndex = (currentPage - 1) * 5;
        const endIndex = startIndex + 5;
        return filteredTareas.slice(startIndex, endIndex);
    }, [currentPage, filteredTareas]);

    return (
        <Container>
            <Row className="align-items-center mb-4">
                <Col>
                    <h1>Lista de Tareas</h1>
                </Col>
                <Col xs="auto">
                    <Stack gap={2} direction="horizontal">
                        <Link to="/nuevo">
                            <Button variant="primary">Crear</Button>
                        </Link>
                        <Link to="/post">
                            <Button variant="primary">Posts</Button>
                        </Link>
                    </Stack>
                </Col>
            </Row>
            <Form>
                <Row className="mb-4">
                    <Col>
                        <Form.Group controlId="titulo">
                            <Form.Label>Título</Form.Label>
                            <Form.Control
                                type="text"
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="Estado">
                            <Form.Label>Estado actual</Form.Label>
                            <ReactSelect
                                value={selectedEstado.map((estado) => {
                                    return { label: estado.label, value: estado.id };
                                })}
                                options={availableEstados.map((estado) => {
                                    return { label: estado.label, value: estado.id };
                                })}
                                onChange={(estados) => {
                                    setSelectedEstado(
                                        estados.map((estado) => {
                                            return { label: estado.label, id: estado.value };
                                        })
                                    );
                                }}
                                isMulti
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
            {paginatedTareas.map((_tarea, index) => {
                if (index % 3 === 0) {
                    return (
                        <Row key={index} xs={1} md={2} lg={3} className="g-3" style={{ marginBottom: '20px' }}>
                            {paginatedTareas.slice(index, index + 3).map((tarea) => (
                                <Col key={tarea.id}>
                                    <TareaCard
                                        id={tarea.id}
                                        titulo={tarea.titulo}
                                        estados={tarea.estados}
                                        vencimiento={tarea.vencimiento}
                                    />
                                </Col>
                            ))}
                        </Row>
                    );
                }
                return null;
            })}
            <Pagination className="mt-4 justify-content-center">
                {Array.from({ length: totalPages }, (_, i) => (
                    <Pagination.Item
                        key={i + 1}
                        active={i + 1 === currentPage}
                        onClick={() => handlePageChange(i + 1)}
                    >
                        {i + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </Container>
    );
}

function TareaCard({ id, titulo, estados, vencimiento }: TareasSimplificada) {
    const [finalizado, setFinalizado] = useState(false);
    const [checkboxDisabled, setCheckboxDisabled] = useState(false);

    const handleCheckboxChange = () => {
        if (!finalizado) {
            setFinalizado(true);
            setCheckboxDisabled(true);
        }
    };

    return (
        <Card className={`h-100 text-reset text-decoration-none ${finalizado ? "finalizado" : ""}`}>
            <Card.Body>
                <Stack gap={2} className="align-items-center justify-content-center h-100">
                    <label>
                        <input
                            type="checkbox"
                            checked={finalizado}
                            onChange={handleCheckboxChange}
                            disabled={checkboxDisabled}
                            className={`${styles.checkmark}`}
                        />
                    </label>

                    <Link to={`/${id}`} className="text-reset text-decoration-none text-center">
                        <span className={`fs-5 ${finalizado ? "line-through" : ""} ${styles.span}`}>
                            {titulo}
                        </span>
                        {finalizado ? (
                            <Badge bg="danger" className="mt-2">Finalizado</Badge>
                        ) : (
                            estados.length > 0 && (
                                <Stack
                                    gap={1}
                                    direction="horizontal"
                                    className="justify-content-center flex-wrap mt-2"
                                >
                                    {estados.map((estado) => (
                                        <Badge className="text-truncate" key={estado.id}>
                                            {estado.label}
                                        </Badge>
                                    ))}
                                </Stack>
                            )
                        )}
                    </Link>
                    <span className="small mt-2">
                        Fecha de Vencimiento: <strong>{vencimiento}</strong>
                    </span>
                </Stack>
            </Card.Body>
        </Card>
    );
}
