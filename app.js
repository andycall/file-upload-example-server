import Koa from 'koa'
import logger from 'koa-logger'
import path from 'path'
import fs from 'fs'
import router from 'koa-route'

import upload from './upload'
import md5 from './md5'

const app = new Koa()

app.use(logger());

app.use(router.get('/', function* () {
  this.body = `<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>
<form method="post" enctype="multipart/form-data" action="http://localhost:3000">
	<input type="file" name="file_IDSPLIT_0">
	<input type="submit" name="submit">
</form>
</body>
</html>`
}));
app.use(router.post('/upload', upload));
app.use(router.post('/md5', md5));

app.listen(3000, () => console.log('server started 3000'))

export default app

