import getPrismaClient from "../utils/PrismaClient.js";

export const checkUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.json({ error: "email is required", status: false });
    }
    const prisma = getPrismaClient();
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.json({ error: "user not found", status: false });
    } else {
      return res.json({ message: "user is created", status: true, data: user });
    }
  } catch (err) {
    next(err);
  }
};

export const onBoardUser = async (req, res, next) => {
  try {
    const { email, name, about, image: profilePic } = req.body;
    if (!email || !name) {
      return res.send("Email, Name, Image are required!!");
    }
    const prisma = getPrismaClient();
    await prisma.user.create({
      data: {
        email,
        name,
        about,
        profilePic,
      },
    });
    return res.json({ msg: "success", status: true });
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const prisma = getPrismaClient();
    const users = await prisma.user.findMany({
      orderBy: { name: "asc" },
      select: {
        id: true,
        email: true,
        about: true,
        profilePic: true,
        name: true,
      },
    });
    const usersGroupedByLetter = {};
    users.forEach((user) => {
      const initialLetter = user.name.charAt(0).toUpperCase();
      if (!usersGroupedByLetter[initialLetter]) {
        usersGroupedByLetter[initialLetter] = [];
      }
      usersGroupedByLetter[initialLetter].push(user);
    });
    return res.status(200).send({ users: usersGroupedByLetter });
  } catch (error) {}
};
