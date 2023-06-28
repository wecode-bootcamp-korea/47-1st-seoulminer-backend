const { userService } = require('../services')

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
  
    if (!email || !password) {
      const error = new Error('KEY_ERROR')
      error.statusCode = 400;
      throw error;
    }
    
    const accessToken = await userService.signIn(email, password);
    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(error).json({message: "error"});
  }
}

module.exports = { signIn }