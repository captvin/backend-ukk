const { user } = require('@models')
const {tokenGenerator}= require('@utils/tokenGenerator')
const bcrypt = require('bcrypt');


    async function login(req, res, next) {

        // try{

            const { username } = req.body

            const result = await user.findOne({where: {username}})
            if(!result){
                return res.json({message:"User not found",
                                             code: 401 
                                            });
            }
            
            
            const { password } = req.body
            const password_match = await bcrypt.compare(password, result.password)

            if(password_match){
                const id = (result.id)
                const role = (result.role)
                const username = (result.username)
                const token = await tokenGenerator({id,role,username})
    
                return res.json({  
                                    logged: true,
                                    data: result,
                                    token : token
                                })
            }

            else{
                return res.json({   message:"Wrong password",
                                                code: 402
                                            })
            }

    
    }

    module.exports = {
        login
    }





   