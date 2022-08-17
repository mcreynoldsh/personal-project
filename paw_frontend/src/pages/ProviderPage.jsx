import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
import axios from 'axios'

function ProviderPage({ getUserById }) {
    let { userID } = useParams()
    const [provider, setProvider] = useState(null)
    let navigate = useNavigate()

    const getProvider = async () => {
        const check_provider = await getUserById(userID)
        console.log(check_provider)
        setProvider(check_provider)
    }

    const connectProvider = async (event) => {
        event.preventDefault()
        const response = await axios.put('/providers/connect', { provider: provider })
        if (response.data == 'okay') {
            navigate("/", { replace: true })
            window.location.reload()
        }
        else {
            console.log("Error Occurred")
        }

    }

    useEffect(() => {
        getProvider()
    }, [])

    return (
        <Container>
            <Row className='pt-5 justify-content-center'>

                <Col>
                    {provider && <div><h3>{provider.first_name} {provider.last_name}</h3>
                        <p>Email: {provider.email}</p>
                        <p>Bases: {provider.bases[0][1]}</p>
                        <p>Rate: {provider.rate} per walk</p>
                        <p>Bio: {provider.bio}</p></div>}
                </Col>
            </Row>
            <Button vriant="primary" onClick={connectProvider}>Connect</Button>
        </Container>
    )
}

export default ProviderPage