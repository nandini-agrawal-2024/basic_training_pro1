const validUser = async(req,res,next) => {
  let {token} = req.cookies;
  if(!token)
  {
    return res.render('login')
  }
  else
  {
    next();
  }
}

module.exports = validUser;
