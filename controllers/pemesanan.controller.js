const { detail, pemesanan, tipe, kamar} = require('@models')
const { NotFound, Forbidden } = require('http-errors')
const { Op } = require('sequelize')

async function findAll(req, res, next) {
    if (req.user.abilities.cannot('read', detail)) {
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

    const { id_tipe, tgl_pesan, email_tamu } = req.query

    if (id_tipe) {
        options.where['id_tipe'] = id_tipe
    }
    if(tgl_pesan) {
        options.where['tgl_pesan'] = tgl_pesan
    }
    if(email_tamu){
        options.where['email_tamu'] = {[Op.like]: `%${email_tamu}%`}
    }

    const result = await pemesanan.findAndCountAll(options)
    const totalPage = Math.ceil(result.count / limit)

    res.json({ currentPage: page, totalPage, rowLimit: limit, ...result })
}

async function findById(req, res, next) {
    if (req.user.abilities.cannot('read', detail)) {
        return next(Forbidden())
    }
    const relations = []
    if (req.query.getDetail === 'true') {
        relations.push('transaksi')
    }
    const detail = await detail.findByPk(req.params.id, { include: relations })
    result
        ? res.send(detail)
        : next(NotFound())
}

async function create(req, res, next) {
    if (req.user.abilities.cannot('create', (pemesanan, detail))) {
        return next(Forbidden())
    }

    const { body } = req
    const id_kamar = body.id_kamar
    body.qty = id_kamar.length
    body.tgl_pesan = new Date().toISOString().substr(0, 10)
    body.status_pesan = "baru"
    const nama_tamu = body.nama_tamu
    const tgl_pesan = body.tgl_pesan
    const already = await pemesanan.findOne({where: {nama_tamu}})
    const already2 = await pemesanan.findOne({where: {tgl_pesan}})


    //logika mulai dari sini
    if(already && already2){
        return res.send({message: "pemesanan atas nama "+ nama_tamu +" sudah ada. Silahkan menggunakan nama lain"})
    }
    else {
        const result = await pemesanan.create(body)

        //create detail
        let tgl_in = new Date(body.tgl_in)
        let tgl_out = new Date(body.tgl_out)
        let jumlah_hari = (tgl_out.getTime() - tgl_in.getTime())/(1000*3600*24)

        //get id_pemesanan yang baru di post
        const id_pemesanan = result.id

        //mendapatkan kamar yang dipilih
        
        let result_detail = []

        //mendefinisikan harga sesuai tipe kamar
        const id = body.id_tipe
        const harga = await tipe.findOne({attributes:['harga'],  where: {id}})

        //looping sebanyak kamar
        for (let i=0; i< id_kamar.length; i++){
            let tgl_terisi = tgl_in

            for (let j =0; j < jumlah_hari; j++){
                result_detail.push({
                    id_pemesanan : id_pemesanan,
                    id_kamar: id_kamar[i],
                    tgl_terisi: tgl_terisi,
                    harga: harga.harga
                })
                tgl_terisi = new Date(tgl_terisi.getTime() + 86400000)

            }
        }

        await detail.bulkCreate(result_detail)
        res.send(result)
        
    }
}

async function update(req, res, next) {
    if (req.user.abilities.cannot('update', pemesanan)) {
        return next(Forbidden())
    }
    const { id } = req.params
    const { body } = req
    const data = await pemesanan.findOne({where: {id}})
    body.nama_tamu = data.nama_tamu
    body.email_tamu = data.email_tamu
    body.tgl_pesan = data.tgl_pesan
    body.tgl_out = data.tgl_out
    body.tgl_in = data.tgl_in
    body.qty = data.qty
    body.id_tipe = data.id_tipe
    const result = await pemesanan.update(body, { where: { id } })
    console.log(result)
    // result[0]
    //     ?res.json({message : "Successfully booking hotel"})
    //     :next(NotFound())
}

async function remove(req, res, next) {
    if (req.user.abilities.cannot('delete', detail)) {
        return next(Forbidden())
    }
    const { id } = req.params
    const result = await detail.destroy({ where: { id } })
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


//how to create const tgl_pemesanan = date.now() with format date YYYY-MM-DD?