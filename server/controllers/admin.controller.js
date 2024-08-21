module.exports = {
    updateUser: async (req, res) => {
        try {
            var params = req.body
            var id = param.id
            delete params.id;

            await User.update({
                selector: { _id: id },
                data: params
            })

            let [user] = await User.get({ _id: id })
            user = user.toJSON()
            let time2 = new Date().getTime()
            return res.json({
                success: true,
                data: user
            })

        } catch (error) {
            console.log('error', error)
            res.status(400).json({
                success: false,
                message: 'Error on update user',
                error
            })
        }
    }
}