import { getAjax } from '../../helpers/ajax.js';
import api from '../../helpers/api.js';
import { tableToExcel } from '../../helpers/excel-export.js';
import { inventoryFields } from '../../helpers/fields.js';
import * as processData from '../../helpers/process-fields.js';
import Button from '../ExportButton.js';

const title = 'Inventory Summary';
let categories = [];

export default async function InventorySummary() {

    const data = await getAjax(api.PRODUCT_CATEGORY)
    .then( data => {
        categories = data.response.results;
        return getAjax(api.PRODUCT_SEARCH)
    })
    .then( data => processData.products(data, inventoryFields, categories))
    .then( data => {
        const productList = `${data.tbody[0][0]}-${data.tbody[data.tbody.length-1][0]}`;
        return getAjax(`${api.PRODUCT_AVAILABILITY}${productList}/?period=2021-12-16`)
    })
    .then( data => processData.productsAvailability(data));
    
    const $table = document.createElement('table');
    $table.className = 'fl-table';
    $table.id = 'testTable';

    const thead = data.thead.map( element => `<th>${element}</th>`).join('');
    const tbody = data.tbody.map( row => `<tr>${row.map( cell => `<td>${cell}</td>` ).join('')}</tr>`).join('');
    
    $table.innerHTML = `
        <thead>
            <tr>
                <th colspan="6"></th>
                <th colspan="3">Total</th>
                <th colspan="3">Renton</th>
                <th colspan="3">Managed</th>
                <th colspan="3">Investigation</th>
            </tr>
            <tr>${thead}</tr>
        </thead>
        <tbody>${tbody}</tbody>
    `;

    const $title = document.createElement('h2');
    $title.className = 'report-title';
    $title.innerHTML = title;

    const $button = Button();
    $button.addEventListener('click', tableToExcel('testTable', 'W3C Example Table'));

    const $container = document.createElement('div');
    $container.appendChild($title);
    $container.appendChild($button);
    $container.appendChild($table);

    return {
        render: $container,
        print: (item) => console.log(item)
    };
}
