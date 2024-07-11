const userDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}

const fspromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const {user,pwd} = req.body;
    if (!user || !pwd) 
        return res.status(400).json({ 'message': 'Username and password are required.' });
    //checking for duplicate usernames in the database
    const duplicate = userDB.users.find(u => u.user === user);
    if (duplicate) 
        return res.status(400).json({ 'message': 'Username already exists.' });
    //hashing the password
    try {
        const hashedpwd = await bcrypt.hash(pwd,10);
        //storing the user
        const newUser = {"username":user,"password":hashedpwd};
        userDB.setUsers([...userDB.users, newUser]);
        await fspromises.writeFile(path.join(__dirname, '../model/users.json'), JSON.stringify(userDB.users, null, 2));
        console.log(userDB.users);
        res.status(201).json({ 'message': 'User created successfully.' });
    } catch (error) {
        res.status(500).json({ 'message': error.message });
    }
    }

    module.exports = { handleNewUser };