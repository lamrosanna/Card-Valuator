import React, {useEffect, useState} from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'; 
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import '../styles/Home.module.css'

// error messages 
const REQUEST_FAILURE = `There was an error in retrieving your results`;
const REQUEST_ERROR = `There was an error in processing your request`;
const NO_RESULTS = `No results were found for your request`;

// Removes empty/unused values from form 
function removeEmptyvalues(obj) {
  return obj.filter(filterform => filterform.name.trim().length > 0);
}

// create an encoder for a list 
// 

const EbayForm = () => {

  const [formValues, setFormValues] = useState([{ name: ""}])
  const [ebayData, setebayData] = useState([]);
  const [apiResult, setApiresult] = useState();
    
  const callEbayapi= async(keywordList) => {
    const headerOptions = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        }
    }
    const url = `/api/ebayHandler` ;
    try{
      let response = await fetch(url, headerOptions);
      let datares = await response.json();
      let status = datares.findItemsByKeywordsResponse[0].ack.toString().toLowerCase();
      let count = datares.findItemsByKeywordsResponse[0].searchResult[0]["@count"];
      
      //let callStatus = status
      setebayData(status);
      //console.log(datares);
      //console.log(callStatus);
      if (status != 'success'){
        setApiresult(REQUEST_FAILURE);
      }else if (status == 'success' && count == 0 ){
        setApiresult(NO_RESULTS)
      }else{
        setApiresult('Return results');
      }
      //return(status)
      // console.log(ebayData);
      }
    catch(error){
      console.error(`${REQUEST_ERROR} :${error.message}`);
    }

  }

  useEffect(() => {
    console.log(ebayData);}, [ebayData]);

  let handleChange= (i, e) => {
    let newformValues = [...formValues];
    newformValues[i][e.target.name] = e.target.value;
    setFormValues(newformValues);
  }

  let handleSubmit = (event) => {
    event.preventDefault();
    //check if fields are filled if not, remove them from array
    let cardInput = removeEmptyvalues(formValues);
    callEbayapi(cardInput); 
    //console.log(ebayData);
  }

  let addFormFields = () => {
    setFormValues([...formValues, { name: ""}])
  }
    
  return(
    <Container fluid style={{"height":"80%"}}>
      <title>Card Value</title>
      <Form onSubmit={handleSubmit}>
      <Row>
        <Col></Col>
        <Col sm={10}>
        <br></br>
        <br></br>
        <h2>Enter your card names below to get current estimated price</h2>
        <br></br>  
        {formValues.map((element, index) =>
          <Form.Group className="form-inline" key={index} controlId="ebaySubmitform">
            <Form.Label>Name:</Form.Label>
            <Form.Control type="text" name="name" value={element.name || ""} onChange={e => handleChange(index, e)} style={{"width": "100%"}}/>
          </Form.Group>
        )}
        </Col>
        <Col></Col>
      </Row>
      <br></br>
      <Row>
        <Col></Col>
        <Col className="d-flex justify-content-end" sm={10}>
          <Button variant="outline-primary" size="sm" className="button add" type="button" onClick={() => addFormFields()}>Add</Button>{' '}
          <Button variant="primary" size="sm" className="button submit" type="submit">Submit</Button>
        </Col>
        <Col></Col>
      </Row>
      </Form>
      {/* API data results should populate below */}
      <Row>
        <Col></Col>
        <Col sm={10}>
            {apiResult}
        </Col>
        <Col></Col>
      </Row>
    </Container>
  )
}

export default EbayForm
