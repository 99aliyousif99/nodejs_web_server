const userDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}


const bcrypt = require('bcrypt');
const handleLogin = async (req, res) => {
    const {user,pwd} = req.body;
    if (!user || !pwd) 
        return res.status(400).json({ 'message': 'Username and password are required.' });
    //checking for the user in the database
    const founduser = userDB.users.find(u => u.username === user);
    if (!founduser) return res.status(401);
    const match = await bcrypt.compare(pwd, founduser.password);
    if (match){
        //create JWT
        res.json ({'success':`User ${user} logged in successfully.`});

    }
    else {
        res.status(401).json({'message':'Invalid username or password.'});
    }
};

module.exports = { handleLogin };