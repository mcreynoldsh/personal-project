import {Container, Row, Col, Form, Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import '../App.css'

function Login ({checkUser, setProvider}){
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()
    
    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('/login', {
          'email': event.target[0].value,
          'password':event.target[1].value,
        }).then((response) => {
            if(response.data.data == 'success'){
                checkUser()
            }
            else{
                setErrorMessage(response.data.data)
            }
        }).then((response)=>{
            navigate("/", {replace:true})
        }   
        ).finally(()=>{
            window.location.reload()
        }
        )
    
    }

    const signUp = (event) => {
        event.preventDefault();
        navigate("/signup", {replace:true})
    }

    return (
    <Container>
        <Row className='space justify-content-md-center'>
            <Col md="auto">
                <h2>Log In</h2>
            </Col>
        </Row>
        <Row className='space'>
            <Col></Col>
            <Col>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
            
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Log In
                    </Button>
                </Form>
            </Col>
            <Col></Col>
        </Row>
        <Row className='pt-2'>
            <Col></Col>
            <Col>
                <Button variant="secondary" type="submit" onClick={signUp}>
                        Sign Up
                </Button>
            </Col>
            <Col></Col>
        </Row>
        <Row className='pt-2'>
            <Col></Col>
            <Col>
                <div id='messageDiv'>
                    {errorMessage}
                </div>
            </Col>
            <Col></Col>
        </Row>
    </Container>
    )
}

export default Login