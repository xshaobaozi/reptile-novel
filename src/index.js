const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const NAME = '文学少女';
const URL = 'https://www.wenku8.net/novel/0/1/index.htm';
const filePath = path.resolve(__dirname, './../' + NAME);

fs.mkdir(__dirname + '/../文学少女1', function(err) {
	if(err) throw err;
	console.log('mkdir file');
	fs.writeFile(path.resolve(__dirname + '/../文学少女/message1.txt'), 'Hello Node.js', (err) => {
		if (err) throw err;
		console.log('The file has been saved!');
	});
})
return

getHTML(URL)
.then(res => {
	return getUrl(res.data)
})
.then(list => {
	return Promise.all(list.map(item => readCtx(item)))
});

function readCtx(params) {
	const target = URL.replace(/index.htm/,params.url);
	return getHTML(target)
	.then(({data}) => {
		
	})
}

function getUrl(doc) {
	const $ = cheerio.load(doc);
	const list = $('table a');
	return list.map(function(index, item) {
		return {
			url: $(this).attr('href'),
			title: $(this).text()
		}
	})
}

function getHTML(url) {
	return axios.get(url)
		.then(res => {
			return res;
		})
		.catch(err => {
			console.log('----err----')
			// console.log(err);
		})
}

function mkFile(path) {
	if (checkFile(path)) {
		
	}
}

function checkFile(path) {
	stat = fs.statSync(path);
	return stat.isDirectory();
}


fs.mkdir(filePath, function(err) {
	try{
		if(err) throw err;
		console.log('mkdir file');
		fs.writeFile(path.resolve(__dirname + '/../文学少女/message1.txt'), 'Hello Node.js', (err) => {
			if (err) throw err;
			console.log('The file has been saved!');
		});
	}catch(err) {
		console.log('' + filePath)

	}
})