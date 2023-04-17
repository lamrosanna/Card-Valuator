// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default function handler(req, res) {
  res.status(200).json({name: 'John Doe'})
}


// export default function EbayData(){//{data}
//   return(
//     <>
//     <h1>Hello</h1>
//     </>

//   )
// }

// export async function getServerideProps() {
//   // res.status(200).json({ name: 'John Doe' })
//   if (req.method === 'GET') {
//     const url = `https://svcs.sandbox.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=RosannaL-cardvalu-SBX-c2e2968b1-9fbb1f02&RESPONSE-DATA-FORMAT=JSON&keywords=pokemon&paginationInput.entriesPerPage=2&itemFilter.name=SOLD_ITEMS_ONLY&itemFilter.value=true&REST-PAYLOAD`
//     const headerOptions = {
//       method:'GET',
//       mode:'cors',
//       headers: {
//         // 'Content-type': 'application/json', 
//         // 'Access-Control-Allow-Origin': '*', 
//         // 'Access-Control-Allow-Headers': "Origin, X-Requested-With, Content-Type, Accept",
//         //'Access-Control-Allow-Credentials': 'true',
//         // 'X-EBAY-SOA-OPERATION-NAME': process.env.REACT_APP_OPERATION_NAME,
//         // 'X-EBAY-SOA-SECURITY-APPNAME': process.env.REACT_APP_SECURITY_APPNAME,
//         // 'X-EBAY-SOA-RESPONSE-DATA-FORMAT': 'JSON',
//         // 'X-EBAY-SOA-GLOBAL-ID': 'EBAY-US',
//       }
//     }
  
//     let response = await fetch(url, headerOptions)
//     let data = await response.json()
//     return{
//       props: {data}
//     }
//   }
// }
    // await fetch(url, headerOptions)
    // .then((response) => console.log(response.json()))
    // return (response)
  // } else {
  //   console.log("idk");
  // }


