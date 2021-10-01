import React from 'react';
import { Row } from 'react-bootstrap';

const NavBar = (props) => {
    return (
        <nav className="navbar navbar-custom">
            <div className="container">
            <h1 style={{ color: 'white' }}>GoCoDe</h1>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse " id="navbarResponsive">
                  <ul className="navbar-nav ml-auto navbar-left">

                    <li className="nav-item">
                      <a className="nav-link" href="/about">About</a>
                    </li>

                    <li className="nav-item">
                      <a className="nav-link" href="/contact">Contact</a>
                    </li>
                    <img className="rounded-circle article-img" src={ props.imageURL } id="img" width="70"
                      height="60"></img>

                  </ul>
                </div>
                <Row >
                  <p style={{ color: 'white', paddingTop: '20px' }}>About</p>
                  <p style={{ color: 'white', paddingLeft: '20px', paddingRight: '30px', paddingTop: '20px' }}>Contact</p>
                  <img className="rounded-circle article-img" src={ props.imageURL } id="img" width="70" height="60"></img>
                </Row>
              </div>
            </nav>
    )
}

export default NavBar;