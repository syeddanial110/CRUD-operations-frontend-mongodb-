import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
const UserModel = (props) => {
  
  const {user, closeModel,  show, createUser, createUserForm,onChangeHandler } = props;

  const { firstName, lastName, age, gender } = createUserForm;
  const userExist = Object.keys(user).length > 0;
  return (
    <>
      
      <Modal show={show} onHide={closeModel}>
        <Form onSubmit={createUser}>
          <Modal.Header closeButton>
            <Modal.Title>User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="Enter First Name" name="firstName" value={user.firstName} onChange={onChangeHandler} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Last Name" name="lastName" value={user.lastName} onChange={onChangeHandler} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Age</Form.Label>
              <Form.Control type="text" placeholder="Enter your age" name="age" value={user.age} onChange={onChangeHandler} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Gender</Form.Label>
              <Form.Control type="text" placeholder="Enter gender" name="gender" value={user.gender} onChange={onChangeHandler} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit" >
              Submit 
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default UserModel;
