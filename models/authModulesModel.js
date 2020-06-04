'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authModulesSchema = new Schema({
    module: {
        type: String,
        unique: true
    },
    permId: [{
        type: Schema.Types.ObjectId,    
        ref: 'Permissions'
    }],
});

const AuthModules = mongoose.model('AuthModules', authModulesSchema);
const AuthModulesModel = {};

AuthModulesModel.isAuth = async (permId, module) => {
    return await AuthModules.find({module, permId}).exec();
}

AuthModulesModel.findAuthModules = async () => {
    return await AuthModules.find({}).populate({
        path: 'permId',
        model: "Permissions"
    }).exec();
}

AuthModulesModel.findAuthPermType = async module => {
    return await AuthModules.findOne(module).populate({
        path: 'permId',
        model: "Permissions"
    }).exec();
};

AuthModulesModel.updateAuthPerm = async (id, authPerm) => {
    return await AuthModules.findByIdAndUpdate(id, authPerm).exec();
};

AuthModulesModel.removePermId = async permId => {
    return await AuthModules.update({"permId": permId}, {"$pull": {"permId": permId}}, {multi: true}).exec();
};

AuthModulesModel.saveAuthPerm = async authPerm => {
    let newAuthPerm = new AuthModules(authPerm);
    return await newAuthPerm.save();
};

module.exports = AuthModulesModel;