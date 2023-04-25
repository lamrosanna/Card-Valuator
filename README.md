# Card Valuator via EBAY API

With the surge in card collectibles, this projects aims to help collectors readily evaulate the market price of card collectibles using prices from completed Ebay sales. 

Card valuator evaluates current market price for a card using the EBAY API and the last 30 price (if applicable) it sold at.

## Installation

:bangbang: To be able to properly run this app make sure you signed up for [Ebay Devlopers program](https://developer.ebay.com/) and [create production application keys](https://developer.ebay.com/api-docs/static/gs_create-the-ebay-api-keysets.html). Follow instructions to opt-out of Ebay marketplace account deletions/closures notifications as this app does not store any data. This will generate an App Id which is needed and referenced in the .env.example file. 

```
//Clone the repository to your machine
git clone https://github.com/lamrosanna/Card-Valuator
// Create a Docker Image
docker build -t cardvaluator .
// Run the Container
docker run --publish 3000:3000 cardvaluator
```

## Usage

Enter detailed information on the collectible you are evaluating in the input box. An example has been provided for you: "Origin Forme Palkia V - 167/189 - PSA 10" 

## Contribution 

This was a fun little project to help sell supplemental Pokemon cards from my collection :woman_shrugging:. Please feel free to let me know about any features that you would love to see added! :bulb:

## License

[MIT](https://choosealicense.com/licenses/mit/)