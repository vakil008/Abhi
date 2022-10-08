export const validateMobileNumber = (param) => {
  console.log("mobile number validate is call ", param)
  const emailRegex = /^\d{10}$/
  if (param) {
    if (emailRegex.test(param)) {
      return false
    } else {
      return "Please number should be of 10 digits"
    }
  }
}

export const validateEmail = (param) => {
  console.log("email validate is call ", param)
  const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
  if (param) {
    if (emailRegex.test(param)) {
      return false
    } else {
      return "Please enter a valid email"
    }
  }
}