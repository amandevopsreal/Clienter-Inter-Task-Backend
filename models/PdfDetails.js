const mongoose = require("mongoose")
const { Schema } = mongoose;

const PdfDetailsSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    pdf: String,
    title: String
})
const PdfDetails = mongoose.model("pdfdetails", PdfDetailsSchema)
module.exports = PdfDetails