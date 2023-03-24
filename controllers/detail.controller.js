const { detail} = require('@models')
const { NotFound, Forbidden } = require('http-errors')
const { Op, Sequelize } = require('sequelize')

async function findAll(req, res, next) {
    if (req.user.abilities.cannot('read', detail)) {
        return next(Forbidden())
    }
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 15

    const options = {
        offset: (page - 1) * limit,
        limit,
        order: [
            ['createdAt', 'ASC']
        ],
        // attributes: {
        //     include :[
        //         [Sequelize.fn('SUM', Sequelize.col('harga')), 'total_harga']
        //     ]
        // },
        where: {}
    }

    // const { nama_tipe } = req.query

    // if (nama_tipe) {
    //     options.where['nama_tipe'] = {
    //         [Op.like]: `%${nama_tipe}%`
    //     }
    // }

    const income = await detail.sum('harga')

    const result = await detail.findAndCountAll(options, [Sequelize.fn('SUM', Sequelize.col('harga')), 'total_harga'])
    
    const totalPage = Math.ceil(result.count / limit)

    res.json({ currentPage: page, totalPage,income ,rowLimit: limit, ...result })
}

module.exports = {
    findAll
}