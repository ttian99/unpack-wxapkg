const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
const Wxapkg = require('./lib/Wxapkg');
const mkdirp = require('./lib/mkdirp');

async function unpackWxapkg(source, destination) {
    console.log('unpackWxapkg start: ' + source);
    const basename = path.basename(source).replace(path.extname(source), '');
    const file = await fs.readFileSync(source);
    let wxapkg = new Wxapkg(file);
    let files = wxapkg.decode();
    let pArr = [];
    for (let i = 0; i < files.length; i++) {
        const f = files[i];
        let filePath = path.join(__dirname, './', destination, basename, f.name);
        let dir = path.dirname(filePath);
        mkdirp(dir, function (err) {
            if (err) return cb(err);
            fs.writeFileSync(filePath, f.chunk, 'binary');
            pArr.push(Promise.resolve())
        });
    }

    return Promise.all(pArr).then(() => {
        console.log('unpackWxapkg over ');
    }).catch((err)=> console.error(err))
}


/** 查找路径下的所有wxapkg文件 */
async function findWxapkgFiles(src) {
    return new Promise((resolve, reject) => {
        const filePath = path.join(src, '**/*.wxapkg');
        glob(filePath, function (err, arr) {
            if (err) {
                resolve([]);
                console.error(err);
                return;
            }
            resolve(arr);
        });
    });
}

async function unpack(src, dest) {
    if (!dest) {
        dest = 'dest';
        console.warn('没有设置输出文件目录, 使用默认配置: ' + dest);
    }
    if (!src) {
        src = './';
        console.warn('没有设置要解压的文件或文件目录, 使用默认配置: ' + src);
    }
    const extname = path.extname(src);
    if (extname && extname === '.wxapkg') { // 是文件
        await unpackWxapkg(src, dest);
    } else { // 是目录
        const files = await findWxapkgFiles(src);
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            await unpackWxapkg(file, dest);
        }
    }
}

module.exports = unpack;
