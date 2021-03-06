import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Api from "../Conexion";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

const Adicionales = () => {
  const [datos, verDatos] = useState([]);
  const [adicional, setAdicional] = useState({
    form: {
      nombre: "",
      costo: "",
    },
  });
  const [dato, setDato] = useState({});

  const [show, setShow] = useState(false);
  const desplegar = () => setShow(true);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    Api.authenticate()
      .then(() => {
        getAdicionales();
      })
      .catch(() => {});
  }, []);

  const getAdicionales = () => {
    Api.service("adicionales")
      .find()
      .then((data) => verDatos(data));
  };

  const handleChange = (e) => {
    setAdicional({
      form: {
        ...adicional.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  const editar = (dato) => {
    setDato(dato);
    desplegar();
    setAdicional(dato);
  };

  const editarAdicional = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);

    Api.service("adicionales")
      .patch(dato.id, adicional.form)
      .then(() => {
        getAdicionales();
        limpiar();
      })
      .catch((error) => error);
  };

  const limpiar = () => {
    setAdicional({
      form: {
        nombre: "",
        costo: "",
      },
    });
    setShow(false);
    setDato({});
    setValidated(false);
  };

  return (
    <div>
      <div>
        <h1 className="text-center"> Adicionales </h1>
        <br />
        <div className="container">
          <div>
            <Modal show={show} onHide={limpiar}>
              <Modal.Header closeButton>
                <Modal.Title>Editar</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form noValidate validated={validated}>
                  <Form.Group as={Col}>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      onChange={handleChange}
                      name="nombre"
                      value={adicional.nombre}
                      disabled
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="validacionCosto">
                    <Form.Label>Costo</Form.Label>
                    <Form.Control
                      required
                      onChange={handleChange}
                      name="costo"
                      value={adicional.costo}
                    />
                    <Form.Control.Feedback type="invalid">
                      Este campo es obigatorio
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={limpiar}>
                  Cancelar
                </Button>
                <Button variant="primary" onClick={editarAdicional}>
                  Guardar
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          <div>
            <Table responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Costo</th>
                  <th>Accion</th>
                </tr>
              </thead>
              <tbody>
                {datos.data &&
                  datos.data.map((dato, num) => {
                    return (
                      <tr key={dato.id}>
                        <td>{num + 1}</td>
                        <td>{dato.nombre}</td>
                        <td>{dato.costo}</td>
                        <td>
                          <Button variant="link" onClick={() => editar(dato)}>
                            Editar
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adicionales;
