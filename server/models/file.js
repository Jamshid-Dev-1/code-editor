const {Schema,model} = require('mongoose');

const codesSchema = new Schema({
    html: {type: String,default: ``},
    css: {type: String,default: ``}
})

const codeSchema = new Schema({
    codes: {type: codesSchema},
    nanoCode: String
});



const Code = model('code',codeSchema);


module.exports = Code;

