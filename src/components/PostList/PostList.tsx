import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

type Post = {
    id: number;
    title: string;
    body: string;
};

export function PostsList() {
    // Estados para almacenar los datos
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // useEffect se ejecuta después de que el componente se monta
    useEffect(() => {
        // Función asincrónica para obtener los posts desde una API
        const fetchPosts = async () => {
            try {
                const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
                // Almacena los datos de los posts en el estado
                setPosts(response.data);
            } catch (error) {
                // Si hay un error, se guarda el mensaje en el estado
                setError("Erro ao carregar os posts. Tente novamente mais tarde.");
            } finally {
                // Independientemente del resultado, se desactiva el indicador de carga
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    // Función para reintentar obtener los posts en caso de error
    const handleRetry = () => {
        setLoading(true);
        setError(null);
        setPosts([]);
        const fetchPosts = async () => {
            try {
                const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
                setPosts(response.data);
            } catch (error) {
                setError("Erro ao carregar os posts. Tente novamente mais tarde.");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    };

    // Si está cargando, se muestra un spinner
    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" />
                <p>Carregando posts...</p>
            </Container>
        );
    }

    // Si hay un error, se muestra un mensaje de error y un botón para reintentar
    if (error) {
        return (
            <Container className="text-center mt-5">
                <Alert variant="danger">
                    <p>{error}</p>
                    <Button variant="primary" onClick={handleRetry}>Tentar novamente</Button>
                </Alert>
            </Container>
        );
    }

    // Si los posts se cargaron correctamente, se muestran en una lista
    return (
        <Container>
            <Link to="..">
                <Button>
                    Back
                </Button>
            </Link>
            <Row className="mt-5">
                {posts.map((post) => (
                    <Col key={post.id} md={4} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>{post.title}</Card.Title>
                                <Card.Text>{post.body}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
