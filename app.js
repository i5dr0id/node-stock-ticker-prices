const express = require('express');
const app = express();

const request = require('request')

const _STOCK_URL = 'https://financialmodelingprep.com/api/financials/income-statement/AAPL'

const callStockAPI =  (callback) => {
	request(_STOCK_URL, { json: true}, (err, res, body) => {
		if (err) {
			return callback(err);
		}
		return callback(body)
	});
}

app.get('/', (req, res) => {
	callStockAPI((response) => {
		console.log({response})
		let resp = response;
		resp = resp.substring(5);
		resp = resp.substring(0, resp.length - 5);
		resp = JSON.parse(resp)
		res.write(JSON.stringify(resp))
		res.end()
	})
});


const port = process.env.PORT || 1234;

app.listen(port, () =>
  console.log(`App listening on port ${port}!`),
);
