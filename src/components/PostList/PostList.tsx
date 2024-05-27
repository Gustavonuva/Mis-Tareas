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
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
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
    }, []);

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

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" />
                <p>Carregando posts...</p>
            </Container>
        );
    }

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
