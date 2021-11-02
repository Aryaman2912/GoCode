import React, { Component } from "react";
import DoughnutChart from "./doughnut";
import VerticalBar from "./verticalBar";
import { Row } from "react-grid-system";

const Pds = () => {
  return (
    <>
      <div>
        <VerticalBar />
      </div>
      <div>
        {/* <Row>
          <DoughnutChart />
        </Row> */}
      </div>
    </>
  );
};

export default Pds;
