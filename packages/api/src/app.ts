import Koa from 'koa';
import Router from 'koa-router';
import cors from '@koa/cors'
import fs from 'fs';
import path from 'path';
import { Parser } from './services/Parser';
import { Enricher } from './services/Enricher';

const PORT = 4000

const app = new Koa();
const router = new Router();
const parser = new Parser();
const enricher = new Enricher();
const statusFile = fs.readFileSync(path.join(__dirname, 'status.real.txt')).toString();
const packageObjects = enricher.enrichPackageObjects(parser.parseStatusToObjects(statusFile));
const lastModified = new Date()

router.get('/api/packages', ctx => {
  ctx.body = {data: packageObjects.map(pkg => pkg.packageName)};
  ctx.lastModified = lastModified
});

router.get('/api/packages/:packageName', ctx => {
    ctx.lastModified = lastModified
    const result = packageObjects.find(pkg => pkg.packageName === ctx.params.packageName);
    if (!result) return (ctx.status = 404);
    return (ctx.body = result);
});

app
.use(cors())
.use(router.routes())
.use(router.allowedMethods());

app.listen(PORT, () => console.log(`API Server running on port ${PORT}`));
