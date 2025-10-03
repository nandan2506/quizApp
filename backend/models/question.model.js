
const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema(
    {
        text: { type: String, required: true },
        options: { type: [String], required: true },
        correctOpt: { type: Number, required: true }
    }, {
    timestamps: true
}
)

const questionModel = mongoose.model('question', questionSchema)

module.exports = questionModel