const generateOTP = () => {
  var digits = '123456789';
  var otpLength = 7;
  var otp = '';

  for (let i = 1; i <= otpLength; i++) {
    var index = Math.floor(Math.random() * digits.length);
    otp = otp + digits[index];
  }

  return otp;
};

module.exports = generateOTP;
