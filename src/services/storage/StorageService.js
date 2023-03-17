const fs = require('fs');
 
class StorageService {

  constructor(folder) {

    this._folder = folder;

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }

  }

  writeFile(file, meta) {
    // Variabel filename menampung nilai dari nama berkas yang akan dituliskan. 
    // Nilainya diambil dari meta.filename yang dikombinasikan dengan timestamp. 
    // Kombinasi tersebut bertujuan untuk memberikan nama berkas yang unik. 
    // Sehingga penulisan berkas tidak akan menimpa berkas lain karena namanya selalu berbeda.
    const filename = +new Date() + meta.filename;
    // Di JavaScript kita bisa mendapatkan nilai timestamp dengan menggunakan expression +new Date().

    // Variabel path dibuat untuk menampung path atau alamat lengkap dari berkas yang akan dituliskan. 
    // Nilainya diambil dari basis folder yang digunakan (this._folder) dan nama berkas (filename).
    const path = `${this._folder}/${filename}`;
 
    // Terakhir, setelah kita memiliki nilai path, kita dapat membuat writable stream dari path tersebut menggunakan fungsi fs.createWriteStream.
    const fileStream = fs.createWriteStream(path);
 
    // Di dalam executor function Promise, kita menuliskan proses penulisan berkas menggunakan teknik stream. 
    // Jika proses penulisannya berhasil (end), 
    // maka Promise akan menghasilkan resolve yang membawa nama berkas (filename) sebagai nilai kembalian. 
    // Namun jika penulisan berkas terjadi error, Promise akan menghasilkan reject dengan membawa error yang dihasilkan.
    return new Promise((resolve, reject) => {
      fileStream.on('error', (error) => reject(error));
      file.pipe(fileStream);
      file.on('end', () => resolve(filename));
    });

  }

}

module.exports = StorageService;