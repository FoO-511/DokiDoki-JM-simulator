import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { withRouter } from "react-router";

const Header = (props) => {
  const { location } = props;
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">JM Simulator</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" activeKey={location.pathname} variant="dark">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/talk">Talk</Nav.Link>
            <NavDropdown title="🔔" id="basic-nav-dropdown">
              <NavDropdown.Item href="/links">제공받은 링크들</NavDropdown.Item>
              <NavDropdown.Item href="/logs">로그</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/secret">
                종민의 비밀일기
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
const HeaderWithRouter = withRouter(Header);

export default HeaderWithRouter;
