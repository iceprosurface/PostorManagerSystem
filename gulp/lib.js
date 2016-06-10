// gulp/config.js
var src = './src';
var dest = './dest';
var lib = './dest/lib';

module.exports = {
		path: lib + '/',
		//
		angular: {
			patten: 
			[
				{
					name: 'angular',
					path: 
						[
							'./bower_components/angular/angular.js',
							'./bower_components/angular/angular.min.js'
						],
					dest: lib + '/anguar/'
				}
			],
			dependences: []
		},
		angularRoute: {
			patten: 
			[
				{
					name: 'route',
					path: 
						[
							'./bower_components/angular-route/angular-route.min.js',
							'./bower_components/angular-route/angular-route.js'
						],

					dest: lib + '/anguar/'
				}
			],
			dependences: ['angular']
		},
		angularAnimate: {
			patten: 
			[
				{	
					name: 'animate',
					path: 
						[
							'./bower_components/angular-animate/angular-animate.min.js',
							'./bower_components/angular-animate/angular-animate.js'
							],
					dest: lib + '/anguar/'
				}
			],
			dependences: ['angular']

		},
		angularResource: {
			patten: 
			[
				{
					name: 'resource',
					path: 
						[
							'./bower_components/angular-resource/angular-resource.min.js',
							'./bower_components/angular-resource/angular-resource.js'
						],
					dest: lib + '/anguar/'
				}
			],
			dependences: ['angular']
		},
		//
		bootstrap: {
			patten: 
			[
				{
					name: 'js', 
					path: 
					[
						'./bower_components/bootstrap/dist/js/*',
						'!./bower_components/bootstrap/dist/js/npm.js'
					],
					dest: lib + '/bootstrap/js'
				},
				{
					name: 'css', 
					path: './bower_components/bootstrap/dist/css/*',
					dest: lib + '/bootstrap/css'
				},
				{
					name: 'fonts',
					path: './bower_components/bootstrap/dist/fonts/*',
					dest: lib + '/bootstrap/fonts'
				}
			],
			dependences: []
		},

		//
		flatui: {
			patten: 
			[
				{
					name: 'js', 
					path: 
						[
							'./bower_components/flatui/js/*',
							'!./bower_components/flatui/js/jquery*.js',
							'!./bower_components/flatui/js/bootstrap*.js'
						],
					dest: lib + '/flatui/js'
				},
				{
					name: 'css', 
					path: './bower_components/flatui/css/*',
					dest: lib + '/flatui/css'
				},
				{
					name: 'fonts',
					path: './bower_components/flatui/fonts/*',
					dest: lib + '/flatui/fonts'
				}
			],
			dependences: ['bootstrap']
		},

		//
		jquery: {
			patten: 
			[
				{
					name: 'jquery',
					path: './bower_components/jquery/dist/jquery.min.js',
					dest: lib + '/jquery/'
				}
			],
			dependences: []
		},

		//
		requirejs: {
			patten: 
			[
				{
					name: 'requirejs',
					path: './bower_components/requirejs/requirejs.js',
					dest: lib + '/requirejs'
				}
			],
			dependences: []
		}
	}