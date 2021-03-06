module.exports = gruntConfig;

function gruntConfig(grunt) {
  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    jsPath: 'assets/javascripts',
    componentsPath: 'assets/components',
    cssPath: 'assets/stylesheets',
    htmlPath: 'assets/templates',
    imagePath: 'assets/images',
    pubJsPath: 'public/javascripts',
    pubCssPath: 'public/stylesheets',
    pubImagePath: 'public/images',

    concat: require('./grunt/concat'),
    watch: require('./grunt/watch'),
    copy: require('./grunt/copy'),
    sass: require('./grunt/sass'),
    ngtemplates: require('./grunt/ngtemplates'),
    uglify: require('./grunt/uglify'),
    bgShell: require('./grunt/bgShell'),
    karma: require('./grunt/karma'),
    mochaTest: require('./grunt/mocha_test')
  });

  for (var task in pkg.devDependencies) {
    if (task !== 'grunt' && !task.indexOf('grunt')) {
      grunt.loadNpmTasks(task);
    }
  }

  grunt.registerTask('build:dev', [
    'concat:components',
    'ngtemplates:my_procur',
    'ngtemplates:registration',
    'concat:my_procur',
    'concat:registration',
    'concat:main',
    'sass:my_procur_dev',
    'sass:main_dev',
    'sass:auth_dev',
    'sass:registration_dev',
    'copy:assets',
    'copy:moxie'
  ]);
  grunt.registerTask('build:dist', [
    'build:dev',
    'uglify:dist',
    'sass:my_procur_dist',
    'sass:main_dist',
    'sass:auth_dist',
    'sass:registration_dist'
  ]);
  grunt.registerTask('server', ['bgShell:server']);
  grunt.registerTask('passenger', ['bgShell:passenger']);
  grunt.registerTask('protractor', ['bgShell:protractor']);
  grunt.registerTask('test:dev', [
    'build:dev',
    'karma:dev',
    'protractor',
    'mochaTest:dev'
  ]);
  grunt.registerTask('test:node', [
    'mochaTest:dev'
  ]);
  grunt.registerTask('default', [
    'build:dist',
    'server'
  ]);
}