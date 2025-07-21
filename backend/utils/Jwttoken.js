export function sendJwttoken(user, statuscode, res) {
  const token = user.generateToken();
  console.log(token)

  res.status(statuscode)
  .cookie('token', token, {
    expires: new Date(Date.now() + process.env.COOKEI_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
  })
  .json({
    success: true,
    token
  });
}
