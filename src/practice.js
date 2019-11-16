const knex = require('knex');
require('dotenv').config()

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL,
})
console.log('knex and driver installed');

const searchTerm = 'light'

function searchByProductName(searchTerm){
    knexInstance.select('product_id','name','price','category')
        .from('amazon_products')
        .where('name','ILIKE', `%${searchTerm}%`)
        .then(result =>{
        console.log(result)
    })
}


function paginateProducts(page){
    const productsPerPage=10
    const offset = productsPerPage * (page-1)
    knexInstance.select('product_id','name','price','category')
        .from('amazon_products')
        .limit(productsPerPage)
        .offset(offset)
        .then(result =>{
        console.log(result)
    })
}

function productImages(){
    knexInstance.select('product_id','name','price','category','image')
    .from('amazon_products')
    .whereNotNull('image')
    .then(result =>{
        console.log(result)
    })
}

function popularWhopipe(){
    knexInstance.select('region', 'video_name')
    .count('date_viewed AS views')
    .where('date_viewed', '>', knexInstance.raw(`now() - '30 days'::INTERVAL`) )  
    .from('whopipe_video_views')
    .groupBy('video_name', 'region')
    .orderBy([
        {column: 'region', order: 'ASC'},
        {column:'views', order: "DESC"}
    ])
    .then(result =>{
        console.log(result)
    })
}

// searchByProductName(searchTerm);
// paginateProducts(2);
// productImages()

popularWhopipe()

