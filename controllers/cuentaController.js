const CuentaAhorros= require('../models/CuentaAhorros.js');

const getCuentas = async (req, res)=> {
    const cuentaAhorros = await CuentaAhorros.find()

    res.json(cuentaAhorros)
}

const getCuenta = async (req, res) => {
    const id = req.params.id;
    const cuentaAhorros = await CuentaAhorros.findById(id);
    if (!cuentaAhorros) {
      res.status(404).json({ mensaje: 'Cuenta no encontrada' });
    } else {
      res.json(cuentaAhorros);
    }
  };

const postCuenta= async (req,res)=>{
    let msg='cuenta insertada'
    const body= req.body
    try{
        const cuentaAhorros = new CuentaAhorros (body)
        await cuentaAhorros.save() 
    }catch(error){
        msg=error
    }
    res.json({msg:msg})
  }

  
  const Consignar = async (req, res) => {
    const id = req.params.id;
    const cuentaAhorros = await CuentaAhorros.findById(id);
    const saldo = req.params.Saldo
    if (saldo<0) {
      res.status(404).json({ mensaje: 'No se puede hacer esta operacion' });
    } else {
      celda.saldo = req.body.saldo;
      await cuentaAhorros.save();
      res.json(cuentaAhorros);
    }
  };

  const deleteCuenta = async (req, res) =>{
    id= req.params.id
    try{
        const saldo = req.params.Saldo
        if(saldo=0){
            let msg= "No se puede eliminar su cuenta"
        }else{
    
            let msg= 'Cuenta Eliminada'
        }
        await  CuentaAhorros.findOneAndDelete({_id:id})

    }catch (error) {
        msg= 'Hay problemas para eliminar '
    }
    res.json({msg:msg})
} 

module.exports = {
    getCuentas,
    getCuenta,
    postCuenta,
    deleteCuenta,
    Consignar,
}
  