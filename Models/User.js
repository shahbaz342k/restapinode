const { default: mongoose } = require("mongoose");
const bcrypt = require('bcrypt')
const UserSchema = mongoose.Schema({

        username: {
            required:true,
            type: String
        },
        email: {
            required:true,
            type: String
        },
        password: {
            required:true,
            type: String
        },
    
},{ timestamps: true })

// encrypt password before save in db


UserSchema.pre("save", async function(next){
    if( !this.isModified('password') ){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})


// decrypt passowrd for login
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password )
}
// UserSchema.methods
const UserModel = mongoose.model('user', UserSchema);
module.exports = UserModel;