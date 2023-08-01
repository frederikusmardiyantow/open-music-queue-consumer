const nodemailer = require('nodemailer');

class MailSender {
  constructor() {
    this._transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  sendEmail(targetEmail, content) {
    const message = {
      from: '"Open Music App" <open-music-app@openmusic.com>',
      to: targetEmail,
      subject: 'Ekspor Songs in Playlist',
      text: 'Terlampir hasil dari ekspor songs in playlist',
      attachments: {
        filename: 'playlist.json',
        content,
      },
    };

    return this._transporter.sendMail(message);
  }
}

module.exports = MailSender;
