const routes = (handler) => [

    {
        method: 'POST',
        path: '/notes',
        handler: handler.postNoteHandler,
    },
    {
        method: 'GET',
        path: '/',
        handler: (request, header) => {
            return header.response('Hello, This homepage 📃').code(200);
        }
    },
    {
        method: 'GET',
        path: '/notes',
        handler: handler.getNotesHandler,
    },
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: handler.getNoteByIdHandler,
    },
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: handler.putNoteByIdHandler,
    },
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: handler.deleteNoteByIdHandler,
    },

];

module.exports = routes;