import MapContainer from "../components/MapContainer"
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function AddBase({ user }) {
    let navigate = useNavigate()
    const addBase = (name) => {
        axios.post('/addbase', {
            'name': name,
            'user': user.email
        }).then((response) => {
            if (response.data.data == 'success') {
                navigate("/", { replace: true })
                window.location.reload()
                console.log('added base', name)

            }

        })
    }
    return (
        <Container>
            <Row className="pt-4">

                <Col>
                    <h2>Browse the map and connect to a base</h2>
                </Col>

            </Row>
            <Row className='pt-5'>

                <Col>
                    <MapContainer addBase={addBase} />
                </Col>
            </Row>
        </Container>
    )
}

export default AddBase