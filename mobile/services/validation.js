export const validateName = (name) => {

  // first + last name
  const regex =
    /^[A-Za-z]+ [A-Za-z]+$/;

  return regex.test(name.trim());

};

export const validateEmail = (email) => {

  // only gmail
  const regex =
    /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  return regex.test(email);

};

export const validatePhone = (phone) => {

  // exactly 10 digits
  const regex = /^[0-9]{10}$/;

  return regex.test(phone);

};

export const validatePassword = (
  password
) => {

  // minimum 6 chars
  return password.length >= 6;

};

export const validateEmployeeId = (
  id
) => {

  // EMP1234 format
  const regex =
    /^EMP[0-9]{4}$/;

  return regex.test(id);

};