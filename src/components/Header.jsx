import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import { useState } from "react";

import Modal from "react-bootstrap/Modal";
import { postData } from "../services/AllApis";
import Swal from "sweetalert2";

const Header = ({ datasBooks, setDataBooks, displayBooks }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addbooks = () => {
    handleShow();
  };

  const availableBook = () => {
    setDataBooks({ ...datasBooks, available: !datasBooks.available });
  };

  const addbooksDisplay = async (reqbody) => {
    try {
      if (
        (datasBooks.title == "") |
        (datasBooks.author == "") |
        (datasBooks.genre == "") |
        (datasBooks.year == "")
      ) {
        Swal.fire({
          icon: "error",
          title: "ERROR",
          text: "Complete all the text field",
        });
      } else {
        let aresponse = await postData(reqbody);
        console.log(aresponse);

        if (aresponse.status == 201) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Added Successfully",
          });
          handleClose();
          displayBooks();
        }
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: "ERROR occured",
      });
    }
  };

  return (
    <>
      <Navbar className="bg-body-secondary justify-content-between navbarmegaparent">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="https://icon2.cleanpng.com/lnd/20241012/yz/93a5a24fc736575da02f2e08cf2f75.webp"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Library Management
          </Navbar.Brand>
          <Form>
            <Row>
             
              <Col xs="auto">
                <Button onClick={addbooks}>ADD BOOKS</Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </Navbar>

      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Enter Book Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            onChange={(e) =>
              setDataBooks({ ...datasBooks, title: e.target.value })
            }
            placeholder="Enter Book Title"
            className="form-control mt-2"
            type="text"
          />
          <input
            onChange={(e) =>
              setDataBooks({ ...datasBooks, author: e.target.value })
            }
            placeholder="Enter Author Name"
            className="form-control mt-2"
            type="text"
          />
          <input
            onChange={(e) =>
              setDataBooks({ ...datasBooks, genre: e.target.value })
            }
            placeholder="Enter Genre"
            className="form-control mt-2"
            type="text"
          />
          <input
            onChange={(e) =>
              setDataBooks({ ...datasBooks, year: e.target.value })
            }
            placeholder="Year Published"
            className="form-control mt-2 mb-2"
            type="number"
          />

          {datasBooks.available ? (
            <button className="btn btn-success" onClick={availableBook}>
              Book Available
            </button>
          ) : (
            <button className="btn btn-danger" onClick={availableBook}>
              Not available
            </button>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              addbooksDisplay(datasBooks);
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Header;
