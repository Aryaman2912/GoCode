import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { useHistory } from "react-router";
import { Button} from 'react-bootstrap';
import { Link } from "react-router-dom";


const Profile = () => {

    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const [problems, setProblems] = useState([]);


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
        fetch("http://localhost:5000/profile/problems", { headers: headers })
            .then((data) => data.json())
            .then((data) => {
                console.log(data);
                
                let problemIDs = [];
                data.forEach(problem => {
                    problemIDs.push(problem.problemID)
                });

                const uniqueIDs = new Set(problemIDs);
                console.log(uniqueIDs)
                setProblems([...uniqueIDs]);
                
                setLoading(false);
            });
    }, [history]);


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
                <>
                <h1> Attempted Problems </h1>
                {
                    problems.map((id, i) => {
                        return (
                            <div key={i}>
                                <Link to={`/submissions/${id}`}>
                                    <Button variant="primary">{id}</Button>
                                </Link>
                            </div>
                        )
                    })
                }
                </>
            )}
        </>
    );
}

export default Profile;