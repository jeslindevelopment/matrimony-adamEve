module.exports = {
  "port": 8000,
  "databaseDefault": "mongodb",
  "databaseConnectOnInit": true,
  "imageBaseUrl": "http://localhost:8000",
  "database": {
    "mongodb": [
      {
        "active": true,
        // "url": "mongodb+srv://mathewjeslindevelopment:TmJ4QpLE1gR1k0cv@matrimonyadamneve.44dljum.mongodb.net/matrimony",
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
