import React, { useEffect, useState } from "react";
import UserModel from "../Components/UserModel";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import UpdatedUserModel from "../Components/UpdatedUserModel";
const UserScreen = () => {
  // const [modalShow, setModalShow] = useState(false);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [createUserForm, setCreateUserForm] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
  });
  const { firstName, lastName, age, gender } = createUserForm;

  const [show, setShow] = useState(false);

  const closeModel = () => setShow(false);
  const showModel = () => setShow(true);

  const onChangeHandler = (e) => {
    setCreateUserForm({ ...createUserForm, [e.target.name]: e.target.value });
  };

  useEffect(async () => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/users");
      console.log(data.data.users);
      setUsers(data.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  //   Create User
  async function createUser(e) {
    e.preventDefault();
    try {
      if (firstName !== "" && lastName !== "" && age !== "" && gender !== "") {
        // const {data} = await axios.post(`http://localhost:5000/api/users`)
        const { data } = await axios({
          method: "POST",
          url: "http://localhost:5000/api/users",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
          data: { firstName, lastName, age, gender },
        });

        const abc = setUsers([...users, data.data]);
        console.log(abc, "Abc");
        alert(`You are Successfully created a new user`);
        setCreateUserForm({
          firstName: "",
          lastName: "",
          age: "",
          gender: "",
        });
        closeModel();
      } else {
        alert("please fill out all fields");
      }
    } catch (error) {
      alert(`Error ${error.message}`);
      console.log(error.message);
    }
  }

  // Delete User

  const deleteUser = async (userId) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/users/${userId}`
      );
      if (data.status === "success") {
        alert(`This ${userId} is deleted`);
      }
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  // Update user
  async function updateUser(userId) {
    // e.preventDefault();
    try {
      const { data } = await axios({
        method: "PUT",
        url: `http://localhost:5000/api/users/${userId}`,
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        data: { firstName, lastName, age, gender },
      });
      alert(`user with id: ${userId} successfully updated`);
      setUsers(data.data.users);
      getUsers();
    } catch (error) {
      console.log(error.message);
      alert(`error: ${error.message}`);
    }
  }

  return (
    <>
      <div className="bg-dark p-2">
        <Container className="d-flex justify-content-between mt-3">
          <h1 className="text-light">Users</h1>
          <Button
            className=""
            variant="primary"
            onClick={() => {
              showModel();
              setUser({});
            }}
          >
            Create User
          </Button>
        </Container>
      </div>
      <Container>
        <Row className="d-flex justify-content-center mb-5">
          <Col md={12}>
            <Row className=" d-flex">
              {users &&
                users.length > 0 &&
                users.map((items, index) => {
                  return (
                    <>
                      <Col md={4} className="d-flex mt-5">
                        <Card style={{ width: "18rem" }}>
                          <Card.Body>
                            <ul
                              className="m-0 p-0"
                              style={{ listStyle: "none" }}
                            >
                              <li>
                                <strong>Index:</strong> {index + 1}
                              </li>
                              <li>
                                <strong>Id:</strong> {items._id}
                              </li>
                              <li>
                                <strong>First Name:</strong> {items.firstName}
                              </li>
                              <li>
                                <strong>Last Name:</strong> {items.lastName}
                              </li>
                              <li>
                                <strong>Age:</strong> {items.age}
                              </li>
                              <li>
                                <strong>Gender:</strong> {items.gender}
                              </li>
                            </ul>
                          </Card.Body>
                          <Row className="d-flex m-1">
                            <Col md={6}>
                              <Button
                                size="sm"
                                variant="warning"
                                onClick={() => {
                                  showModel();
                                  setUser(items);
                                  console.log(user, "user");
                                }}
                              >
                                Update User
                              </Button>
                            </Col>
                            <Col md={6} className="d-flex justify-content-end ">
                              <Button
                                size="sm"
                                variant="danger"
                                onClick={() => {
                                  deleteUser(items._id);
                                }}
                              >
                                Delete
                              </Button>
                            </Col>
                          </Row>
                        </Card>
                      </Col>
                    </>
                  );
                })}
            </Row>
          </Col>
        </Row>
        <UserModel
          user={user}
          closeModel={closeModel}
          showModel={showModel}
          show={show}
          createUser={createUser}
          createUserForm={createUserForm}
          onChangeHandler={onChangeHandler}
        />
        <UpdatedUserModel
          updateUser={updateUser}
          user={user}
          closeModel={closeModel}
          showModel={showModel}
          show={show}
          createUserForm={createUserForm}
          onChangeHandler={onChangeHandler}
        />
      </Container>
    </>
  );
};

export default UserScreen;
