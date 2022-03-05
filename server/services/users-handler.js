import usersRep from './users-repository';

async function getUsers(req, res) {
    try {
        const result = await usersRep.getAll();
        const finalArray = [];
        for (let obj of result.body.hits.hits) {
            finalArray.push(obj._source);
        }
        res.send(finalArray);
    } catch (e) {
        res.status(400).end();
    }
}

async function create(req, res) {
    res.set('Content-Type', 'application/json');
    try {
        const userBool = await userExists(req.body.name);
        if (userBool) {
            res.send({});
        }
        else {
            await usersRep.store(req.body)
            res.status(200).send(req.body);
        }
    } catch (e) {
        res.status(400).end();
    }
}

async function userExists(name) {
    try {
        const result = await usersRep.getUser(name);
        return result.body.hits.total.value > 0;
    } catch (e) {
        console.log('error getting user', e);
        return false;
    }
}

async function userDelete(req, res) {
    try {
        const userBool = await userExists(req.params.id);
        if(!userBool) {
            res.status(404).end();
        } else {
            const result = await usersRep.remove(req.params.id);
            res.send(result);
        }
    } catch (error) {
        res.status(error.status || 400).end();
    }
}

export default {
    getUsers,
    create,
    userExists,
    userDelete,
};
