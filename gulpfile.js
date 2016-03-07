var path = require('path');
var gulp = require('gulp');
var less = require('gulp-less');
var webserver = require('gulp-server-livereload');
var fileinclude = require('gulp-file-include');
var cmq = require('gulp-combine-media-queries');
var replace = require('gulp-replace');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var useref = require('gulp-useref');
var imagemin = require('gulp-imagemin');
var del = require('del');
var wiredep = require('wiredep').stream;
var inject = require('gulp-inject');
var watch = require('gulp-watch');
var merge = require('merge-stream');
var awspublish = require('gulp-awspublish');
//var awsCredentials = require('./aws-credentials.json');
var babel = require('gulp-babel');
var es2015 = require('babel-preset-es2015');
var ngAnnotate = require('gulp-ng-annotate');
var sourcemaps = require('gulp-sourcemaps');
var templateCache = require('gulp-angular-templatecache');
var concat = require('gulp-concat');
var mainBowerFiles = require('main-bower-files');
var debug = require('gulp-debug');
var rename = require("gulp-rename");
var _ = require('lodash');
var awsCredentials;

// get aws-credentials.json, but don't barf if it's not there.
try {
  awsCredentials = require('./aws-credentials.json');
}
catch (e) {

}

function getBowerFiles(extension) {
    var files = mainBowerFiles();

    return _.chain(files)
      .map(function(file) {
        return file.replace(__dirname + '/', '');
      })
      .filter(function(file) {
        return (_.endsWith(file, extension))
      })
      .value();
}


var filepath = {
  src: 'src',
  tmp: './.tmp',
  dist: 'dist',
  js: 'src/{app,common}/**/!(*.spec|*.mock).js',
  html: 'src/{app,common}/**/*.html',
  appjs: 'src/app/app.js',
  less: 'src/{app,common}/**/*.less',
  appless: 'src/app/app.less',
  manifest: 'dist/rev-manifest.json'
};

gulp.task('explore', function() {
  var files = mainBowerFiles();

  files = _.chain(files)
    .map(function(file) {
      return file.replace(__dirname + '/', '');
    })
    .filter(function(file) {
      return (!_.endsWith(file, 'css'))
    })
    .value();

  return gulp.src(files)
    .pipe(debug({title: 'explore:'}))
})

gulp.task('build:js', function() {
  var babels = gulp.src(filepath.js)
    .pipe(babel({
      presets: [es2015]
    }));

  var templates = gulp.src(filepath.html)
    .pipe(minifyHtml({
      empty: true,
      conditionals: true,
      quotes: true
    }))
    .pipe(templateCache());

  return merge(babels, templates)
    .pipe(concat('app/app.min.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest(filepath.dist))
    .pipe(rev.manifest(filepath.manifest, {
        base: process.cwd() + '/' + filepath.dist,
        merge: true
    }))
    .pipe(gulp.dest(filepath.dist));
});

gulp.task('build:bower:js', function() {
  return gulp.src(getBowerFiles('js'))
    .pipe(concat('app/vendor.min.js'))
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest(filepath.dist))
    .pipe(rev.manifest(filepath.manifest, {
        base: process.cwd() + '/' + filepath.dist,
        merge: true
    }))
    .pipe(gulp.dest(filepath.dist));
});

gulp.task('build:bower:css', function() {
  return gulp.src(getBowerFiles('css'))
    .pipe(concat('app/vendor.min.css'))
    .pipe(minifyCss())
    .pipe(rev())
    .pipe(gulp.dest(filepath.dist))
    .pipe(rev.manifest(filepath.manifest, {
        base: process.cwd() + '/' + filepath.dist,
        merge: true
    }))
    .pipe(gulp.dest(filepath.dist));
});

// Uglifies merged CSS files.
// Updates file names based on md5 hash.
gulp.task('build:css', function(){
  var manifest = gulp.src(filepath.manifest);

  return gulp.src(filepath.tmp + '/app/*.css', {base: filepath.tmp})
    .pipe(rename("app/app.min.css"))
    .pipe(revReplace({manifest: manifest}))
    .pipe(minifyCss())
    .pipe(rev())
    .pipe(gulp.dest(filepath.dist))
    .pipe(rev.manifest(filepath.manifest, {
        base: process.cwd() + '/' + filepath.dist,
        merge: true
    }))
    .pipe(gulp.dest(filepath.dist));
});

// Copies and minifies images to dist.
// Updates file names to reflect md5 hash.
gulp.task('build:images', function() {
  return gulp.src('src/assets/images/**', { base: 'src' })
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest(filepath.dist))
    .pipe(rev.manifest(filepath.manifest, {
        base: process.cwd() + '/dist',
        merge: true
    }))
    .pipe(gulp.dest(filepath.dist));
});

// Updates asset references to rev'd names.
// Minifies html.
gulp.task('build:html', function() {
  var manifest = gulp.src(filepath.manifest);

  return gulp.src(filepath.src + '/index.html')
    .pipe(useref({ noAssets: true }))
    .pipe(revReplace({manifest: manifest}))
    .pipe(minifyHtml({
      empty: true,
      conditionals: true,
      quotes: true
    }))
    .pipe(gulp.dest(filepath.dist));
});

// Deletes dist folder - meant to be run before build.
gulp.task('build:clean', function () {
  return del([
    './dist'
  ]);
});

