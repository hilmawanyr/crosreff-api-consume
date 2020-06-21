const express = require('express');
const app = express();
const fetch = require('node-fetch');

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	let url = 'http://api.crossref.org/works?rows=10&offset=0&select=abstract,URL,member,posted,created,license,ISSN,issue,prefix,author,DOI,funder,archive,subject,subtitle,published-online,publisher-location,reference,title,link,type,publisher,volume,ISBN';
	fetch(url)
		.then(response =>  response.json())
		.then(result =>  {
			res.render('index', { data: result.message.items, page: 1 })
		});

app.get('/page/:page', (req, res) => {
	let offset = (req.params.page - 1) * 10;
	let url = `http://api.crossref.org/works?rows=10&offset=${offset}&select=abstract,URL,member,posted,created,license,ISSN,issue,prefix,author,DOI,funder,archive,subject,subtitle,published-online,publisher-location,reference,title,link,type,publisher,volume,ISBN`;
	fetch(url)
		.then(response =>  response.json())
		.then(result =>  {
			res.render('index', { data: result.message.items, page: req.params.page })
		});
});

app.listen(3000, () => {
	console.log('app running on port 3000!')
})