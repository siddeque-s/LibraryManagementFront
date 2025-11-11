import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { deleteApi, getData, patchApi } from "../services/AllApis";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import Header from "../components/Header";
import "./Home.css"


import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
const Home = () => {
  const [showData, setShowData] = useState([]);
  const [datasBooks, setDataBooks] = useState({
    title: "",
    author: "",
    genre: "",
    year: "",
    available: false,
  });
  const [show, setShow] = useState(false);

  const [editVariableStore, seteditVaeiavle] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    displayBooks();
  }, []);

  const displayBooks = async () => {
    let responseData = await getData();
    console.log(responseData);
    if (responseData.status == 200) {
      setShowData(responseData.data);
    } else {
      Swal.fire({
        title: "error",
        text: "Error in Displaying the books",
        icon: "error",
      });
    }
  };

  const deleteBooks = async (id) => {
    let resdata = await deleteApi(id);
    if (resdata.status == 200) {
      Swal.fire({
        icon: "success",
        title: "SUCCESS",
        text: "Successfully Deleted",
      });
      displayBooks();
    } else {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: "Error in delete",
      });
    }
  };
  const availableBook = () => {
    seteditVaeiavle({ ...editVariableStore, available: !editVariableStore.available });
  };

  const editModalShow = (datas) => {
    handleShow();
    seteditVaeiavle(datas);
  };

  const editSave = async () => {
    let reposense = await patchApi(editVariableStore.id, editVariableStore);
    if (reposense.status == 200) {
      Swal.fire({
        icon: "success",
        title: "SUCCESS",
        text: "Successfully edited",
      });
      displayBooks();
      handleClose();
    } else {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: "Error in edit",
      });
    }
  };

  return (
    <>
      <Header
        datasBooks={datasBooks}
        setDataBooks={setDataBooks}
        displayBooks={displayBooks}
      />
      <h1 className="text-center mt-5 mainHeading">
        LIBRARY MANAGEMENT SYSTEM
      </h1>

      <h3 className="text-center mt-5 SecHeading">ALL BOOKS</h3>
      <Table className="ms-5 mt-3 tableeee" striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Year</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
          
          showData.length>0?showData.map((eachData, index) => (
            <tr key={index}>
              <td className="datseach">{index + 1}</td>
              <td className="datseach">{eachData.title}</td>

              <td className="datseach">{eachData.author}</td>
              <td className="datseach">{eachData.genre}</td>
              <td className="datseach">{eachData.year}</td>
              <td className="datseach">
                {eachData.available ? "Available" : "NotAvailable"}
              </td>
              <td className="datseach">
                <div>
                  <button className="ms-3">
                    <MdDelete
                      onClick={() => deleteBooks(eachData.id)}
                      className="deleteBtn"
                    />
                  </button>
                  <button className="ms-3">
                    <MdModeEdit
                      onClick={() => editModalShow(eachData)}
                      className="Editbtn"
                    />
                  </button>
                </div>
              </td>
            </tr>
          )): 
          
          <div className="text-center py-3">No BooksFound</div>
          
          }
        </tbody>
      </Table>

      <Modal show={show}>
        <Modal.Header>
          <Modal.Title className="headingModalEdit">EDIT BOOK</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mainModalBody">
          <input
          value={editVariableStore.title}
            onChange={(e) =>
              seteditVaeiavle({ ...editVariableStore, title: e.target.value })
            }
            placeholder="Enter Book Title"
            className="inputStyle form-control mt-2"
            type="text"
          />
          <input
          value={editVariableStore.author}
            onChange={(e) =>
              seteditVaeiavle({ ...editVariableStore, author: e.target.value })
            }
            placeholder="Enter Author Name"
            className="inputStyle form-control mt-2"
            type="text"
          />
          <input
          value={editVariableStore.genre}
            onChange={(e) =>
              seteditVaeiavle({ ...editVariableStore, genre: e.target.value })
            }
            placeholder="Enter Genre"
            className="inputStyle form-control mt-2"
            type="text"
          />
          <input
          value={editVariableStore.year}
            onChange={(e) =>
              seteditVaeiavle({ ...editVariableStore, year: e.target.value })
            }
            placeholder="Year Published"
            className="inputStyle form-control mt-2 mb-2"
            type="number"
          />

          {editVariableStore.available ? (
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
          <Button className="editSaveHome" onClick={editSave} variant="primary">
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Home;