import catcher from "../utils/catcher.js";
import User from "../models/UserModel.js";
import jwt from "../utils/jwt.js";

const Logincontroller = {
    login: catcher(async (req, res) => {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid User' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid Password' });
        }

        const token = jwt.generateToken({email: user.email, password: user.password});

        return res.json({ message: 'Login successful', data: {token} });
    }),

    register: catcher(async (req, res) => {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const newUser = new User({ email, password });
        await newUser.save();

        return res.status(201).json({ message: 'User registered successfully' });
    })
}

export default Logincontroller;