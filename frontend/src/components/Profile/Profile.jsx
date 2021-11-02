import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { useHistory } from "react-router";
import { Container, Row, Col, Form, Button} from 'react-bootstrap';
import { Link } from "react-router-dom";
const Profile = () => {

    const [loading, setLoading] = useState(true);
    const [userProfile, setProfile] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const storage = JSON.parse(localStorage.getItem('profile'))
        if (storage === null) {
            history.push('/auth')
            return
        }
        let token = storage.token
        const headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': `Bearer ${token}`
        }
        console.log(token);
        fetch("http://localhost:5000/profile/", { headers: headers })
            .then((data) => data.json())
            .then((data) => {
                console.log(data);
                setProfile(data);
                setLoading(false);
            });
    }, []);
    const loadingOptions = {
        type: "spin",
        color: "#347deb",
    };
    return (
        <>
            {loading ? (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "90vh",
                    }}
                >
                    <ReactLoading
                        type={loadingOptions.type}
                        color={loadingOptions.color}
                        height={100}
                        width={100}
                    />
                </div>
            ) : (
                <><div>
                        {console.log(userProfile['user'].name)}
                        <Container>
                            <Row>
                                <Col>
                                    <img src="https://www.computerhope.com/jargon/g/guest-user.jpg" alt="profile pic" />
                                </Col>
                                <Col>
                                    <h1 style={{ color: "white" }}>User Profile</h1>
                                    <Form className="form">

                                        <Form.Group controlId="formCategory1">
                                            <Form.Label style={{ color: "white" }}>Username</Form.Label>
                                            <Form.Control type="text" defaultValue={userProfile['user'].name} />
                                        </Form.Group>

                                        <Form.Group controlId="formCategory2">
                                            <Form.Label style={{ color: "white" }}>Email</Form.Label>
                                            <Form.Control type="email" defaultValue={userProfile['user'].email} />
                                        </Form.Group>

                                        <Form.Group controlId="formCategory4">
                                            <Form.Label style={{ color: "white" }}>Profile Image</Form.Label>
                                            <Form.Control type="file" name="profileImage" />
                                        </Form.Group>

                                        <Button variant="primary">Update Profile</Button>

                                    </Form>
                                </Col>
                            </Row>
                        </Container>
                    </div><div style={{ display: "flex", justifyContent: "center", marginTop:"12rem" }}>
                            <Link to={"profile/friends"}>
                                <Button
                                    style={{
                                        color: "white",
                                        padding: "0.7rem ",
                                        borderColor: "white",
                                        marginLeft: "auto",
                                        background: "#006633",
                                        width: "8rem"
                                    }}
                                    variant="outlined"
                                >
                                    Friends
                                </Button>
                            </Link>
                            <Link to={"profile/contests"}>
                                <Button
                                    style={{
                                        color: "white",
                                        padding: "0.7rem ",
                                        borderColor: "white",
                                        marginLeft: "8rem",
                                        background: "#006633",
                                        width: "8rem"
                                    }}
                                    variant="outlined"
                                >
                                    Contests
                                </Button>
                            </Link>
                            <Link to={"profile/problems"}>
                                <Button
                                    style={{
                                        color: "white",
                                        padding: "0.7rem ",
                                        borderColor: "white",
                                        marginLeft: "8rem",
                                        background: "#006633",
                                        width: "8rem",
                                    }}
                                    variant="outlined"
                                >
                                    Problems
                                </Button>
                            </Link>
                        </div></>
            )}
        </>
    );
}

export default Profile;