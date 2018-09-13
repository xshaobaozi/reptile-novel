const fs = require('fs');

const checkFile = function checkFile(path) {
    try{
        return fs.statSync(path).isDirectory();
    }catch(err) {
        console.log('没有当前目录', path);
        return false;
    }
}

const mkdir = function(path) {
    return new Promise((resolve, reject) => {
        fs.mkdir(path, function(err) {
            console.log(path)
            if (err) reject(err);
            console.log('创建目录完成', path)
            resolve();
        })
    })
}

const writeFile = function({path, ctx}) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, ctx, err => {
            if (err) reject(err);
            resolve();
        })
    })
}

const createFile = function(path) {
    const hasFile = checkFile(path);
    if (!hasFile) {
        return mkdir(path);
    }
    console.log('目录已存在', path)
    return Promise.resolve();
}

module.exports = {
    checkFile,
    mkdir,
    writeFile,
    createFile
}