const USER_TYPES = {
  common: "common",
  admin: "admin",
};

function isUserValid(user) {
  let { name, password, type } = user;
  if (!name) return false;
  if (!password) return false;
  if (!type) return false;
  return true;
}

function isPasswordValid(password) {
  return typeof password === "string" && password.length >= 6;
}

function isUserTypeValid(type) {
  const userType = USER_TYPES[type];
  return userType !== undefined;
}

function hasNoAttributesToUpdate(user) {
  return (
    user.name === undefined &&
    user.password === undefined &&
    user.type === undefined
  );
}

function updateUserFields(user, { name, password, type }) {
  if (name !== undefined) {
    if (name.length <= 0) {
      return { error: "Name must be valid!" };
    }
    user.name = name;
  }

  if (password !== undefined) {
    if (!isPasswordValid(password)) {
      return { error: "Password must be at least 6 characters!" };
    }
    user.password = password;
  }

  if (type !== undefined) {
    if (!isUserTypeValid(type)) {
      return { error: "User type must be valid!" };
    }
    user.type = type;
  }

  return { user };
}

module.exports = {
  isUserTypeValid,
  hasNoAttributesToUpdate,
  isPasswordValid,
  updateUserFields,
  isUserValid,
  USER_TYPES
};
