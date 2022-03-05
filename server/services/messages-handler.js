import messagesRep from "./messages-repository";

async function getMessages(req, res) {
  try {
    const result = await messagesRep.getAll();
    const finalArray = [];
    for (let obj of result.body.hits.hits) {
      finalArray.push(obj._source);
    }
    res.send(finalArray);
  } catch (error) {
    res.status(400).end();
  }
}

async function create(req, res) {
  res.set('Content-Type', 'application/json');
  try {
    const messageBool = await messageExists(req.body.id);
    if (messageBool) {
      res.send({});
    }
    else {
      await messagesRep.store(req.body)
      res.status(200).send(req.body);
    }
  } catch (e) {
    res.status(400).end();
  }
}

async function messageExists(id) {
  try {
    const result = await messagesRep.getMessage(id);
    return result.body.hits.total.value > 0;
  } catch (e) {
    console.log('error getting message', e);
    return false;
  }
}

async function messageDelete(req, res) {
  try {
    const messageBool = await messageExists(req.params.id);
    if (!messageBool) {
      res.status(404).end();
    }
    else {
      const result = await messagesRep.remove(req.params.id);
      res.send(result);
    }
  } catch (error) {
    res.status(400).end();
  }
}

export default {
  getMessages,
  create,
  messageDelete
}
