import React, { useState, useEffect } from "react";
import { Container, Accordion } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { PropertyTaskList } from "../components/PropertyTaskList";
import axios from "axios";
import { PropertyApplianceList } from "../components/PropertyApplianceList";

export const ViewProperty = () => {
    
  const { propertyID } = useParams();

  const today = new Date();

  const [property, setProperty] = useState({});
  const [tasks, setTasks] = useState([]);
  const [appliances, setAppliances] = useState([]);
  

    useEffect (() => {
        const fetchProperty = async () => {
            const result = await axios.get(`/api/properties/${propertyID}`)
            if (result.data) {
                setProperty(result.data);
            } else {
                setProperty([]);
            }
        };
        fetchProperty();
    }, [property, propertyID]);
    
    return (
        <>
            <Container className="text-center main" >

                <h1 className="p-3 mb-3 blue-header">{property.address}</h1>
                <h2 className="blue-secondary-header">{(property.city) + ", " + (property.prov)}</h2>

                <Accordion className="green-border">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header className="blue-text">Property Features</Accordion.Header>
                        <Accordion.Body>
                        
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header className="blue-text">Property Appliances</Accordion.Header>
                        <Accordion.Body>
                            <PropertyApplianceList />
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header className="blue-text">Property Tasks</Accordion.Header>
                        <Accordion.Body>
                            <PropertyTaskList />
                        </Accordion.Body>
                    </Accordion.Item>


                </Accordion>
                <br></br>
                <br></br>
                <br></br>


            </Container>
        </>
    )
}