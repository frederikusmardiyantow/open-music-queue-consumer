const { Pool } = require('pg');

class SongsPlaylistService {
  constructor() {
    this._pool = new Pool();
  }

  async getSongsInPlaylist(id) {
    const query1 = {
      text: 'SELECT p.id, p.name FROM playlists p WHERE p.id = $1',
      values: [id],
    };
    const result1 = await this._pool.query(query1);

    if (!result1.rows.length) {
      throw new Error('playlist tidak ditemukan');
    }

    const query2 = {
      text: 'SELECT s.id, s.title, s.performer FROM bridges b JOIN songs s ON (b.song_id = s.id) WHERE b.playlist_id = $1',
      values: [id],
    };
    const result2 = await this._pool.query(query2);

    result1.rows[0].songs = result2.rows;
    return result1.rows[0];
  }
}

module.exports = SongsPlaylistService;
