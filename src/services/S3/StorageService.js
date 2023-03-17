const AWS = require('aws-sdk');
 
class StorageService {

  constructor() {
    this._S3 = new AWS.S3();
  }
 

  // fungsi ini cukup mendefinisikan objek parameter yang berisi nama Bucket yang digunakan, 
  // nama berkas, MIME type (Content-Type), dan berkas dalam bentuk Buffer yang akan disimpan pada bucket S3
  writeFile(file, meta) {

    const parameter = {
      Bucket: process.env.AWS_BUCKET_NAME, // Nama S3 Bucket yang digunakan
      Key: +new Date() + meta.filename, // Nama berkas yang akan disimpan
      Body: file._data, // Berkas (dalam bentuk Buffer) yang akan disimpan
      ContentType: meta.headers['content-type'], // MIME Type berkas yang akan disimpan
    };

    return new Promise((resolve, reject) => {

      this._S3.upload(parameter, (error, data) => {

        if (error) {

          return reject(error);

        }

        return resolve(data.Location);

      });

    });

  }

}

module.exports = StorageService;