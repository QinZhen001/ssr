// 服务器入口
import React from 'react'
import { renderToString, renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';
import createStoreInstance from './store';
import { Helmet } from 'react-helmet';
import RoutesList, { routesConfig } from './routes';


const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// 前端打包文件
app.use(express.static('dist/public'));

app.get('*', (req, res) => {
  const store = createStoreInstance();

  const promises = routesConfig.map(item => {
    const component = item?.component;
    if (item?.path === req?.url && component?.getInitialData) {
      return component?.getInitialData(store);
    } else {
      return null;
    }
  })

  console.log("promises", promises)

  Promise.all(promises).then(() => {
    const preloadedState = store.getState();
    const content = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url}>
          <RoutesList />
        </StaticRouter>
      </Provider>
    );
    const helmet = Helmet.renderStatic();
    const html = `
      <html>
        <head>
          ${helmet?.title?.toString()}
        </head>
        <body>
          <div id="root">${content}</div>
          <script>
          window.__PRELOAD_STATE__=${JSON.stringify(preloadedState)}
          </script>
          <script src="bundle_client.js"></script>
        </body>
      </html>
    `;
    res.writeHead(200, {
      'content-type': 'text/html;charset=utf8',
    });
    res.end(html);
  })
})


app.listen(port)
