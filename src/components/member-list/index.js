import React, { useState, useEffect } from "react";
import axios from 'axios';
import styled from 'styled-components';
import { Button, Container, Form, Modal, Row, Col, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

// Define the Rows component
export const Rows = ({ id, age, name, activities, rating, handleDeleteMember, handleEdit, isEditable }) => (
  <tr key={id}>
    <Cell contentEditable={isEditable}>{name}</Cell>
    <Cell>{age}</Cell>
    <Cell>{rating}</Cell>
    <Cell>
      {activities.map((activity, i) => (
        <div className="activityData" key={i}>{activity}</div>
      ))}
    </Cell>
    <Cell>
      <Button variant="info" size="sm" style={btnStyle} onClick={() => handleEdit(id)}>Edit</Button>
      <Button variant="danger" size="sm" onClick={() => handleDeleteMember(id)}>Delete</Button>
    </Cell>
  </tr>
);

const btnStyle = {
  marginRight:"10px"
}

const headerStyle = {
  fontFamily: 'arial',
  paddingTop: '16px',
  textTransform: 'uppercase',
  fontWeight: '700',
  color: 'gray'
}

const getData = async setMembers => {
  try {
    const res = await axios.get('http://localhost:4444/members');
    setMembers(res.data);
  } catch(err)  {
    console.log('ERROR', err);
  }
};

const Block = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
  padding: 0 5rem;
`;

const Filters = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 1rem 0;
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
`;

const Table = styled.table`
  width: calc(100% - 10rem);
  padding: 0 5rem;
  max-width: 100%;
  background: #fff;
  border-radius: 5px;
  border-collapse: collapse;
  box-shadow: 0px 1px 5px 2px #d3d1d1;
`;

export const Thead = styled.thead`
  background: lightgrey;
`;

const TH = styled.th`
  padding: 0.5rem;
  text-align: center;
  cursor: pointer;
`;

const Cell = styled.td`
  padding: 0.5rem;
  text-align: center;
`;

export const ModalPopup = ({ show, handleClose, handleAddMember }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    rating: "",
    activities: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        activities: [...formData.activities, id],
      });
    } else {
      setFormData({
        ...formData,
        activities: formData.activities.filter((activity) => activity !== id),
      });
    }
  };

  const handleSave = () => {
    handleAddMember(formData); // Pass form data to the function to add member
    handleClose();
    setFormData({
      name: '',
      age: '',
      rating: '',
      activities: [],
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Club Member</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter member Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              autoFocus
            />
          </Form.Group>

          <Container>
            <Row>
              <Col style={{ paddingLeft: '0' }}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Age</Form.Label>
                  <Form.Select
                    noPaddingLeft
                    aria-label="Select Age"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                  >
                    {[...Array(100).keys()].map((num) => (
                      <option key={num + 1} value={num + 1}>{num + 1}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col style={{ paddingRight: '0' }}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Member Ratings</Form.Label>
                  <Form.Select
                    aria-label="Select Age"
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                  >
                    {[...Array(5).keys()].map((num) => (
                      <option key={num + 1} value={num + 1}>{num + 1}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Container>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Add Activities</Form.Label>
            <div>
              <Form.Check
                type="checkbox"
                id="hiking"
                label="Hiking"
                onChange={handleCheckboxChange}
              />
              <Form.Check
                type="checkbox"
                id="biking"
                label="Biking"
                onChange={handleCheckboxChange}
              />
              <Form.Check
                type="checkbox"
                id="running"
                label="Running"
                onChange={handleCheckboxChange}
              />
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary"
          onClick={() => {
            setFormData({
              name: '',
              age: '',
              rating: '',
              activities: [],
            });
            handleClose();
          }}>Close</Button>
        <Button variant="primary" onClick={handleSave}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
};


export const SearchBar = ({ setSearchInput, setSearchRating, setActivityChange }) => {
  const handleInputChange = (e) => setSearchInput(e.target.value);
  const handleRatingChange = (e) => setSearchRating(e.target.value);
  const handleActivityChange = (e) => setActivityChange(e.target.value);

  return (
      <Filters>
        <Container style={{ marginLeft: '0', paddingLeft:'0' }}>
            <Row>
              <Col>
                <input type="text" placeholder="Search for a member" onChange={handleInputChange} style= {{ height:'100%', width:'100%' }}/>
              </Col>
              <Col>
              <Select onChange={handleRatingChange} defaultValue="">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Select>
              </Col>
              <Col style={{ paddingRight: '0' }}>
                <input type="text" placeholder="Filter by activity" onChange={handleActivityChange} style= {{ height:'100%', width:'100%' }}/>
              </Col>
          </Row>
        </Container>
      </Filters>
  );
};

const MemberList = () => {
  const [members, setMembers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchRating, setSearchRating] = useState("");
  const [activityChange, setActivityChange] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortColumn, setSortColumn] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editableRowId, setEditableRowId] = useState(null);

  useEffect(() => {
    getData(setMembers);
  }, []);

  const sortByName = () => {
    const sortedMembers = [...members].sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      return sortDirection === "asc" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });
    setMembers(sortedMembers);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    setSortColumn("name");
  };

  const sortByActivities = () => {
    const sortedMembers = [...members].sort((a, b) => {
      const activitiesA = a.activities.join("").toUpperCase();
      const activitiesB = b.activities.join("").toUpperCase();
      return sortDirection === "asc" ? activitiesA.localeCompare(activitiesB) : activitiesB.localeCompare(activitiesA);
    });
    setMembers(sortedMembers);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    setSortColumn("activities");
  };

  const renderSortIcon = (column) => {
    if (sortColumn === column) {
      return sortDirection === "asc" ? "▲" : "▼";
    }
    return null;
  };

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleAddMember = async (prop) => {
    try {
      const res = await axios.post('http://localhost:4444/members', {
        body: {
          ...prop,
          id: Math.floor(Math.random() * 1000),
        },
      });

      setMembers([...members, res.data.body]);
    } catch (err) {
      console.log('ERROR', err);
    }
    setShowModal(false);
  };

  const handleDeleteMember = async (id) => {
    try {
      await axios.delete(`http://localhost:4444/members/${id}`);
      setMembers(members.filter((member) => member.id !== id));
    } catch (err) {
      console.log('ERROR', err);
    }
  };

  const handleEdit = (id) => {
    setEditableRowId(id);
  };

  return (
    <Block>
      <div className="header-block" style={{ position:'relative'}}>
        <h1 style ={headerStyle}>My Club's Members</h1>
        <Button variant="primary" onClick={handleShowModal} className="addMember" style ={{width:'200px', position:'absolute', right:'0',top:'15px'}}>Add Club Member</Button>
      </div>
      <ModalPopup show={showModal} handleClose={handleCloseModal} handleAddMember={handleAddMember} />
      <SearchBar setSearchInput={setSearchInput} setSearchRating={setSearchRating} setActivityChange={setActivityChange} />
      <Table className="table" style={{width:'100%'}}>
        <Thead>
          <tr>
            <TH onClick={sortByName}>Name {renderSortIcon("name")}</TH>
            <TH>Age</TH>
            <TH>Member Rating</TH>
            <TH onClick={sortByActivities}>Activities {renderSortIcon("activities")}</TH>
            <TH></TH>
          </tr>
        </Thead>
        <tbody>
          {members
            .filter((member) => member.name.toLowerCase().includes(searchInput.toLowerCase()))
            .filter((member) => searchRating === "" || member.rating === parseInt(searchRating))
            .filter((member) => activityChange === "" || member.activities.some(activity => activity.toLowerCase().includes(activityChange.toLowerCase())))
            .map((member, index) => (
              <Rows
                key={index}
                {...member}
                handleDeleteMember={handleDeleteMember}
                handleEdit={handleEdit}
                isEditable={member.id === editableRowId} // Check if the row is editable
              />
            ))}
        </tbody>
      </Table>    
    </Block>
  );
};

export default MemberList;