var connection = require('../dbConfig')

function selectProducts(queryObj,callback){
    var conditions = [];
    if ("searchText" in queryObj) {
        conditions.push("name LIKE \'%" + queryObj.searchText + "%\'")
    }
    if ('priceMin' in queryObj && 'priceMax' in queryObj) {
        conditions.push("price BETWEEN " + queryObj.priceMin + " AND " + queryObj.priceMax)
    } else if ('priceMin' in queryObj) {
        conditions.push("price >= " + queryObj.priceMin)
    } else if ('priceMax' in queryObj) {
        conditions.push("price <= " + queryObj.priceMax)
    }
    if ('color' in queryObj) {
        conditions.push("color LIKE \'%" + queryObj.color + "%\'")
    }
    var final_condition ="";
    for (const condition of conditions) {
        final_condition =condition + " AND " + final_condition
    }
    var query = "select * from products";
    if(final_condition.length != 0) {
        query = query + " where " + final_condition.substring(0,final_condition.length-4);
    }
    console.log(query);
    connection.query(query,callback);
}
function insertAProduct(queryObj,callback){
    const cols = Object.keys(queryObj);
    const values = Object.values(queryObj);
    console.log(cols)
    console.log(values)
    var insertQuery = "Insert into products (" + cols + ") VALUES ("+values+")";
    console.log("query:: "+insertQuery);
    // connection.query(insertQuery,callback);
}
module.exports = {selectProducts, insertAProduct}

