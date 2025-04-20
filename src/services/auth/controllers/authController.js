const User = require('../models/User');

exports.register = async (req, res) => {
    try{
        const { FirstName, LastName, Email, Password, ConfirmPassword } = req.body;

        // Check if user already exists
        const UserExists = await User.findOne({ Email});
        if(UserExists){
            return res.status(400).json({
                success: false,
                message: 'User already Exisists'
            });
        }
        
        if(Password !== ConfirmPassword){
            return res.status(400).json({
                success: false,
                message: 'Password does not match to Confirm Password'
            });
        }
        //Create user
        const user = await User.create({
            FirstName,
            LastName,
            Email,
            Password
        });
        sendTokenResponse(user, 201, res);
    } catch (error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.login = async (req, res) => {
    try{
        const { Email, Password } = req.body;

        if(!Email || !Password){
            return res.status(400).json({
                success: false,
                message: 'Please provide an email and password'
            });
        }

        const user = await User.findOne({ Email }).select('+Password');
        if(!user){
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const isMatch = await user.matchPassword(Password);
        if(!isMatch){
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
        sendTokenResponse(user, 200, res);
    } catch (error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//get current logged in user
exports.getMe = async (req, res) => {
    try{
        const user = await User.findById(req.user.id);
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    res.status(statusCode).json({
        success: true,
        token
    });
};