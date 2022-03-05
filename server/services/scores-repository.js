import esClient from "./es-client";

const index = 'scores';

const handleElasticsearchError = (error) => {
  if (error.status === 404) {
    throw new Error('Message Not Found');
  }
  throw new Error(error.msg);
};

const getAll = () => esClient.search({
  index,
}).then(response => response).catch((error) => {
  handleElasticsearchError(error);
});

const store = score => esClient.index({
  index,
  refresh: 'true',
  body: score,
}).then (response => response.statusCode).catch((error) => {
  handleElasticsearchError(error);
});

const getScore = username => esClient.search({
  index,
  body: {
    "query": {
      "match": {
        "username":{
          "query": username
        }
      }
    }
  },
}).then(response => response).catch((error) => {
  handleElasticsearchError(error);
});

const remove = username => esClient.deleteByQuery({
  index,
  refresh: 'true',
  body: {
    "query": {
      "match": {
        "username": {
          "query": username
        }
      }
    }
  }
}).then(response => response).catch((error) => {
  handleElasticsearchError(error);
});

const update = score => esClient.search({
  index,
  body: {
    "query": {
      "match": {
        "username":{
          "query": score.username
        }
      }
    }
  },
}).then(response => {
  const id = response.body.hits.hits[0]._id;
  esClient.index({
    index,
    refresh: 'true',
    id: id,
    body: score,
})
}).catch((error) => {
  handleElasticsearchError(error);
});

export default {
  getScore,
  getAll,
  store,
  remove,
  update
};
