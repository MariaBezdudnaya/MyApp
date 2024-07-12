import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
let users = [];
const saltRounds = 10; 

export const register = (req, res) => {
    const { username, password } = req.body;
    if(users.some(user => user.username === username)) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    users.push({ username, password: hashedPassword});
    res.status(201).json({ message: 'Registered successfully' });
};

export const login = (req, res) => {
    const { username, password } = req.body;
    let user = users.find(user => user.username === username);
    if(!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(400).json({ message: 'Username or password is incorrect' });
    }
    const token = jwt.sign({username: user.username}, 'your_jwt_secret_key');
    res.json({ token });
};