const commendModel = require('../models/commend');
const commendController = {}

commendController.get = async (req, res) => {
    const id = req.params.commendId;
    try{
        if(res.locals.users){
            const commend = await commendModel.findById(id)
                                                .populate('user', ['email'])
                                                .populate('board', ['board']);
            if(!commend){
                return res.status(400).json({
                    msg : "not commendId"
                })
            }
            else{
                res.status(200).json({
                    msg : "get commend",
                    commend : commend
                })
            }
        }
        else{
            return res.status(400).json({
                msg : "not token"
            })
        }
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
};
commendController.save = async (req, res) => {
    const board = req.params.boardId;
    const newCommend = new commendModel({
        user : res.locals.users.id,
        board : board,
        commend : req.body.commend
    })
    try{
        if(res.locals.users){
            const commend = await newCommend.save();
            res.status(200).json({
                msg : 'save commend',
                commend : commend
            })
        }
        else{
            return res.status(400).json({
                msg : "not token"
            })
        }
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
};
commendController.update = async (req, res) => {
    const id = req.params.boardId;
    try{
        if(res.locals.users){
            const commend = await commendModel.findByIdAndUpdate(id, {$set : {
                                user : res.locals.users.id,
                                board : id,
                                commend : req.body.commend
                            }});
            if(!commend){
                return res.status(400).json({
                    msg : "not commendId"
                })
            }
            else{
                res.status(200).json({
                    msg : "update commend by id: " + id
                })
            }
        }
        else{
            return res.status(400).json({
                msg : 'not token'
            })
        }
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
};
commendController.delete = async (req, res) => {
    const id = req.params.commendId;
    try{
        if(res.locals.users){
            const commend = await commendModel.findByIdAndRemove(id);
            if(!commend){
                return res.status(400).json({
                    msg : "not commendId"
                })
            }
            else{
                res.status(200).json({
                    msg : "delete commend by id: " + id
                })
            }
        }
        else{
            return res.status(400).json({
                msg : "not token"
            })
        }
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
};

module.exports = commendController