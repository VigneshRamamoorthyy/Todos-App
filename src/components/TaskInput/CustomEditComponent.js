import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function CustomEditComponent(props) {
  const { getId, onHide, updateTask } = props;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Fetch and populate form fields with task details when component mounts
  useEffect(() => {
    const todosList = JSON.parse(localStorage.getItem("todosList"));
    const todoItem = todosList.find((item) => item.id === getId);

    if (todoItem) {
      setTitle(todoItem.title);
      setDescription(todoItem.description);
    }
  }, [getId]);

  // Handle saving edited task details
  const handleSave = () => {
    let todosList = JSON.parse(localStorage.getItem("todosList"));
    const index = todosList.findIndex((item) => item.id === getId);

    // Update task details in local storage
    todosList[index].title = title;
    todosList[index].description = description;
    localStorage.setItem("todosList", JSON.stringify(todosList));

    // Update task details in parent component
    updateTask(todosList[index]);

    // Close the modal
    onHide();
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Edit Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group">
            <label htmlFor="editTitle">Title</label>
            <input
              type="text"
              className="form-control"
              style={{ marginBottom: "10px" }}
              id="editTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="editDescription">Description</label>
            <textarea
              className="form-control"
              id="editDescription"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        {/* Button to save changes */}
        <Button onClick={handleSave}>Save</Button>
        {/* Button to cancel and close the modal */}
        <Button onClick={onHide}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CustomEditComponent;
