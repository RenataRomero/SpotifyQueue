const mongoose = require('mongoose');
const uri = require('../utils/bd').URI;

const conn = mongoose.createConnection(uri, {
    bufferCommands: false,
    bufferMaxEntries: 0,
    useUnifiedTopology: true,
    useNewUrlParser: true
});

let queueSchema = {
    user_id: String,
    queueUrl: String,
    playlistUrl: String,
    playlist_id: String,
    access_token: String,
    refresh_token: String
  };

conn.model('queues', new mongoose.Schema(queueSchema), 'queues');

let QUEUE = conn.model('queues');

module.exports.QUEUE = QUEUE;
