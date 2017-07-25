'use strict';

(() => {
    const connection = `ws://${window.location.hostname}:4001`;

    const wsc = new WebSocket(connection);

    wsc.onopen = () => {
        setTitle('Connected to drujbai communications!');
    };

    wsc.onclose = () => {
        setTitle('Disconnected');
    };

    wsc.onmessage = (msg) => {
        printMessage(msg.data);
    };

    document.forms[0].onsubmit = () => {
        const input = document.getElementById('message');

        wsc.send(input.value);

        input.value = '';
    };

    function setTitle(title) {
        document.querySelector('h1').innerHTML = title;
    }

    function printMessage(message) {
        const p = document.createElement('p');
        p.innerText = message;
        document.querySelector('div.messages').appendChild(p);
    }
})();
