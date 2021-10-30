import Sidebar from './sidebar'
import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { useHistory } from "react-router";




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

        fetch("http://localhost:5000/profile/friends", { headers: headers })
            .then((data) => data.json())
            .then((data) => {
                // let tempcontests = [];
                // data.forEach((contest) => {
                //   if (contest.isPublic) {
                //     tempcontests.push(contest);
                //   }
                // });

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
            {/* TODO --------------------------------->>> Need to design and put tags and stuff */}
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
                <div style={{
                    display: "flex",
                    flexDirection: "row"
                }}>

                    {/* Need to design */}
                    Profile page
                </div>
            )}
        </>
    );
}

export default Profile;