const path = require('path');

module.exports = {
	target: 'node',
	mode: 'production',
	entry: './src/index.ts',
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
		globalObject: 'this',
		clean: true,
		library: {
			name: '{library-name}',
			type: 'umd'
		},
	},
};
