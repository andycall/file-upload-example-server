import parse from 'co-busboy'
import path from 'path'
import fs from 'fs'

const outputDir = path.join(__dirname, 'receive');

module.exports = function* () {
     // ignore non-POSTs
  if ('POST' != this.method) return yield next;

  // multipart upload
  var parts = parse(this);
  var part;

  while ((part = yield parts)) {
    if (part.constructor.name === 'FileStream') {
      let filename = part.filename;
      let chunkIndex, prefix;

      if (filename.indexOf('_IDSPLIT_') > 0) {
        prefix = filename.split('_IDSPLIT_')[0];
        chunkIndex = filename.split('_IDSPLIT_')[1];

        // // // 错误处理测试使用
        if (chunkIndex == 1) {
          // console.log(`set failed of ${chunkIndex}`);
          // this.status = 500;
        }
      }
      else {
        prefix = filename;
        chunkIndex = '0';
      }

      let fileDir = path.join(outputDir, prefix)

      if (!fs.existsSync(fileDir)) {
        fs.mkdirSync(fileDir);
      }

      var stream = fs.createWriteStream(path.join(fileDir, chunkIndex));
      part.pipe(stream);
      console.log('uploading %s -> %s', part.filename, stream.path);
    }
    else {
      let param = part[0];
      let value = part[1];
      console.log(`${param} : ${value}`);
    }
  }

  this.body = {
    error: 0,
    errmsg: 'ok'
  }
}