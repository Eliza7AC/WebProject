import scoresRep from "./scores-repository";

async function getScores(req, res) {
  try {
    const result = await scoresRep.getAll();
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
    const scoreBool = await scoreExists(req.body.scoreId);
    if (scoreBool) {
      res.send({});
    }
    else {
      await scoresRep.store(req.body)
      res.status(200).send(req.body);
    }
  } catch (e) {
    res.status(400).end();
  }
}

async function scoreExists(scoreId) {
  try {
    const result = await scoresRep.getUser(scoreId);
    return result.body.hits.total.value > 0;
  } catch (e) {
    console.log('error getting score', e);
    return false;
  }
}

async function scoreDelete(req, res) {
  try {
    const scoreBool = await scoreExists(req.params.id);
    if(!scoreBool) {
      res.status(404).end();
    } else {
      const result = await scoresRep.remove(req.params.id);
      res.send(result);
    }
  } catch (error) {
    res.status(error.status || 400).end();
  }
}

export default {
  getScores,
  create,
  scoreDelete
}
