import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { useHistory } from "react-router";
import { Container, Row, Col, Form, Button} from 'react-bootstrap';
import { Link } from "react-router-dom";
import axios from "axios";


const Profile = () => {

    const [loading, setLoading] = useState(true);
    const [userProfile, setProfile] = useState({});
    const history = useHistory();
    const [userImageLink, setUserImageLink] = useState('');

    const [image, setImage] = useState(null);

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
                console.log(data.user);
                setProfile(data.user);
                setLoading(false);
                setUserImageLink(data.user.avatar);
            });
    }, [history]);

    const handleProfileImageUpdate = () => {
        console.log(image)
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
        const formData = new FormData();
        // Just sending the data as body won't work for files.
        try {
            formData.append('image', image, image.name);
            axios.post("http://localhost:5000/profile/uploadPhoto", 
                formData,
                {headers: headers}
            )
                .then((res) => {
                    console.log(res);
                    setUserImageLink(res.data.uploadResult.url);
                    // setProfile(data);
                    // setLoading(false);
                });
        }
        catch(err) {
            alert("Image is not uploaded");
        }

    }

    const updateProfileImage = (e) => {
        console.log(e.target.files[0])
        setImage(e.target.files[0]);
    }


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
                        {console.log(userProfile.name)}
                        <Container>
                            <Row>
                                <Col>
                                    <img src={userImageLink} alt="profile pic" />
                                </Col>
                                <Col>
                                    <h1 style={{ color: "white" }}>User Profile</h1>
                                    <Form className="form">

                                        <Form.Group controlId="formCategory1">
                                            <Form.Label style={{ color: "white" }}>Username</Form.Label>
                                            <Form.Control disabled type="text" defaultValue={userProfile.name} />
                                        </Form.Group>

                                        <Form.Group controlId="formCategory2">
                                            <Form.Label style={{ color: "white" }}>Email</Form.Label>
                                            <Form.Control disabled type="email" defaultValue={userProfile.email} />
                                        </Form.Group>

                                        <Form.Group controlId="formCategory4">
                                            <Form.Label style={{ color: "white" }}>Profile Image</Form.Label>
                                            <Form.Control type="file" name="image" onChange={updateProfileImage} />
                                        </Form.Group>

                                        <Button variant="primary" onClick={handleProfileImageUpdate} >Update Profile</Button>

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