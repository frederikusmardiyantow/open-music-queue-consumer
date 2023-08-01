require('dotenv').config();
const amqp = require('amqplib');
const SongsPlaylistService = require('./SongsPlaylistService');
const MailSender = require('./MailSender');
const Listener = require('./listener');

const init = async () => {
  const songsPlaylistService = new SongsPlaylistService();
  const mailSender = new MailSender();
  const listener = new Listener(songsPlaylistService, mailSender);

  const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
  const channel = await connection.createChannel();
  await channel.assertQueue('export:playlist', {
    durable: true,
  });

  await channel.consume('export:playlist', listener.listen, { noAck: true });
};

init();
