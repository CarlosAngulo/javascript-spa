import { getAjax } from '../../helpers/ajax.js';
import api from '../../helpers/api.js';
import { DatePicker } from '../common/datePicker.js';
import { Prueba } from '../prueba/Prueba.js';

const title = 'Inventory Ledger';

export default async function InventoryLedger() {

    const data = await getAjax(api.ORDER_SEARCH)
    .then( console.log )
    
    const $container = document.createElement('div');

    $container.className = 'container';

    const prueba1 = new Prueba();
    const prueba2 = new Prueba();
    $container.appendChild(prueba1.render());
    $container.appendChild(prueba2.render());
    
    setTimeout(()=>{
        prueba1.update({
            texto: 'Carlos',
            image: 'otro'
        })
    }, 3000);

    const $title = document.createElement('h2');
    $title.className = 'report-title';
    $title.innerHTML = title;
    
    const BOP = new DatePicker('start');
    const EOP = new DatePicker('end');

    BOP.$container.addEventListener('changeDate', (e) => console.log('BOP: ' + e.detail))
    EOP.$container.addEventListener('changeDate', (e) => console.log('EOP: ' + e.detail))

    $container.appendChild($title);
    $container.appendChild(BOP.$container);
    $container.appendChild(EOP.$container);

    return {
        render: $container,
        print
    };
}

function print(item) {
    console.log(item);
}