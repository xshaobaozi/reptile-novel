/*
** @e.g npm run start 文学少女 https://www.wenku8.net/novel/0/1/index.htm
*/

const path = require('path');
const book  = require('./modules/book');
const util = require('./helper/fs');

const src = path.resolve(__dirname + '/..');
const params = process.argv.splice(2);

const NAME = params[0];
const URL = params[1];

const dist = path.resolve(src + '/dist/');
const output = path.resolve(dist + '/' + NAME);
let count = 0;
const Home = new book(URL);

const MAX = 5;
Home
	.init()
	.then(() => {
		Home.getElement('table a');
		const array = [];
		Home.list.each(function(index) {
			const href = Home.doc(this).attr('href');
			array.push({
				title: Home.doc(this).text(),
				href: Home.url.replace(/index.htm/, href),
				index: index + 1
			})
		})
		return array;
	})
	.then((list) => {
		init(list);
	});


function init(list) {
	util.createFile(output)
	.then(() => {
		checkQueue(list);
	})
	.catch(err => {
		console.log(err)
	})
}

function createSession(obj, length) {
	const session = new book(obj.href);
	session
		.init()
		.then(() => {
			session.getElement('#content');
			const text = session.doc(session.list[0]);
			util.writeFile({
				path: (output + '/' + obj.index + '-' + obj.title).trim(),
				ctx: text.text()
			})
			.then(() => {
				console.log(`${obj.title}---已经完成  剩余: ${length}`);
				count = count - 1;
			})
			.catch(() => {
				console.log(err);
				console.log(obj.title + '---下载失败');
				count = count - 1;
			})
		})
		.catch(err => {
			console.log(err);
			console.log(obj.href, obj.title)
		})
}

function checkQueue(queue) {
	if (queue.length <= 0) return false;
	setTimeout(() => {
		if (count >= 5) {
			console.log('队列数量:', count);
		}
		if (queue.length > 0 && count < MAX) {
			count = count + 1;
			createSession(queue.shift(), queue.length);
		}
		checkQueue(queue);
	}, 500)
}