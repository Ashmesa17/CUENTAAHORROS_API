const {model, Schema} = require('mongoose');

const CounterSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 },
  });  

const Counter = mongoose.model("Counter", CounterSchema);

const CuentaSchema = new Schema({
    NumeroCuenta:{
        type: Number,
        unique: true
    },
    DocCliente: {
        type: String,
        required:[true, 'El documento es requerido'],
        minlength: [8, 'El documento debe tener minimo 8 caracteres']
    },
    FechaApertura: {
        type: Date,
        required:[true, 'La fecha de apertura es requerida'],
    },
    Saldo: {
        type: Number,
        required:[true, 'El saldo es requerida'],
    },
    ClaveAcceso: {
        type: Number,
        required:[true, 'la clave es requerida'],
        length: [4, 'La clave de acceso debe ser de 4 digitod']
    }
    
})

CuentaSchema.pre("save", async function (next) {
    const doc = this;
    if (!doc.isNew) return next();
  
    const counter = await Counter.findByIdAndUpdate(
      { _id: "NumeroCuenta_seq" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
  
    doc.NumeroCuenta = counter.seq;
    next();
  });


module.exports=model('CuentaAhorros', CuentaSchema, 'CuentaAhorros')