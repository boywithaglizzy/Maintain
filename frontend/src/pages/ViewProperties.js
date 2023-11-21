import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UseUser } from "../auth/useUser";
import { PropertyCard } from "../components/propertyCard.js";
import axios from "axios";

const maxProperties = 3;

export function DisplayProperties() {
  const [userEmail, setUserScreenName] = useState("");
  const [properties, setProperties] = useState([]);

  const navigate = useNavigate();
  const addProperty = () => navigate("/addProperty");
  const viewProperty = (id) => navigate("/taskList/" + id);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

  const user = UseUser();

  const fetchProperties = async () => {
    const { userID } = user;
    const result = await axios.get(`/api/getUserProperties/${userID}`);
    if (result.data.userProperties) {
      setProperties(result.data.userProperties);
    } else {
      setProperties([]);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handlePlural = (properties, maxProperties) => {
    if (maxProperties - properties.length === 1) {
      return " Free Property Remaining";
    } else {
      return " Free Properties Remaining";
    }
  };

  useEffect(() => {
    const { email, name } = user;
    if (name) {
      setUserScreenName(name);
    } else setUserScreenName(email);
  }, [user]);

  const handleDeleteProperty = async (propertyID) => {
    try {
      await axios.delete(`/api/deleteProperty`, {
        data: {
          propertyID,
        },
      });
      // Refresh properties after deletion
      alert("Property removed succesfully");
      fetchProperties();
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  return (
    <Container className="container main">
      {/* Only to show usage of useUser. */}
      <h1 className="mb-3 p-3 blue-header">{userEmail}'s Properties</h1>
      <Row xs={1} md={2} className="g-4">
        {properties.map((property) => {
          return (
            <Col key={property.id}>
              <PropertyCard
                property={property}
                onDelete={() => handleDeleteProperty(property.propertyID)}
              />
            </Col>
          );
        })}
        <Col>
          <Card className="m-5 text-center green-border">
            <Card.Body className="align-items-center">
              <Card.Title className="blue-header p-1">
                {maxProperties -
                  properties.length +
                  handlePlural(properties, maxProperties)}
              </Card.Title>
              <Button
                type="submit"
                className="mx-2 green-button"
                onClick={addProperty}
              >
                Add a Property
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
