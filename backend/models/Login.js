const mongoose=require('mongoose');


const loginSchema = {
    username: String,
    password: String,
    email: String,
    status: { type: String, default: "user" },
    permit: { type: Boolean, default: false },
}

const Login = mongoose.model("Logindetails", loginSchema);

module.exports = Login;