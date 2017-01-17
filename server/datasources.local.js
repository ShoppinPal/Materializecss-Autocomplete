module.exports = {
mongodb: {
url: process.env.DB_URL || 'mongodb://localhost:27017/blubox',
connector: process.env.CONNECTOR || 'loopback-connector-mongodb' //https://docs.strongloop.com/display/public/LB/MongoDB+connector#MongoDBconnector-Replicasetconfiguration
}
};
