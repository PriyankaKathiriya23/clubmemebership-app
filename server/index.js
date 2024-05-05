const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const membersJson = require('./members.json');

let members = [...membersJson];

const app = express();

const corsOptions = { origin: '*', optionsSuccessStatus: 200 };
app.use(cors(corsOptions));

app.use(bodyParser.json());

const randomNumber = Math.floor(10000 + Math.random() * 90000);

/**
 * @query query: string
 */
app.get('/members', (req, res) => {
  const query = req.query.query;
  if (query) {
    const q = query.toLowerCase();
    const filteredMembers = members.filter(member =>
      member?.name?.toLowerCase()?.includes(q)
    );
    console.log('GET filtered /members');
    res.send(filteredMembers);
    return;
  }
  console.log('GET /members');
  res.send(members);
});

/**
 * @body name: string required
 * @body age: integer
 * @body activities: array[string]
 * @body rating: enum [1-5]
 */
app.post('/members', (req, res) => {
  console.log('POST /members');
  const body = req.body.body;
  if (body) {
    if (!body.name) {
      res.send('Name is required');
      return;
    }
    members.push({
      id: randomNumber,
      activities: [],
      ...body
    });
  }
  res.send(req.body);
});

/**
 * @param id: string required
 * 
 * @body name: string required
 * @body age: integer
 * @body activities: array[string]
 * @body rating: enum [1-5]
 */
app.patch('/members/:id', (req, res) => {
  console.log('PATCH /members');
  const id = req.params.id;
  const body = req.body.body;

  if (body) {
    members = members.map(member => {
      if (member.id === id) {
        return { ...member, ...body };
      }
      return member;
    });
  }
  res.send(req.body);
});

/**
 * @param id: string required
 */
app.delete('/members/:id', (req, res) => {
  console.log('DELETE /members');
  const id = req.params.id;
  
  const memberIndex = members.findIndex(member => member.id === id);
  
  if (memberIndex !== -1) {
    members.splice(memberIndex, 1);
    res.send('Member removed successfully');
  } else {
    res.status(404).send('Member not found');
  }
});

const PORT = 4444;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
