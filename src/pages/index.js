import React, { useEffect, useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import '../styles/Home.module.css'

// JSON result testing files
import findCompletedItemsResponse from "./results.json";
import rateLimiterror from "./rateLimit.json";

// error messages 
const REQUEST_FAILURE = `There was an error in retrieving your results`;
const REQUEST_ERROR = `There was an error in processing your request`;
const NO_RESULTS = `No results were found for your request`;
const AUTHENTICATION_ERROR = 'There was an error in authrnticating your app';
const RATE_LIMIT = 'Ebay API rate limit has been reached. Please try again later.';

const EbayForm = () => {

  const [formValues, setFormValues] = useState([{ name: "" }])
  const [ebayData, setebayData] = useState({item: "", count: "", average: ""});
  const [apiResult, setApiresult] = useState();

  const averagePrice = arr => arr.reduce((acc, c) => acc + c)/ arr.length;

  // Internal server call 
  const callEbayapi = async (keywords) => {
    const headerOptions = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      }
    }
    // API URL
    const url = new URL(`/api/ebayHandler`, 'http://localhost:3000');
    // encode string to be passed to server
    const urlkeywords = encodeURIComponent(keywords);
    url.searchParams.append('keywords', urlkeywords);
    try {
      const response = await fetch(url, headerOptions);
      const data = await response.json();

      // testing with results.json file
      //const data = findCompletedItemsResponse;
      //const data = rateLimiterror;

      // checking returned data to create user response
      // should this be another function ? 
      if (data.findCompletedItemsResponse){
        const status = await data.findCompletedItemsResponse[0].ack.toString().toLowerCase();
        if (status == 'success') {
          const count = await data.findCompletedItemsResponse[0].searchResult[0]["@count"];
          if (count == 0){
            setApiresult(NO_RESULTS);
          }else{
            const itemPrices = data.findCompletedItemsResponse[0].searchResult[0]["item"].map(price => parseInt(price.sellingStatus[0].currentPrice[0]["__value__"]));
            const itemAverage = averagePrice(itemPrices).toFixed(2);
            setebayData({item:keywords, count:count, average:itemAverage});
          }
        } else{
          setApiresult(REQUEST_ERROR);
        }
      }else{
          const errorMsg = data.errorMessage[0].error[0].subdomain[0];
          switch(errorMsg){
            case "RateLimiter":
              setApiresult(RATE_LIMIT);
              break;
            case "Authentication":
              setApiresult(AUTHENTICATION_ERROR);
              break;
            default:
              setApiresult(REQUEST_ERROR);
              break;
      }
    }
    } catch (error) {
      setApiresult(REQUEST_FAILURE);
       console.error(`${REQUEST_ERROR} :${error.message}`);  
     }
  }

  useEffect(() => {
    console.log(ebayData);
  }, [ebayData]);

  let handleChange = (i, e) => {
    let newformValues = [...formValues];
    newformValues[i][e.target.name] = e.target.value;
    setFormValues(newformValues);
  }

  let handleSubmit = (e) => {
    e.preventDefault();
    // remove whitespace from string input
    const cardInput = formValues[0].name.trim();
    if (cardInput.length != 0){
      // call to internal server
      callEbayapi(cardInput);
    }
  }

  return (
    <Container fluid style={{ "height": "80%" }}>
      <title>Card Value</title>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col></Col>
          <Col sm={10}>
            <br></br>
            <br></br>
            <h2>Enter your card name below to get current estimated price from Ebay</h2>
            <h4>e.g "Origin Forme Palkia V - 167/189 - PSA 10"</h4>
            <br></br>
            {formValues.map((element, index) =>
              <Form.Group className="form-inline" key={index} controlId="ebaySubmitform">
                <Form.Label>Name:</Form.Label>
                <Form.Control type="text" name="name" value={element.name || ""} onChange={e => handleChange(index, e)} style={{ "width": "100%" }} required/>
              </Form.Group>
            )}
          </Col>
          <Col></Col>
        </Row>
        <br></br>
        <Row>
          <Col></Col>
          <Col className="d-flex justify-content-end" sm={10}>
            <Button variant="primary" size="sm" className="button submit" type="submit">Submit</Button>
          </Col>
          <Col></Col>
        </Row>
      </Form>
      {/* API data results should populate below */}
      <Row>
        <Col></Col>
        <Col sm={10}>
          {apiResult ? apiResult: null}
          {ebayData.average ? <p>{ebayData.item}'s value over {ebayData.count} sales is averaged at ${ebayData.average}</p>: null}
        </Col>
        <Col></Col>
      </Row>
    </Container>
  )
}

export default EbayForm
