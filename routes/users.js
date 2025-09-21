const express = require("express");
const router = express.Router();

const {
  hasNoAttributesToUpdate,
  isPasswordValid,
  isUserTypeValid,
  isUserValid,
  updateUserFields,
  USER_TYPES
} = require("../utils/users");

let users = [
  { id: 1, name: "User_A", password: "senha1", type: USER_TYPES.common },
  { id: 2, name: "User_B", password: "senha2", type: USER_TYPES.admin },
];

let nextId = 3;

router.get("/", (req, res) => {
  return res.json(users);
});

router.post("/", (req, res) => {
  let { name, password, type } = req.body;

  if (!isUserValid({ name, password, type })) {
    return res
      .status(400)
      .json({ error: "Name, password, and type are required!" });
  }

  if (!isUserTypeValid(type, USER_TYPES)) {
    return res.status(400).json({ error: "User type is not valid!" });
  }

  if (!isPasswordValid(password)) {
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters!" });
  }

  const newUser = { id: nextId++, name, password, type };
  users.push(newUser);

  return res
    .status(201)
    .json({ message: "User has been created!", user: newUser });
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ error: "User not found!" });
  }

  const { name, password, type } = req.body;

  if (hasNoAttributesToUpdate({ name, password, type })) {
    return res.status(400).json({ error: "No attributes to update!" });
  }

  const result = updateUserFields(user, { name, password, type });

  if (result.error) {
    return res.status(400).json({ error: result.error });
  }

  return res.status(200).json({
    message: "User has been updated",
    user: result.user,
  });
});

router.get("/:id", (req, res) => {
  const user = users.find((u)  => {
    return u.id === Number(req.params.id);
  });

  if(!user) {
    return res.status(404).json({ error: "User not found" });
  }

  return res.json(user);
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ error: "User not found!" });
  }

  users = users.filter((u) => u.id !== id);

  return res.status(200).json({ message: "The user has been deleted!" });
});

module.exports = router;
