const fetchUser = require("../middleware/fetchUser.js")
const multer = require('multer')
const PdfDetails = require("../models/PdfDetails")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './files')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now()
        cb(null, uniqueSuffix + file.originalname)
    }
})
const upload = multer({ storage: storage })

const express = require("express")
const router = express.Router()

router.post("/upload-files", fetchUser, upload.single("file"), async (req, res) => {
    const title = req.body.title
    const filename = req.file.filename
    try {
        await PdfDetails.create({ title: title, pdf: filename, user: req.user.id })
        res.send({ status: "ok" })
    }
    catch (error) {
        res.json({ status: error })
    }
})

router.get("/get-files", fetchUser, async (req, res) => {
    try {
        const data = await PdfDetails.find({ user: req.user.id })
        res.send({ status: "ok", data: data })
    }
    catch (error) {

    }
})

// ROUTE 4: Delete an existing note:DELETE "/api/notes/deletenote". Login required
router.delete("/deletefile/:id", fetchUser, async (req, res) => {
    try {
        let file = await PdfDetails.findById(req.params.id)
        if (!file) {
            return res.status(404).send("Not found")
        }
        if (file.user.toString() !== req.user.id) {
            res.status(401).send("Not allowed")
        }
        file = await PdfDetails.findByIdAndDelete(req.params.id)
        res.json({ success: "File has been deleted", file: file })
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }


})

module.exports = router