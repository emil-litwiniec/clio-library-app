import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import isEmail from "validator/lib/isEmail";

const Helper = {
    hashPassword(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
    },

    comparePassword(hashPassword, password) {
        return bcrypt.compareSync(password, hashPassword);
    },

    isValidEmail(email) {
        return isEmail(email);
    },

    generateToken(id, isAdmin = false, firstName, lastName) {
        const token = jwt.sign({
            userId: id,
            admin: isAdmin,
            firstName,
            lastName
        },
        process.env.SECRET,
        { expiresIn: "7d"});
        return token;
    }
}

export default Helper;