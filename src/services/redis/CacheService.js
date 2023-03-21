const redis = require('redis');
 
class CacheService {

  constructor() {

    this._client = redis.createClient({
      socket: {
        host: process.env.REDIS_SERVER,
      },
    });

    // Kode di atas menunjukkan bahwa kita membuat private properti this._client yang bernilai client Redis. 
    // Client tersebut dibuat menggunakan perintah createClient yang memanfaatkan package redis. 
    // Melalui properti this._client inilah nantinya kita bisa mengoperasikan Redis server.

    this._client.on('error', (error) => {
      console.error(error);
    });

    // agar client redis terhubung dengan redis server, kita perlu memanggil fungsi this._client.connect().
    this._client.connect();

  }

  // cara penyimpanan nilai pada Redis menggunakan Redis client, di mana kita menggunakan fungsi this._client.set 
  // dan memberikan key, value, serta waktu kedaluwarsa dari nilai parameter fungsi CacheService.set
  async set(key, value, expirationInSecond = 3600) {

    await this._client.set(key, value, {
      EX: expirationInSecond,
    });

  }

  async get(key) {

    // Bila nilai pada key yang diminta tidak ada atau (nil), 
    // maka fungsi this._client.get akan mengembalikan null. 
    // Di saat itulah kita perlu membangkitkan error karena nilai yang dicari tidak ditemukan.

    const result = await this._client.get(key);
    if (result === null) throw new Error('Cache tidak ditemukan');
    return result;

  }

  // Fungsi yang baru saja kita tuliskan adalah operasi dalam mendapatkan nilai pada key di Redis. Bila di redis-cli kita menggunakan perintah GET, 
  // di sini kita menggunakan fungsi asynchronous this._client.get.

  delete(key) {

    // Fungsi this._client.del mengembalikan jumlah nilai yang dihapus pada cache 
    // nilai tersebut bisa kita manfaatkan sebagai nilai kembalian dari fungsi delete.

    return this._client.del(key);

  }

  // Fungsi ini dibuat tanpa menuliskan keyword async. 
  // Mengapa demikian? 
  // Karena kita sama sekali tidak menuliskan await di dalam body fungsi, 
  // melainkan langsung mengembalikan dengan nilai dari fungsi this._client.del yang merupakan sebuah Promise.

}

module.exports = CacheService;