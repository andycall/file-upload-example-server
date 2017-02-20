import fs from 'fs'
import parse from 'co-body'
import path from 'path'
import crypto from 'crypto'

const receiveRootDir = path.join(__dirname, 'receive');

function toMd5(buffer) {
    let md5 = crypto.createHash('md5');
    md5.update(buffer);
    return md5.digest('hex');
}

module.exports = function* () {
    var body = yield parse(this, {
        limit: '1kb'
    });

    let filename = body.filename;
    let fileDir = path.join(receiveRootDir, filename);

    let totalBuffer = Buffer.alloc(0);
    let dirInfo = fs.readdirSync(fileDir);

    dirInfo = dirInfo.sort(function(pre, next) {
        return pre - next;
    });

    dirInfo.forEach(name => {
        let chunkPath = path.join(fileDir, name);
        let buffer = fs.readFileSync(chunkPath);
        totalBuffer = Buffer.concat([totalBuffer, buffer], totalBuffer.length + buffer.length);
    })

    this.body = {
        error: 0,
        data: toMd5(totalBuffer)
    }
}