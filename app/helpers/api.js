
const BP_DATACENTER = 'use1';
const BP_DOMAIN = 'brightpearlconnect';
const BP_ACCOUNT = 'knacksandbox';
const HOST = `https://${BP_DATACENTER}.${BP_DOMAIN}.com`;
const API = `${HOST}/public-api/${BP_ACCOUNT}`;

const HEADERS = {
    'Authorization': 'Bearer GfGI8jBRbRgCl0wC4a4lHMpgQoBZum1D5UOi7/r60DE=',
    'brightpearl-dev-ref': 'carlos123',
    'brightpearl-app-ref': 'api-test002'
}

const PRODUCT_SEARCH = `${API}/product-service/product-search`;
const PRODUCT_CATEGORY = `${API}/product-service/brightpearl-category-search`;
const PRODUCT_AVAILABILITY = `${API}/warehouse-service/product-availability/`;

const ORDER_SEARCH = `${API}/order-service/sales-order-search`;

export default {
    BP_DATACENTER,
    BP_DOMAIN,
    BP_ACCOUNT,
    HOST,
    API,
    HEADERS,
    PRODUCT_SEARCH,
    PRODUCT_AVAILABILITY,
    PRODUCT_CATEGORY,
    ORDER_SEARCH,
};