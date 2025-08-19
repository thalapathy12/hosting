const Payment = require('../models/payment');

exports.createPayment = async(req,res)=>{
    try{
        const payment = new Payment(req.body);
        await payment.save();
        res.status(201).json(payment);
    }catch(err){
        res.status(400).json({error:err.message});
    }
};

exports.getPayments = async(req,res) =>{
    try{
        const payments = await Payment.find();
        res.json(payments);
    }catch(err){
        res.status(500).json({error: err.message});
    }
}

exports.updatePayments = async(req,res) =>{
    try{
        const payment = await Payment.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.json(payment);
    } catch(err){
        res.status(400).json({error:err.message});
    }
};

exports.deletePayment = async(req,res) =>{
    try{
        await Payment.findByIdAndDelete(req.params.id);
        res.json({message:'payment deleted'})
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}