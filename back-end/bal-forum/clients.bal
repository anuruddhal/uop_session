import ballerina/http;
import ballerinax/mysql;
import ballerinax/mysql.driver as _;

type DBConfig record {|
    string host;
    string user;
    string password;
    string database;
    int port;
|};

configurable DBConfig dbConfig = ?;

final mysql:Client forumDBClient = check new (...dbConfig);

configurable SentimentClientConfig sentimentClientConfig = ?;

type SentimentClientConfig record {|
    string clientUrl;
    string refreshUrl;
    string refreshToken;
    string clientId;
    string clientSecret;
|};

final http:Client sentimentClient = check new (sentimentClientConfig.clientUrl,
    secureSocket = {
        cert: "resources/public/server_public.crt",
        verifyHostName: false
    },
    auth = {
        refreshUrl: sentimentClientConfig.refreshUrl,
        refreshToken: sentimentClientConfig.refreshToken,
        clientId: sentimentClientConfig.clientId,
        clientSecret: sentimentClientConfig.clientSecret,
        clientConfig: {
            secureSocket: {
                cert: "resources/sts_server_public.crt"
            }
        }
    },
    retryConfig = {
        interval: 1,
        count: 3,
        statusCodes: [503]
    }
);
