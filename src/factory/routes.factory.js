import { Router } from 'express';

function RoutesFactory(routes, controller) {
  return routes.reduce(
    (router, route) =>
      router[route.method](
        route.path,
        route.middlewares || [],
        typeof route.controller === 'function' ? route.controller : controller[route.controller],
      ),
    Router(),
  );
}

export default RoutesFactory;
