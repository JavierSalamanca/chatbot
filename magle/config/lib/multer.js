'use strict';

module.exports.contentPackageUploadFileFilter = function (req, file, cb) {
  console.log("READING TAR MIMETYPE");
  console.log(file.mimetype);
  if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/gif') {
    return cb(new Error('Only MAGLE package files are allowed!'), false);
  }
  cb(null, true);
};

module.exports.profileUploadFileFilter = function (req, file, cb) {
  if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/gif') {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

module.exports.badgeUploadFileFilter = function (req, file, cb) {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/gif') {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
