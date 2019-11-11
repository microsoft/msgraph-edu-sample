import "core-js/stable";
import "regenerator-runtime/runtime";

import '../styles/global.css';
import "./components";

window.addEventListener('DOMContentLoaded', (event) => {
    const app = document.createElement('bellows-app');
    document.body.appendChild(app);
});