const reports = [
    { path: 'inventory-summary', name: 'Inventory Summary', description: 'Summary of the current stock by warehouse' },
    { path: 'inventory-ledger', name: 'Inventory Ledger', description: 'Select init and end of period to get the inventory movements'  },
];

const title = 'Report List'

export default function Home() {
    const $home = document.createElement('div');
    const $title = document.createElement('h1');
    const $list = document.createElement('ul');
    const $logo = document.createElement('img');
    
    $logo.src = './app/assets/logo.png';
    $logo.className = 'logo';
    $home.classList.add('container', 'home');
    $title.innerHTML = title;
    $list.className = 'report-menu';

    const $menuItems = reports.map( item => `
        <li>
            <a href="#/${item.path}">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
            </a>
        </li>
    `).join('');
    $list.innerHTML = $menuItems;

    $home.appendChild($logo);
    $home.appendChild($title);
    $home.appendChild($list);
    return {
        render: $home
    };
}