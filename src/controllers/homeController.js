const getHomepage = ( req, res) =>{
    res.send ('This is homeController')
}

const getABC = ( req, res) =>{
    res.send ('This is homeController ABC')
}
module.exports = {
    getHomepage, getABC
}