const handler = async(req, res) =>{
    // const keyword = req.bod.keyword;
    const keyword = req.query['keywords'];
    //console.log(keyword);
    // ebay API credentials 
    const OPERATION_NAME = process.env.REACT_APP_OPERATION_NAME
    const SECURITY_APPNAME = process.env.REACT_APP_SECURITY_APPNAME

    // ebay header
    const headerOptions = {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'X-EBAY-SOA-OPERATION-NAME': OPERATION_NAME,
          'X-EBAY-SOA-SECURITY-APPNAME': SECURITY_APPNAME,
          'X-EBAY-SOA-RESPONSE-DATA-FORMAT': 'JSON',
          'X-EBAY-SOA-GLOBAL-ID': 'EBAY-US',
          'SERVICE-VERSION': '1.0.0',
          'paginationInput.entriesPerPage': '1',
          'REST-PAYLOAD': ''
        }
      }
    const url = new URL('https://svcs.ebay.com/services/search/FindingService/v1');
    // Attach keywords to url as query params 
    url.searchParams.append('keywords', keyword);
    const response = await fetch(url, headerOptions);
    const data = await response.json();
  return res.end(JSON.stringify(data));
}

export default handler