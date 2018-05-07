'use strict';
module.exports = function(grunt) {
  var config = {
    aws: grunt.file.readJSON("aws.json"),
  };
  grunt.loadNpmTasks('grunt-exec');
  var AWS = require("aws-sdk");
  var fs = require("fs");
  grunt.initConfig({
    config: config,
    exec: {
       s3push: {
         cmd: function(path, bucket, prefix, profile, region) {
           return 'aws s3 cp ' + path + ' s3://' + bucket + '/' + prefix + ' --recursive --profile ' + profile + ' --region ' + region;
         }
       },

     }
});
  grunt.registerTask('publish',[
    'exec:s3push:' + 'src/' + ':' + config.aws.WebsiteBucket + '::' + config.aws.cliProfile + ':' + config.aws.region
  ])
}
