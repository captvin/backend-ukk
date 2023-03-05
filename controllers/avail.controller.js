const { kamar, detail, pemesanan, tipe } = require('@models')
const { NotFound, Forbidden } = require('http-errors')
const { Op } = require('sequelize')

async function findAll(req, res, next) {
    if (req.user.abilities.cannot('read', (kamar, detail, pemesanan, tipe))) {
        return next(Forbidden())
    }

    const options = {
        
        // order: [
        //     ['nomor', 'ASC']
        // ],
        attributes: ['id','nama_tipe'],
        include: [
            {
                model: kamar,
                as: "kamar",
                attributes: ["nomor"],
                required: false,
                where:{},
                include: [
                    {
                        model: detail,
                        as: "detail",
                        attributes: ["tgl_terisi"],
                        required: false,
                        where: {
                            ['tgl_terisi']:{
                                
                            }
                        }
                    },
                ],
            },
        ],

        
        where: {}
    }

    const { id_tipe, tgl_in, tgl_out } = req.query
    const dateOut = new Date(tgl_out)
    dateOut.setDate(dateOut.getDate() - 1)
    const tgl_out1 = dateOut.toISOString().slice(0, 10)
    
    if (tgl_in && tgl_out) {
        options.include[0].include[0].where.tgl_terisi ={
            [Op.between]: [tgl_in, tgl_out1] 
                
            
        } 
    }
    
    if (id_tipe) {
        options.where = {
            
              ['id']: id_tipe,
              "$kamar->detail.tgl_terisi$": {[Op.is]: null}
            
        }
    }
    else{
        options.where = {
            
            "$kamar->detail.tgl_terisi$": {[Op.is]: null}
          
      }
    }

    const result = await tipe.findAll(options);

    res.json(result)
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
    const result = await kamar.findByPk(id, { include: "tipe" })
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
    const already = await kamar.findOne({ where: { nomor } })

    if (already) {
        return res.send({ message: "Nomor kamar already exists" })
    }
    else {
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
    const already = await kamar.findOne({ where: { [Op.and]: [{ nomor: { [Op.like]: nomor } }, { id: { [Op.ne]: id } }] } })

    if (already) {
        return res.send({ message: "Nomor kamar already exists" })
    }
    else {
        const result = await kamar.update(body, { where: { id } })
        result[0]
            ? res.json({ message: "Successfully updated" })
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