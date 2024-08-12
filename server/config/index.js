module.exports = {
  "port": 8000,
  "databaseDefault": "mongodb",
  "databaseConnectOnInit": true,
  "imageBaseUrl": "http://localhost:8000",
  "database": {
    "mongodb": [
      {
        "active": true,
        "url": "mongodb://0.0.0.0:27017/matrimony",
        "options": {}
      }
    ]
  },
  "jwtKey": "ABCDEFGH",
  "mailgun": {
    APIKEY: "xxx"
  },
}
