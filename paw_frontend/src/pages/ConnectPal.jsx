import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import {Container, Row, Col, Button} from 'react-bootstrap'
import Card from 'react-bootstrap/Card';

function ConnectPal({user}){
    
    const [pals, setPals] = useState(null)
    
    const getPals = async () => { 
        const response = await axios.get('/connectpal')
        if(response.data == 'no user'){
            window.location.assign("/login")
        }
        const pal_list = response.data && response.data.data
        console.log("pals", pal_list)
        for(let i = 0; i< pal_list.length; i++){
            console.log(pal_list[i].bases[0])
        }
        setPals(pal_list)
       
    }
    useEffect(()=>{getPals()},[])

    const connectPal = (event) => {
        event.preventDefault()
    }

    return(
        <Container>
            <Row>
                <Col></Col>
                <Col>
                    {pals && pals.map((pal)=>(
                    <Card className='space' style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="" />
                        <Card.Body>
                            <Card.Title>{pal.first_name} {pal.last_name}</Card.Title>
                            <Card.Text>
                                Bio: {pal.bio}
                            </Card.Text>
                            <Card.Text>
                                Rate: {pal.rate} per walk
                            </Card.Text>
                            <Card.Text>
                                Bases: {pal.bases}
                            </Card.Text>
                            <Button variant="primary" href={`#/providers/${pal.key}`}>View {pal.first_name}'s Info</Button>
                        </Card.Body>
                        </Card>
                    ))}
                </Col>
                <Col></Col>
            </Row>
        </Container>    
    )
}

export default ConnectPal