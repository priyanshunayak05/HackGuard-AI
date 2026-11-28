
import bcrypt from "bcryptjs";

async function HashPassword(password) {
    return await bcrypt.hash(password, 12);
}

async function VerifyPassword(password, storedPassword) {
    return await bcrypt.compare(password, storedPassword);
}

export { HashPassword, VerifyPassword };
