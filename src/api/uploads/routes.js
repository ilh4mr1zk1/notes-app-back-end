const path = require('path');

const routes = (handler) => [

  {
    method: 'POST',
    path: '/upload/images',
    handler: handler.postUploadImageHandler,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
      },
    },
  },

  {
    method: 'GET',
    path: '/upload/{param*}',
    handler: {
      directory: {
        path: path.resolve(__dirname, 'file'),
        // Dengan begitu, bila ada permintaan masuk ke GET /upload/*, 
        // maka akan dilayani oleh berkas statis yang berada di dalam folder file sesuai dengan parameter yang diminta client.
      },
    },
  },

];

module.exports = routes;