
import './App.css';
import Sidebar from './components/sidebar';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import { Navbar, Container, Row } from 'react-bootstrap';
import logo from './logo.svg';

// const ApplicationDrawer = (props) => {
//   const [open, setOpen] = useState(false);

//   const handleToggle = () => setOpen(!open);

//   return (
//     <Drawer {...props}>
//       <h1>test</h1>
//       <Drawer.Toggle onClick={handleToggle} />

//       <Collapse in={open}>
//         <Drawer.Overflow>
//           <Drawer.ToC>
//             <Drawer.Header href="/">Application</Drawer.Header>

//             <Drawer.Nav>
//               <Drawer.Item href="/settings">Settings</Drawer.Item>
//             </Drawer.Nav>
//           </Drawer.ToC>
//         </Drawer.Overflow>
//       </Collapse>
//     </Drawer>
//   );
// };


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {


    return (


      // <>
      //   <div className="App">
      //     <Navbar bg="dark" expand="lg">
      //       <Container>
      //         <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
      //         <Navbar.Toggle aria-controls="basic-navbar-nav" />
      //         <Navbar.Collapse id="basic-navbar-nav">
      //           <Nav className="me-auto">
      //             <Nav.Link href="#home">Home</Nav.Link>
      //             <Nav.Link href="#link">Link</Nav.Link>
      //             <NavDropdown title="Dropdown" id="basic-nav-dropdown">
      //               <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
      //               <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
      //               <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
      //               <NavDropdown.Divider />
      //               <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      //             </NavDropdown>
      //           </Nav>
      //         </Navbar.Collapse>
      //       </Container>
      //     </Navbar>
      //     <Container fluid>
      //       <Row className="flex-xl-nowrap">
      //         <Col as={ApplicationDrawer} xs={12} md={3} lg={2} />
      //         {/* <Col xs={12} md={9} lg={10}>Test</Col> */}
      //       </Row>
      //     </Container>


      //     <header className="App-header">
      //       Test
      //     </header>
      //   </div>
      // </>

      // <>



      <>
        <Router>
          <div className="App">



            {/* <Navbar bg="dark" variant="dark">
              <Container>
                <Navbar.Brand href="#home">
                  <img
                    alt=""
                    src={logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                  />{' '}
                  GoCode
                </Navbar.Brand>
              </Container>
            </Navbar> */}
            <nav class="navbar navbar-custom">
              <div class="container">
                <h1 style={{ color: 'white' }}>GoCoDe</h1>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse " id="navbarResponsive">
                  <ul class="navbar-nav ml-auto navbar-left">

                    <li class="nav-item">
                      <a class="nav-link" href="/about">About</a>
                    </li>

                    <li class="nav-item">
                      <a class="nav-link" href="/contact">Contact</a>
                    </li>
                    <img class="rounded-circle article-img" src="https://media.istockphoto.com/photos/middle-age-man-portrait-picture-id1285124274?b=1&k=20&m=1285124274&s=170667a&w=0&h=tdCWjbu8NxR_vhU3Tri7mZcfUH6WdcYWS1aurF4bbKI=" id="img" width="70"
                      height="60"></img>

                  </ul>
                </div>
                <Row >
                  <p style={{ color: 'white', paddingTop: '20px' }}>About</p>
                  <p style={{ color: 'white', paddingLeft: '20px', paddingRight: '30px', paddingTop: '20px' }}>Contact</p>
                  <img class="rounded-circle article-img" src="https://media.istockphoto.com/photos/middle-age-man-portrait-picture-id1285124274?b=1&k=20&m=1285124274&s=170667a&w=0&h=tdCWjbu8NxR_vhU3Tri7mZcfUH6WdcYWS1aurF4bbKI=" id="img" width="70"
                    height="60"></img>
                </Row>
              </div>
            </nav>



            <Sidebar />





          </div>
        </Router >
      </>
    );


  }
}

export default App;
