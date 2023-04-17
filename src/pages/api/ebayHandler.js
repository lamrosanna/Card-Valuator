const handler = async(req, res) =>{
    // const keyword = req.bod.keyword;

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
          'paginationInput.entriesPerPage': '3',
          'REST-PAYLOAD': ''
        }
      }

    // ebay url 
    // 'https://svcs.sandbox.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=RosannaL-cardvalu-SBX-c2e2968b1-9fbb1f02&RESPONSE-DATA-FORMAT=JSON&keywords=pokemon&paginationInput.entriesPerPage=2&itemFilter.name=SOLD_ITEMS_ONLY&itemFilter.value=true&REST-PAYLOAD'
    // 
    const url = new URL('https://svcs.sandbox.ebay.com/services/search/FindingService/v1');
    // url.searchParams.append('OPERATION-NAME', 'findItemsByKeywords');
    // url.searchParams.append('SERVICE-VERSION', '1.0.0');
    // url.searchParams.append('SECURITY-APPNAME', 'RosannaL-cardvalu-SBX-c2e2968b1-9fbb1f02');
    // url.searchParams.append('RESPONSE-DATA-FORMAT', 'JSON');
    // url.searchParams.append('paginationInput.entriesPerPage', '2');
    // url.searchParams.append('itemFilter.name', 'SOLD_ITEMS_ONLY');
    // url.searchParams.append('itemFilter.value', 'true');
    // url.searchParams.append('REST-PAYLOAD', '');
       url.searchParams.append('keywords', 'POKEMON');
    // , headerOptions
    // fetch ebay api 
    const response = await fetch(url, headerOptions);
    const data = await response.json();

    return res.end(JSON.stringify(data));
}

export default handler