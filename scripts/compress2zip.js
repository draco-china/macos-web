// require modules
const fs = require('fs');
const archiver = require('archiver');
const path = require('path');

const root = path.resolve(__dirname, '..');
const fileDirectory = path.resolve(root, 'dist');
const zipFile = path.resolve(root, 'chromac-tabs.zip');

// create a file to stream archive data to.
const output = fs.createWriteStream(zipFile);
const archive = archiver('zip', {
  zlib: { level: 9 }, // Sets the compression level.
});

// listen for all archive data to be written
// 'close' event is fired only when a file descriptor is involved
output.on('close', function () {
  console.log(archive.pointer() + ' total bytes');
  console.log(
    'archiver has been finalized and the output file descriptor has closed.',
  );
  console.log(`
--------- ---------压缩完毕--------- ---------
生成文件大小 ${(archive.pointer() / 1024 / 1024).toFixed(1)}MB
请在当前项目路径下寻找 dist.zip 文件,系统路径为
${zipFile}
  `);
});

// This event is fired when the data source is drained no matter what was the data source.
// It is not part of this library but rather from the NodeJS Stream API.
// @see: https://nodejs.org/api/stream.html#stream_event_end
output.on('end', function () {
  console.log('Data has been drained');
});

// good practice to catch warnings (ie stat failures and other non-blocking errors)
archive.on('warning', function (err) {
  if (err.code === 'ENOENT') {
    // log warning
  } else {
    // throw error
    throw err;
  }
});

// good practice to catch this error explicitly
archive.on('error', function (err) {
  throw err;
});

// pipe archive data to the file
archive.pipe(output);

// append files from a sub-directory, putting its contents at the root of archive
archive.directory(fileDirectory + '/', false);

// finalize the archive (ie we are done appending files but streams have to finish yet)
// 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
archive.finalize();
