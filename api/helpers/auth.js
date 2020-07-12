const jwt = require('jsonwebtoken');

const jwtKey = process.env.JWT_SECRET || '8frs**t$b3r$8)-@+psi*56sdi46=wl(ec)(u$&tjy#io!62z2';

const checkToken = (req, res, next) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Auth Error" });

    const decoded = jwt.verify(token, jwtKey);
    req.user = decoded.user;
  } catch (error) {
    return res.json({autenticado: false})
  }

  next();
}
const auth = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    
    const decoded = jwt.verify(token, jwtKey);
    console.log('decoded :>> ', decoded);
    req.user = decoded.user;
  } catch (error) {
    return res.sendStatus(403)
  }
  next();


}

module.exports = {
  checkToken,
  auth
}