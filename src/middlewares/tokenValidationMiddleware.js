import db from "../db.js";

export const tokenValidation = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        const token = authorization?.replace("Bearer ", "").trim();
        if (!token) {
            return res.sendStatus(401);
        }
        const session = await db.collection('sessions').findOne({ token });
        if (!session) {
            return res.sendStatus(401);
        }
        const user = await db.collection("users").findOne({ _id: session.userId });
        if (!user) {
            return res.sendStatus(401);
        }

        delete user.password;
        res.locals.user = user;

        next()
    }
    catch (e) {
        console.log('Erro na validação do token')
        return res.sendStatus(500);
    }
}