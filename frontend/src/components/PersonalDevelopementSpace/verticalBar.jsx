import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useHistory } from "react-router";
import ReactLoading from "react-loading";
import { domain } from "../../constants/config";
const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const VerticalBar = () => {
  const [pvtData, setpvtData] = useState({});
  const [tags, settags] = useState([]);
  const [nop, setnop] = useState([]);
  const [rc, setrc] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem("profile"));
    if (storage === null) {
      history.push("/auth");
      return;
    }
    let token = storage.token;
    console.log(token);
    const headers = {
      "Content-Type": "application/json;charset=UTF-8",
      "Authorization": `Bearer ${token}`,
    };
    fetch(`${domain}/api/pds`, {
      method: "GET",
      headers: headers,
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        // console.log(typeof data);

        //console.log(test);

        // let keys = [...test.keys()];
        // console.log(keys);

        // data.map((o) => console.log(o.value));

        setpvtData(data);
        let ttag = Object.entries(data).map((el) => el[0]);
        let tnop = Object.entries(data).map((el) => el[1]);
        let trc = [];

        for (let i = 0; i < ttag.length; i++) {
          trc.push(getRandomColor());
        }

        console.log(ttag);
        settags(ttag);
        setnop(tnop);
        console.log(trc);
        setrc(trc);
        console.log(rc);
        setLoading(false);
      });
  }, []);

  const loadingOptions = {
    type: "spin",
    color: "#347deb",
  };
  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  const data = {
    labels: tags,
    datasets: [
      {
        label: "no of problems solved",
        data: nop,
        // backgroundColor: rc,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
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
          <div className="header">
            <h1 className="title" style={{ color: "white" }}>
              Problems Vs Tags
            </h1>
          </div>

          <Bar data={data} options={options} height="500rem" width="0.5" />
        </>
      )}
    </>
  );
};

export default VerticalBar;
