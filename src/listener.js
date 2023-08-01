class Listener {
  constructor(songsPlaylistService, mailSender) {
    this._songsPlaylistService = songsPlaylistService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(message.content.toString());

      const objek = {};
      const songsPlaylist = await this._songsPlaylistService.getSongsInPlaylist(playlistId);

      objek.playlist = songsPlaylist;
      const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(objek, null, 2));
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Listener;
