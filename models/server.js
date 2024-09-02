const express = require('express'); 
const dbConnect = require('../database/config');
require('../database/config.js')
const {getCuenta,getCuentas, postCuenta, deleteCuenta, Consignar}= require ('../controllers/cuentaController.js')

class Server{
    constructor(){
        this.app = express();
        this.pathCuenta= '/api/cuenta';
        this.pathConsignar = 'api/consignar';
        this.route()
        this.dbConnection();
        this.listen();
    }   

    
    async dbConnection() {
        await dbConnect()
    }
    
    route (){
        this.app.use(express.json())

        this.app.get(this.pathCuenta, getCuenta)
        this.app.get(this.pathCuenta, getCuentas)
        this.app.post(this.pathCuenta, postCuenta)
        this.app.delete(this.pathCuenta+'/:id', deleteCuenta)
        this.app.put(this.pathConsignar, Consignar)
    }

    listen(){
        this.app.listen(process.env.PORT, () => {
            console.log(`Server is running`);  
        })
    }
}

module.exports =  Server 
    