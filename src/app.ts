import express from 'express';
// Paragraph Library background request
const axios = require('axios');
var bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }))
.use(bodyParser.json({ limit: '200mb' }));

app.get('/get', (req: any, res: any)=> {
  const url = 'http://localhost:4000/api/v1/get/data';
  const headers = {
    'Authorization': `Bearer token_is_here`
  }
  axios.get(url,  {headers})
  .then((resp: any) => {
    res.status(200).send(resp['data']);
  })
  .catch((err: any) =>{
    console.log('err', err);
    res.status(400).send({error: {
      ok: false,
      message: 'It was not possible to consult the data'
    }});
  });
})

app.post('/register_customer', (req: any, res: any) => {
  const data = req.body;
    let result: any = {};
    const url = 'http://localhost:4000/api/v1/auth/app/login/';
    const payload = {
        apiKey: 'test-api',
        apiSecret: 'Admin*5'
      };
    
    let token = ''
    // Post request to the api to obtain a token
    axios.post(url, payload)
      .then( (response: any) =>{
        /* the response from the other server is inside a data object
         depending on the response response ['data']. must be added later
         Of the point(.)
        */
        token = response['data'].data.token
        const headers = {
          'Authorization': `Bearer ${token}`
        }
        //request to save a client
        const urlCustomer = 'http://localhost:4000/api/v1/app/customers/new/';
        // the request configuration is sent at the end and between braces {}
        axios.post(urlCustomer, data, {headers})
        .then((resp: any) => {
          res.status(200).send(resp['data']);
        })
        .catch((err: any) =>{
          console.log('err', err);
          res.status(400).send({error: {
            ok: false,
            message: 'The client could not be saved'
          }});
          });
        })
      .catch( (error: any) =>{
        result = error;
        res.status(200).send(result);
      });
  
});

app.put('/put', (req: any, res: any)=> {
  const data = req.body;
  const url = 'http://localhost:4000/api/v1/put/users/1';
  const headers = {
    'Authorization': `Bearer token_is_here`
  }
  axios.put(url, data, {headers})
  .then((resp: any) => {
    res.status(200).send(resp['data']);
  })
  .catch((err: any) =>{
    console.log('err', err);
    res.status(400).send({error: {
      ok: false,
      message: 'It was not possible to update the data'
    }});
  });
})

app.delete('/delete/:id', (req: any, res: any)=> {
  const id = req.params.id;
  const url = `http://localhost:4000/api/v1/delete/users/${id}`;
  const headers = {
    'Authorization': `Bearer token_is_here`
  }
  axios.delete(url, {headers})
  .then((resp: any) => {
    res.status(200).send(resp['data']);
  })
  .catch((err: any) =>{
    console.log('err', err);
    res.status(400).send({error: {
      ok: false,
      message: 'Unable to remove user'
    }});
  });
})


app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});