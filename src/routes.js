const { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler } = require('./handler');

const routes = [
  {
    method: 'GET',
    path: '/',
    handler: (request, header) => {
        return header.response('Halo, Ini halaman utama 📃').code(200);
    },
  },
  {
    method: 'GET',
    path: '/users/{username?}',
    handler: (request, h) => {
      const { username = 'Hello User, Happy nice day 😃' } = request.params;
      // const { lang } = request.query;
      // if(lang === 'nama') {
      //   return `Hai, ${username} Happy nice day 😃 `;
      // }
      if ( username === '' ) {
        return `Hello User, Happy nice day 😃 ! `;
      } else {
        return `Hello ${username}, Happy nice day 😃 `
      }
      
    }
  },
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler,
    options: {
      cors: {
        origin: ['*'],
      },
    },
  },
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteByIdHandler,
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNoteByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNoteByIdHandler,
  },
];
 
module.exports = routes;