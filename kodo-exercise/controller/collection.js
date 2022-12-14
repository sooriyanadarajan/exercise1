const Collection = require('../models/details')

class CollectionController {
    constructor() {

    }

    async listCollection(req, res) {
        const limit = parseInt(req.body.limit)
        const page = parseInt(req.body.page)
        const skip = (page - 1) * limit
        let search = {};

        if (req.body.key) {
            let searchvalue = req.body.key
            var format = /["]/;
            if (format.test(searchvalue)) {
                let value = (searchvalue.replace(/[^a-zA-Z0-9 ]/g, ""));
                search = value ? {
                    name: {
                        $regex: new RegExp(value, 'i')
                    }
                } : {
                }
            }
            else {
                let values = searchvalue.split(' ')
                for (let value of values) {
                    search = value ? {
                        name: {
                            $regex: new RegExp(value, 'i')
                        }
                    } : {
                    }
                }
            }
        }

        let sort = req.body.sort == "name" ? { name: 1 } : req.body.sort == "dateLastEdited" ? { dateLastEdited: 1 } : { name: 1, dateLastEdited: 1 }

        let list = await Collection.find(search).sort(sort).skip(skip).limit(limit)
        let count = await Collection.countDocuments(search)
        let output = {
            list,
            count
        }
        res.status(200).json({ success: true, message: 'Details Listed', data: output })
    }

}
module.exports = CollectionController