const cheerio = require('cheerio');
const axios = require('axios');

const superagent = require('superagent');
const charset = require('superagent-charset');

charset(superagent);

class Book{
    constructor(url) {
        this.url = url;
        this.list = [];
        this.doc = null;
    }

    async init() {
        const doc = await getHTML(this.url);
        this.doc = getDcoument(doc);

        return this;
    }

    getElement(cls) {
        return this.list = this.doc(cls);
    }
}


function getDcoument(doc) {
    return cheerio.load(doc);
}

function getHTML(url) {
    return new Promise((resolve, reject) => {
        superagent.get(url).charset('gb2312').end(function(err, res){
            if(err) reject(err);
            resolve(res.text);
        })
    })
}

module.exports = Book;