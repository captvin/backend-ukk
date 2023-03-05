const { kamar } = require('@models')
const { NotFound, Forbidden } = require('http-errors')
const { Op } =require('sequelize')

async function findAll(req, res, next) {
    if (req.user.abilities.cannot('read', kamar)) {
        return next(Forbidden())
    }
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10

    const options = {
        offset: (page - 1) * limit,
        limit,
        order: [
            ['createdAt', 'ASC']
        ],
        where: {}
    }

    const { id_tipe } = req.query

    if (id_tipe) {
        options.where['id_tipe'] = id_tipe
    }

    const result = await kamar.findAndCountAll(options)
    const standart = await kamar.count({where: {id_tipe: 1}})
    const delux = await kamar.count({where: {id_tipe:2}})
    const luxury = await kamar.count({where: {id_tipe:3}})
    const president = await kamar.count({where: {id_tipe:4}})
    const count_tipe = {standart, delux, luxury, president}
    const totalPage = Math.ceil(result.count / limit)

    res.json({ currentPage: page, totalPage, rowLimit: limit, ...result, count_tipe })
}

async function findById(req, res, next) {
    if (req.user.abilities.cannot('read', kamar)) {
        return next(Forbidden())
    }
    const { id } = req.params
    const relations = []
    if (req.query.getKamar === 'true') {
        relations.push('transaksi')
    }
    const result = await kamar.findByPk(id, {include: "tipe"})
    result
        ? res.json(result)
        : next(NotFound())
}

async function create(req, res, next) {
    if (req.user.abilities.cannot('create', kamar)) {
        return next(Forbidden())
    }
    const { body } = req
    const nomor = body.nomor
    const already = await kamar.findOne({where: {nomor}})

    if(already){
        return res.send({message: "Nomor kamar already exists"})
    }
    else{
        const result = await kamar.create(body)
        res.json(result)
    }
}

async function update(req, res, next) {
    if (req.user.abilities.cannot('update', kamar)) {
        return next(Forbidden())
    }
    const { id } = req.params
    const { body } = req
    nomor = body.nomor
    const already = await kamar.findOne({where:{[Op.and]: [{nomor:{[Op.like]:nomor}},{id:{[Op.ne]:id}}]} })

    if(already){
        return res.send({message: "Nomor kamar already exists"})
    }
    else{
        const result = await kamar.update(body, {where: {id}})
        result[0]
            ? res.json({message: "Successfully updated"})
            : next(NotFound())
    }
}

async function remove(req, res, next) {
    if (req.user.abilities.cannot('delete', kamar)) {
        return next(Forbidden())
    }
    const { id } = req.params
    const result = await kamar.destroy({ where: { id } })
    result === 1
        ? res.json({ message: 'Successfully deleted' })
        : next(NotFound())
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}