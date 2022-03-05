import esClient from "./es-client";

const index = 'messages';

const handleElasticsearchError = (error) => {
  if (error.status === 404) {
    throw new Error('Message Not Found');
  }
  throw new Error(error.msg);
};

const getAll = () => esClient.search({
  index
}).then(response => response).catch((error) => {
  handleElasticsearchError(error);
});

const store = message => esClient.index({
  index,
  refresh: 'true',
  body: message
}).then(response => response.statusCode).catch((error) => {
  handleElasticsearchError(error);
});

const getMessage = id => esClient.search({
  index,
  body: {
    "query": {
      "match": {
        "id":{
          "query": id
        }
      }
    }
  },
}).then(response => response).catch((error) => {
  handleElasticsearchError(error);
});

const remove = id => esClient.deleteByQuery({
  index,
  refresh: 'true',
  body: {
    "query": {
      "match": {
        "id": {
          "query": id
        }
      }
    }
  }
}).then(response => response).catch((error) => {
  handleElasticsearchError(error);
});

export default {
  getAll,
  getMessage,
  store,
  remove
}
