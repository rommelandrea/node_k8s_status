import express from 'express';
import bodyParser from 'body-parser';
import * as health from '@cloudnative/health';

import homeController from './controllers/homeController';

// Create Express server
const app = express();

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', homeController);

// healt check
const healthcheck = new health.HealthChecker();
app.get('/live', async (req, res) => {
  const status = await healthcheck.getLivenessStatus();
  console.log(status);
  res.json(status);
});

app.get('/ready', async (req, res) => {
  const status = await healthcheck.getReadinessStatus();
  res.json(status);
});

app.get('/health', async (req, res) => {
  const status = await healthcheck.getStatus();
  res.json(status);
});

module.exports = app;
export default app;
