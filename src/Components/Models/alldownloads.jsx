import { Modal, Row, Col, Container, Button } from "react-bootstrap";
const AllDownloads = (props) => {
  const allItems = props.item.map((item) => {
    const date = item.createdAt.split("T")[0];
    const time = item.createdAt.split("T")[1].split(".")[0];
    return (
      <Row key={item.id}>
        <Col lg={4}>
          <a href={item.url}>url{item.id}</a>
        </Col>
        <Col lg={4}>
          {date}
        </Col>
        <Col lg={4}>
          {time}
        </Col>
      </Row>
    );
  });
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Downloaded files
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="grid-example">
        <Container>
          <Row>
            <Col lg={4}>
              URL
            </Col>
            <Col lg={4} >
              Download Date
            </Col>
            <Col lg={4} >
              Download Time
            </Col>
          </Row>
          <hr />
          {allItems}
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AllDownloads;
