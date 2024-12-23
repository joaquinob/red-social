const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

// const JWT_SECRET = 'CLAVE-JWT';
const JWT_EXPIRES_IN = '90d';

const userController = {

    register: async (req, res) => {
        try{
            const{
                username,
                email,
                password
            } = req.body;
            const newUser = new User({
                username,
                email,
                password: password
            });

            await newUser.save();
            res.status(201).send({message: 'Usuario registrado con éxito', userId: newUser._id });
        } catch (error) {
            res.status(500).json({ message: 'Error al registrar el usuario', error: error.message });
        }
    },

    login: async (req, res) => {
        try {
            const {
                email,
                password
            } = req.body;

            const user = await User.findOne({ email });

            if(!user){
                return res.status(404).json({message: 'Usuario no encontrado'})
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch) {
                return res.status(401).json({ message: 'Contraseña incorrecta' })
            }

            const token = jwt.sign({ userId: user._id}, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
            res.status(200).json({ message: 'Login Exitoso', token, id: user._id, username: user.username, email: user.email})
        }
        catch(error){
            res.status(500).json({ message: 'Error en el login', error: error.message })
        }
    },

    updateProfile: async (req, res) => {
        try {
            const { userId } = req.params;
            const { name, email } = req.body;
            const updatedUser = await User.findByIdAndUpdate(userId, {name, email}, {new: true});

            if(!updatedUser){
                return res.status(404).json({ message: 'Usuario no encontrado'})
            }
            res.status(200).json({ message: 'Update Exitoso', user: updatedUser })
        }
        catch(error){
            res.status(500).json({ message: 'Error en el update del usuario', error: error.message })
        }
    }
}