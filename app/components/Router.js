import InventorySummary from './reports/InventorySummary.js';
import Home from './Home.js';
import InventoryLedger from './reports/InventoryLedger.js';
import Loader from './Loader.js';

const routes = [
    { path: '', component: Home },
    { path: 'inventory-summary', component: InventorySummary },
    { path: 'inventory-ledger', component: InventoryLedger },
    { path: '*', component: '404' },
];

let $loader;
let $root = document.getElementById('root');

export function Router() {
    $root.innerHTML = '';
    $loader = Loader();
    $root.appendChild($loader);

    let { hash } = location;
    hash = hash.trim() === '' ? '#/' : hash;
    const component = routes.find( route => `#/${route.path}` === hash || route.path === '*').component;
    
    if (component.constructor.name === 'AsyncFunction') {
        component().then(renderComponent )
    } else {
       renderComponent(component());
    }
    
}

function renderComponent(component) {
    $loader.style.display = 'none';
    $root.appendChild(component.render);
}