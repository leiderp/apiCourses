const { User } = require("../database/models");

const createUser = async (dataUser) => {
    const user = await User.create(dataUser);
    return user;
};

const getUserByEmail = async (email) => {
    const user = await User.findOne({ where: { email: email } });
    return user;
}

module.exports = {
    createUser,
    getUserByEmail
};