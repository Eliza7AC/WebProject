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

const getScore = scoreId => esClient.search({
  index,
  body: {
    "query": {
      "match": {
        "scoreId":{
          "query": scoreId
        }
      }
    }
  },
}).then(response => response).catch((error) => {
  handleElasticsearchError(error);
});

const remove = scoreId => esClient.deleteByQuery({
  index,
  refresh: 'true',
  body: {
    "query": {
      "match": {
        "scoreId": {
          "query": scoreId
        }
      }
    }
  }
}).then(response => response).catch((error) => {
  handleElasticsearchError(error);
});

export default {
  getScore,
  getAll,
  store,
  remove,
};
