import user from "../Models/admin.js";
import bcrypt from 'bcryptjs';

export const register = async(req, res) => {
    const { username, password, email } = req.body;

    try {
        // email already
        const exitingUser = await user.findOne({ email });
        if(exitingUser) {
            return res.status(400).json({ message: "User already" });
        }

        // password bcrypt
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new user({
            username,
            password: hashedPassword,
            email
        });

        // save user
        await newUser.save();

        res.status(201).json({ message: "Registrasi succes", User: newUser });
    } catch (error) {
        res.status(500).json({ message: "Error registrasi", error });
    }
}

export const login = async(req, res) => {
    const { email, password } = req.body;

    try {
        const User = await user.findOne({ email });

        // User not found
        if (!User) {
            return res.status(404).json({ message: "user not Found" });
        }

        // Wrong password bcrypt
        const isPasswordCorrect = await bcrypt.compare(password, User.password);

        if (!isPasswordCorrect) {
            return res.status(404).json({ message: "Wrong Password" });
        }

        res.status(200).json({ message: "login succes", User });
    } catch (error) {
        res.status(500).json({ message: "error", error });
    }
}