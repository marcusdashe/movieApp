const mongoose = require('mongoose');

const objectID = Schema.Types.ObjectId

const txnSchema = new mongoose.Schema({
    user: { type: objectID, ref: "User"},
    transactions: [
        {
            txnType: { type: String},
            date: {type: Date, default: Date.now()}
        }
    ]
}, {timestamp: true})



module.exports = mongoose.model("Transaction", txnSchema);