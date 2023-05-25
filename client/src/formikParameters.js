//REGISTER

const registerInitialValues = {
  avatar: "",
  email: "",
  username: "",
  lastname: "",
  password: "",
  confirmPassword: "",
  age: "",
  phone: "",
  direction: "",
};

const registerErrors = (values) => {
  let errors = {};

  if (!values.avatar) {
    errors.avatar = "Please enter an url.";
  }

  if (!values.email) {
    errors.email = "Please enter an email.";
  } else if (
    !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)
  ) {
    errors.email =
      "The email can only contain letters, numbers, dots, underscore and hyphen.";
  }

  if (!values.username) {
    errors.username = "Please enter your name.";
  } else if (!/^[a-zA-ZÀ-ÿ]{1,40}$/.test(values.username)) {
    errors.username = "The name can only contain upper and lower case letters.";
  }
  if (!values.lastname) {
    errors.lastname = "Please enter your lastname";
  } else if (!/^[a-zA-ZÀ-ÿ]{1,40}$/.test(values.lastname)) {
    errors.lastname =
      "The lastname can only contain upper and lower case letters.";
  }
  if (!values.password) {
    errors.password = "Please enter your password.";
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = "Please confirm your password.";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }
  if (!values.age) {
    errors.age = "Please enter your age.";
  } else if (values.age < 18) {
    errors.age = "You must be over 18 years old.";
  }
  if (!values.phone) {
    errors.phone = "Please enter your phone number.";
  }
  if (!values.direction) {
    errors.direction = "Please enter your direction.";
  }

  return errors;
};

//LOGIN

const loginInitialValues = {
  user: "",
  password: "",
};

const loginErrors = (values) => {
  let errors = {};

  if (!values.user) {
    errors.user = "Please enter an email.";
  } else if (
    !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.user)
  ) {
    errors.user =
      "The email can only contain letters, numbers, dots, underscore and hyphen.";
  }
  if (!values.password) {
    errors.password = "Enter your password.";
  } else if (values.password.length < 4) {
    errors.password = "The password must be greater than 4 characters.";
  }

  return errors;
};

//ADMIN

const productInitialValues = {
  title: "",
  description: "",
  img: "",
  price: "",
  stock: "",
};

const newProductsError = (values) => {
  let errors = {};

  if (!values.title) {
    errors.title = "Please enter a title.";
  }
  if (!values.description) {
    errors.description = "Please enter a description.";
  }
  if (!values.img) {
    errors.img = "Please enter an image.";
  }
  if (!values.price) {
    errors.price = "Please enter a price.";
  }
  if (!values.stock) {
    errors.stock = "Please enter stock of this product.";
  }

  return errors;
};

export {
  registerErrors,
  registerInitialValues,
  loginErrors,
  loginInitialValues,
  productInitialValues,
  newProductsError,
};
