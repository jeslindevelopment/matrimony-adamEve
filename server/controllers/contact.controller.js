const messages = require("../global/messages");

module.exports ={
    addContactMessage: async (req, res) => {
        try {
            let params = req.body;
            if (!params.name || !params.email || !params.phone || !params.message) {
                return res.status(400).json({
                    success: false,
                    data: messages.REQUIRED_FIELDS_MISSING
                })
            }
            await contact.add(params)
            return res.status(200).json({
                success: true,
                message: messages.MESSAGE_RECIEVED
            })
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: messages.UNEXPECTED_ERROR,
                error: err
            })
        }
    },
    getList: async (req, res) =>{
        try{
            let params = {
                query: {},
                page: req.query.page || 0,
                size: req.query.size || 10
            }
            
            const contacts = await Contact.getPages(params)
             return res.status(200).json({
                success: true,
                data: contacts
            })

        }catch(err){
            return res.status(400).json({
                success: false,
                message: messages.UNEXPECTED_ERROR,
                error: err
            })
        }
    }
}