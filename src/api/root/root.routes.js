const routes = [
  { path: '/', method: 'get', middlewares: [], controller: (req, res, next) => res.send('Server working route /') },
  { path: '/status', method: 'get', middlewares: [], controller: (req, res, next) => res.status(200).json('Server is Online') },
  { path: '/status', method: 'head', middlewares: [], controller: (req, res, next) => res.status(200).json('HEAD /status working') },
];

export default routes;
