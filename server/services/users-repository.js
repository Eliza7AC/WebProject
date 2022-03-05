import esClient from "./es-client";

const index = 'users';

const handleElasticsearchError = (error) => {
    if (error.status === 404) {
        throw new Error('User Not Found');
    }
    throw new Error(error.msg);
};

const getAll = () => esClient.search({
    index,
}).then(response => response).catch((error) => {
    handleElasticsearchError(error);
});

const store = user => esClient.index({
    index,
    refresh: 'true',
    body: user,
}).then (response => response.statusCode).catch((error) => {
    handleElasticsearchError(error);
});

const getUser = name => esClient.search({
    index,
    body: {
        "query": {
            "match": {
                "name":{
                    "query": name
                }
            }
        }
    },
}).then(response => response).catch((error) => {
    handleElasticsearchError(error);
});

const remove = name => esClient.deleteByQuery({
    index,
    refresh: 'true',
    body: {
        "query": {
            "match": {
                "name": {
                    "query": name
                }
            }
        }
    }
}).then(response => response).catch((error) => {
    handleElasticsearchError(error);
});

export default {
    getUser,
    getAll,
    store,
    remove,
};
