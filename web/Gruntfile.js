// Generated on 2014-06-27 using generator-durandal 0.1.4
'use strict';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt); // Load grunt tasks automatically
    require('time-grunt')(grunt); // Time how long tasks take. Can help when optimizing build times

    var options = {
        dev: grunt.option('dev')
    };

    // Define the configuration for all the tasks
    grunt.initConfig({
        // Configurable paths
        paths: {
            app: 'app',
            css: 'css',
            js: 'js',
            assets: 'assets',
            build: '.build',
            temp: '.temp',
            test: 'test/spec'
        },

        // Build durandal application into a single file
        durandal: {
            dist: {
                src: [
                    'app/**/*.*',
                    'bower_components/durandal/js/**/*.*'
                ]
            },
            options: {
                name: '../bower_components/durandal-almond/almond',
                baseUrl: '<%= paths.app %>/',
                mainPath: '<%= paths.app %>/main.js',
                out: '<%= paths.build %>/<%= paths.js %>/app.js',

                paths: {
                    'text': '../bower_components/requirejs-text/text',
                    'durandal': '../bower_components/durandal/js',
                    'plugins': '../bower_components/durandal/js/plugins',
                    'transitions': '../bower_components/durandal/js/transitions',
                    'knockout': '../bower_components/knockout.js/knockout',
                    'jquery': '../bower_components/jquery/jquery',
                    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap',
                    'modernizr': '../bower_components/modernizr/modernizr',
                },

                shim: {
                    bootstrap: {
                            deps: ['jquery'],
                            exports: 'jQuery'
                    },
                    modernizr: {
                            exports: 'Modernizr'
                    }
                },

                uglify2: {
                    compress: {
                        global_defs: {
                            DEBUG: true
                        }
                    },
                }
            }
        },

        // Build less files into css ones
        less: {
            release: {
                options: {
                    paths: ['bower_components/bootstrap/less/'],
                    cleancss: true
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= paths.css %>/',
                        src: '*.less',
                        dest: '<%= paths.build %>/<%= paths.css %>/',
                        ext: '.css'
                    },
                     {
                        src: 'bower_components/bootstrap/less/bootstrap.less',
                        dest: '<%= paths.temp %>/<%= paths.css %>/bootstrap.css'
                    }, 
                     {
                        src: 'bower_components/font-awesome/less/font-awesome.less',
                        dest: '<%= paths.temp %>/<%= paths.css %>/font-awesome.css'
                    } 
                ]
            },
            watch: {
                options: {
                    paths: ['bower_components/bootstrap/less/'],
                    sourceMap: true
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= paths.css %>/',
                        src: '*.less',
                        dest: '<%= paths.temp %>/<%= paths.css %>/',
                        ext: '.css'
                    },
                    {
                        src: 'bower_components/bootstrap/less/bootstrap.less',
                        dest: '<%= paths.temp %>/<%= paths.css %>/bootstrap.css'
                    },
                    {
                        src: 'bower_components/font-awesome/less/font-awesome.less',
                        dest: '<%= paths.temp %>/<%= paths.css %>/font-awesome.css'
                    }
                ]
            }
        },

        // Build HTML File by transforming every development source to production ones
        htmlbuild: {
            release: {
                src: 'index.html',
                dest: '<%= paths.build %>/',
                options: {
                    scripts: {
                        libs: '<%= paths.build %>/<%= paths.js %>/libs.js',
                        app: '<%= paths.build %>/<%= paths.js %>/app.js'
                    },
                    styles: {
                        libs: '<%= paths.build %>/<%= paths.css %>/libs.css',
                        app: '<%= paths.build %>/<%= paths.css %>/app.css'
                    }
                }
            }
        },

        // Concatenate files to reduce requests count
        concat: {
            scripts: {
                src: [
                    'bower_components/json2/json2.js'
                ],
                dest: '<%= paths.build %>/<%= paths.js %>/libs.js'
            },
            styles: {
                src: [
                    '<%= paths.temp %>/<%= paths.css %>/bootstrap.css',
                    '<%= paths.temp %>/<%= paths.css %>/font-awesome.css',
                    
                    
                    'bower_components/durandal/css/durandal.css'
                ],
                dest: '<%= paths.build %>/<%= paths.css %>/libs.css'
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            watch: {
                files: [
                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap/dist/',
                        src: 'fonts/*.*',
                        dest: '<%= paths.temp %>/'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/font-awesome/',
                        src: 'fonts/*.*',
                        dest: '<%= paths.temp %>/'
                    }
                ]
            },
            release: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        dest: '<%= paths.build %>',
                        src: [
                            '*.{ico,png,txt,appcache,manifest}',
                            '.htaccess',
                            '<%= paths.assets %>/**/*.*',
                            '!<%= paths.assets %>/**/*.{gif,jpeg,jpg,png,svg}'
                        ]
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap/dist/',
                        src: 'fonts/*.*',
                        dest: '<%= paths.build %>'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/font-awesome/',
                        src: 'fonts/*.*',
                        dest: '<%= paths.build %>/'
                    }
                ]
            },
            styles: {
                expand: true,
                dot: true,
                cwd: '<%= paths.css %>/',
                dest: '<%= paths.temp %>/<%= paths.css %>/',
                src: '*.css'
            }
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            release: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.build %>/<%= paths.css %>/',
                    src: '*.css',
                    dest: '<%= paths.build %>/<%= paths.css %>/'
                }]
            },
            watch: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.temp %>/<%= paths.css %>/',
                    src: '*.css',
                    dest: '<%= paths.temp %>/<%= paths.css %>/'
                }]
            }
        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            release: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.assets %>/',
                    src: '**/*.{gif,jpeg,jpg,png}',
                    dest: '<%= paths.build %>/<%= paths.assets %>/'
                }]
            }
        },
        svgmin: {
            release: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.assets %>/',
                    src: '*.svg',
                    dest: '<%= paths.build %>/<%= paths.assets %>/'
                }]
            }
        },
        htmlmin: {
            release: {
                options: {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: true,
                        removeAttributeQuotes: true,
                        removeCommentsFromCDATA: true,
                        removeEmptyAttributes: true,
                        removeOptionalTags: true,
                        removeRedundantAttributes: true,
                        useShortDoctype: true
                },
                files: [{
                    src: '<%= paths.build %>/index.html',
                    dest: '<%= paths.build %>/index.html'
                }]
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= paths.app %>/**/*.js',
                '<%= paths.test %>/spec/*.js'
            ]
        },

        // Test your code with jasmine
        mocha: {
            test: ["<%= paths.test %>/index.html"]
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            js: {
                files: ['<%= paths.app %>/**/*.js'],
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            test: {
                files: ['<%= paths.test %>/spec/*.js'],
                tasks: ['connect:test', 'jasmine']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },

            less: {
                files: [
                    '<%= paths.css %>/*.less',
                    'bower_components/bootstrap/less/*.less',
                    'bower_components/font-awesome/font-awesome.less',
                ],
                tasks: ['less:watch', 'autoprefixer:watch']
            },

            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= paths.app %>/**/*.*',
                    '<%= paths.temp %>/<%= paths.css %>/*.css',
                    '<%= paths.assets %>/**/*.{gif,jpeg,jpg,png,svg,webp}'
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                hostname: 'localhost' // Change this to '0.0.0.0' to access the server from outside
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '<%= paths.temp %>/',
                        './'
                    ]
                }
            },
            test: {
                options: {
                    port: 9001,
                    base: [
                        '<%= paths.temp %>/',
                        '<%= paths.test %>/',
                        './'
                        ]
                }
            },
            release: {
                options: {
                    open: true,
                    base: '<%= paths.build %>',
                    livereload: false
                }
            }
        },

        // Empties folders to start fresh
        clean: {
            release: {
                files: [{
                    dot: true,
                    src: [
                        '<%= paths.temp %>/',
                        '<%= paths.build %>/*',
                        '!<%= paths.build %>/.git*'
                    ]
                }]
            },

            server: '<%= paths.temp %>/'
        },

        // Run some tasks in parallel to speed up build process
        concurrent: {
            server: [
                'less:watch',
                
                'copy:watch'
            ],
            release: [
                'durandal',
                'less:release',
                
                'copy:release',
                'imagemin',
                'svgmin'
            ]
        }
    });

    grunt.registerTask('test', ['clean:server', 'copy:styles', 'autoprefixer:watch', 'connect:test', 'mocha']);
    grunt.registerTask('build', ['clean:release', 'concurrent:release', 'concat', 'autoprefixer:release', 'htmlbuild', 'htmlmin']);
    grunt.registerTask('default', ['newer:jshint', 'test', 'build']);

    grunt.registerTask('serve', ['clean:server', 'concurrent:server', 'autoprefixer:watch', 'connect:livereload', 'watch']);
    grunt.registerTask('serve-build', ['build', 'connect:release:keepalive']);
};