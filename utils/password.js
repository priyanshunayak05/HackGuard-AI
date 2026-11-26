async function HashPassword(password) {

    return password
}

async function VerifyPassword(password, storedPassword) {
    if(password === storedPassword) {
        return true
    }

    return false;
}

export { HashPassword, VerifyPassword }