// Injects app and common script references into index.html
gulp.task('inject:js', function() {
  var jsFiles = gulp.src([
    filepath.js,
    '!src/app/app.js'
  ], { read: false });

  var options = {
    starttag: '<!-- injector:js -->',
    endtag: '<!-- endinjector -->',
    removeTags: false,
    transform: function (filepath) {
      filepath = filepath.replace('/src/', '');
      return '<script src="' + filepath + '"></script>';
    }
  };

  return gulp.src(filepath.src + '/index.html')
    .pipe(inject(jsFiles, options))
    .pipe(gulp.dest(filepath.src));
});

// Injects bower script references into index.html
gulp.task('inject:bower', function () {
  return gulp.src(filepath.src + '/index.html')
    .pipe(wiredep({
      // we are importing this stuff in client/styles/app.less
      exclude: ['bootstrap/dist', 'font-awesome/css'],
      ignorePath: /^(\.\.\/)*\.\./
     }))
    .pipe(gulp.dest(filepath.src));
});

// Injects src/app/ and src/common/ less imports into app.less
gulp.task('inject:less', function() {
  var lessFiles = gulp.src([
    filepath.less,
    '!' + filepath.appless
  ], { read: false })

  var options = {
    starttag: '/* inject:less */',
    endtag: '/* endinject */',
    removeTags: false,
    transform: function (filepath) {
      filepath = filepath.replace('/src/', '');
      return '@import "' + filepath + '";';
    }
  };

  return gulp.src(filepath.appless)
    .pipe(inject(lessFiles, options))
    .pipe(gulp.dest(filepath.src + '/app'));
});

// Compiles ES2015 code using babel, and also ng-annotate
gulp.task('compile:js', function() {
  return gulp.src(filepath.js, {since: gulp.lastRun('compile:js')})
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: [es2015]
    }))
    .pipe(ngAnnotate())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(filepath.tmp));
});

// Compiles less code into app.css
gulp.task('compile:less', function () {
  return gulp.src(filepath.appless)
    .pipe(less({ paths: [
      path.join(__dirname, 'src/'),
    ]}))
    .pipe(cmq())
    .pipe(gulp.dest(filepath.tmp + '/app'));
});

// Serves up the app locally in dev mode.
gulp.task('serve:dev', function() {
  return gulp.src([filepath.tmp, filepath.src])
    .pipe(webserver({
      livereload: true,
      open: true,
      fallback: 'index.html',
      log: 'debug'
    }));
});

// Serves up the build (for testing purposes)
gulp.task('serve:build', function() {
  return gulp.src(filepath.dist)
    .pipe(webserver({
      livereload: false,
      open: true,
      fallback: 'index.html',
      log: 'debug'
    }));
});

// Watches Less files and compiles on change or injects on new
gulp.task('watch:less', function () {
  var compile = gulp.series('compile:less');
  var inject = gulp.series('inject:less');
  return watch(filepath.less, function(vinyl) {
    if (vinyl.event === 'change') {
      compile();
    } else {
      inject();
    }
  });
});

// Watches JS files and compiles on change or injects on new
gulp.task('watch:js', function () {
  var inject = gulp.series('inject:js');
  var compile = gulp.series('compile:js');
  return watch(filepath.js, function(vinyl) {
    if (vinyl.event === 'change') {
      compile();
    } else {
      inject();
    }
  });
});

// Deletes tmp and dist folders - Ready for a fresh build
gulp.task('clean', function () {
  return del([
    filepath.tmp,
    filepath.dist
  ]);
});

// Deploys application to AWS S3
gulp.task('deploy', function() {
  if (!awsCredentials) {
    console.log("Aws-credentials.json is missing. You will be unable to publish. " +
      "To publish, create a file in the project root called aws-credentials.json. Example:");
    console.log('{\n' +
      '  "params": {\n' +
      '    "Bucket": "the-bucket-name-goes-here"\n' +
      '  },\n' +
      '  "accessKeyId": "your-aws-access-key-id",\n' +
      '  "secretAccessKey": "your-aws-secret-access-key"\n' +
    '}');
    return;
  }

  var plain = gulp.src('dist/assets/**/*', { base: 'dist' });
  var gzip = gulp.src(['dist/**/*', '!dist/assets/images/**/*'])
    .pipe(awspublish.gzip());

  var publisher = awspublish.create(awsCredentials);

  return merge(gzip, plain)
    .pipe(publisher.publish({
      'Cache-Control': 'max-age=315360000, no-transform, public'
    }))
    .pipe(publisher.sync())
    .pipe(publisher.cache())
    .pipe(awspublish.reporter());
});

// Main watch task
gulp.task('watch', gulp.parallel('watch:less', 'watch:js'));

// Main inject task
gulp.task('inject', gulp.parallel(gulp.series('inject:bower', 'inject:js'), 'inject:less'));

// Main compile task
gulp.task('compile', gulp.parallel('compile:js', 'compile:less'));

// Main build task
gulp.task('build', gulp.series(
    'clean',
    gulp.series(
      gulp.parallel('build:bower:js', 'build:bower:css', 'build:js', 'build:images'),
      'inject:less',
      'compile:less',
      'build:css',
      'build:html'
    )
));

// Default task - runs application in dev mode
gulp.task('default', gulp.series(
  'inject',
  'compile',
  gulp.parallel(
    'serve:dev',
    'watch'
  )
));
