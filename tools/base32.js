export const generateBase32String = (length) => {
    const characters = "abcdefghjkmnpqrstvwxyz1234567890";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * characters.length)
        );
    }
    return result;
};
