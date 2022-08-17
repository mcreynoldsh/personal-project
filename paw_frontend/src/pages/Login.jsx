import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import '../App.css'

function Login({ checkUser }) {
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('/login', {
            'email': event.target[0].value,
            'password': event.target[1].value,
        }).then((response) => {
            if (response.data.data == 'success') {
                checkUser()
            }
            else {
                setErrorMessage(response.data.data)
            }
        }).then((response) => {
            navigate("/", { replace: true })
        }
        ).finally(() => {
            window.location.reload()
        }
        )

    }

    const signUp = (event) => {
        event.preventDefault();
        navigate("/signup", { replace: true })
    }

    return (
        <Container>
            <Row className='space'>
                <Col className='text-center'>
                    <h1 className='login-header'>P<span><img className="header-pic" src="https://www.creativefabrica.com/wp-content/uploads/2020/07/23/Dog-Paw-Print-with-Middle-Divider-Graphics-4699120-2-580x404.jpg" alt="Paw Logo" /></span>w Platoon</h1>
                    <h4 className='under-login-header'>Pet Care For The Military Community</h4>
                </Col>
            </Row>
            <Row className='space'>
                <Col>
                    <img className="login-pic" src="https://i.pinimg.com/originals/a6/55/70/a65570bd40d125cfe6abacbf85e96b3b.jpg" alt="Soldier and Dog Picture" />
                    {/* <img src="https://static.wixstatic.com/media/19d05d521b3a4e5e9901133e61b93b12.jpg/v1/fill/w_460,h_460,al_c,q_80,usm_0.66_1.00_0.01/Dog%20Walking%20on%20a%20Sunny%20Day.webp" alt="Dog Walking Picture" /> */}
                </Col>
                <Col className='align-items-center mt-5'>
                    <h2 className='text-center'>Log In</h2>
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
                    <Button className="mt-2" variant="secondary" type="submit" onClick={signUp}>
                        Sign Up
                    </Button>
                </Col>
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