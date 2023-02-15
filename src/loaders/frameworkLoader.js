import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import passport from 'passport';
import setHeaders from './headers.js';
import sessionLoader from './sessionLoader.js';
import routes from '../api/index.js';
import celebrateErrorHandler from './celebrateErrorHandler.js';

/**
 * Loader princpal de la aplicación y del framework Express usado actualmente.
 *
 * En este loader se configuran todos los middlewares y se cargan las rutas de la API.
 *
 * En el caso de cambiar de Framework, este loader debería ser el único que se modifique.
 */

const frameworkLoader = app => {
  const whitelist = ['http://localhost:5173', 'http://localhost:8080'];
  app
    .disable('x-powered-by')
    .use(helmet())
    .enable('trust proxy')
    // .use(setHeaders)
    .use(
      cors({
        origin: function (origin, callback) {
          if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
          } else {
            callback(new Error('Not allowed by CORS'));
          }
        },
        credentials: true,
        optionsSuccessStatus: 200,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
      }),
    )
    .use((req, res, next) => {
      if (req.method === 'OPTIONS') return res.status(200).json('OK');
      else return next();
    })
    .use(sessionLoader())
    .use(express.json({ limit: '10mb' }))
    .use(express.urlencoded({ limit: '10mb', extended: true }))
    .use(passport.initialize())
    .use(passport.session())
    .use(express.urlencoded({ limit: '10mb', extended: true }))
    .use(routes(app))
    .use('*', (req, res) => res.status(404).json(`Route not found ${req.originalUrl}`))
    .use(celebrateErrorHandler)
    .use((err, req, res, next) =>
      res.status(err.status ?? 500).json({ error: true, message: err.message ?? 'Unexpected error', ...err }),
    );
};

export default frameworkLoader;
