/* globals io, $ */
'use strict';
import apiService from 'apiService';

(() => {
    apiService.get('/api/getuser')
        .then((user) => {
            let users = [];
            const username = user.username;

            const socket = io.connect();
            socket.emit('join', {
                username,
            });
            socket.emit('get-users');

            socket.on('all-users', (data) => {
                users = data.filter((u) => u.username !== username);
                $('#users').empty();
                users.forEach((u) => {
                    const item = $('<li>').text(u.username);
                    $('#users').append(item);
                });
            });

            socket.on('message-received', (data) => {
                const p = $('<p>').text(data.message);
                $('div.messages').append(p);
            });

            $('#chatBox').on('submit', () => {
                const message = $('#message').val();
                $('#message').val('');

                socket.emit('send-message', {
                    message: message,
                    username: username,
                });
            });
        })
        .catch((err) => {
            console.log(err);
        });
})();
