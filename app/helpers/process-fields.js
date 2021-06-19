import { dataTable, warehouses, warehouseHeaders } from './fields.js';

export function products(data, fields, categories) {
    const fieldIndexes = [];
    dataTable.thead = data.response.metaData.columns
        .filter( (column, index) => {
            const matchedColumns = fields.map( field => field.value).indexOf(column.name) > -1;
            if (matchedColumns) {
                fieldIndexes.push(index);
            }
            return matchedColumns
        })
        .map( column => fields.find( item => item.value === column.name ).name );
    
    dataTable.tbody = data.response.results
        .map( item => {
            if (categories) {
                item[12] = categories.find( category => category[0] === item[12])[1];
            }
            return item.filter( (element, index) => fieldIndexes.indexOf(index) > -1)
        })
        // .filter(item => item[0] <= 1020 );
    return dataTable;
}

export function productsAvailability(productList) {
    const availableProducts = Object.entries(productList.response)
        .filter( item => item[1].total.inStock + item[1].total.onHand + item[1].total.allocated + item[1].total.inTransit > 0 );
    
    const availableProductIds = availableProducts
        .map( product => parseInt(product[0]));

    dataTable.thead = dataTable.thead.concat(warehouseHeaders, warehouseHeaders, warehouseHeaders, warehouseHeaders);

    dataTable.tbody = dataTable.tbody
        .filter( product => availableProductIds.indexOf(product[0]) > -1)
        .map( product => {
            const productStockId = productList.response[product[0].toString()];
            const emptyStock = ['', '', ''];
            
            const totalStock = [
                productStockId.total.inStock,
                productStockId.total.onHand,
                productStockId.total.allocated,
            ];
            
            const renton = productStockId.warehouses[warehouses['renton'].id];
            const rentonStock = renton ? [
                renton.inStock,
                renton.onHand,
                renton.allocated,
            ] : emptyStock;
            
            const managed = productStockId.warehouses[warehouses['managed'].id];
            const managedStock = managed ? [
                managed.inStock,
                managed.onHand,
                managed.allocated,
            ] : emptyStock;
            
            const investigation = productStockId.warehouses[warehouses['investigation'].id];
            const investigationStock = investigation ? [
                investigation.inStock,
                investigation.onHand,
                investigation.allocated,
            ] : emptyStock;

            return product.concat(totalStock, rentonStock, managedStock, investigationStock);
        });
    return dataTable;
}
