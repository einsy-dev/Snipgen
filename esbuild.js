const { exec } = require("child_process");
const esbuild = require("esbuild");

const production = process.argv.includes('--production');
const watch = process.argv.includes('--watch');
const fs = require('fs');

/**
 * @type {import('esbuild').Plugin}
 */
const esbuildProblemMatcherPlugin = {
	name: 'esbuild-problem-matcher',

	setup(build) {
		build.onStart(() => {
			console.log('[watch] build started');
		});
		build.onEnd((result) => {
			result.errors.forEach(({ text, location }) => {
				console.error(`✘ [ERROR] ${text}`);
				console.error(`    ${location.file}:${location.line}:${location.column}:`);
			});
			console.log('[watch] build finished');
		});
	},
};

async function main() {
	const ctx = await esbuild.context({
		entryPoints: [
			'src/extension.ts'
		],
		bundle: true,
		format: 'cjs',
		minify: production,
		sourcemap: !production,
		sourcesContent: false,
		platform: 'node',
		outfile: 'dist/extension.js',
		external: ['vscode', 'detype'],
		logLevel: 'silent',
		plugins: [
			/* add to the end of plugins array */
			esbuildProblemMatcherPlugin,
		],
	});
	if (watch) {
		await ctx.watch();
	} else {
		await ctx.rebuild();
		await ctx.dispose();
	}

	const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
	delete packageJson.scripts;
	delete packageJson.devDependencies;
	packageJson.main = 'extension.js';
	fs.writeFileSync('dist/package.json', JSON.stringify(packageJson, null, 2));

	fs.cpSync('LICENSE', 'dist/LICENSE', { recursive: true });
	fs.cpSync('README.md', 'dist/README.md', { recursive: true });
	fs.cpSync('CHANGELOG.md', 'dist/CHANGELOG.md', { recursive: true });
	fs.cpSync('icon.png', 'dist/icon.png', { recursive: true });
	fs.cpSync('.vscodeignore', 'dist/.vscodeignore', { recursive: true });

	exec('npm i', { cwd: 'dist' }, handleConsole);
	exec('vsce package', { cwd: 'dist' }, handleConsole);
	if (production) {
		exec('vsce publish', { cwd: 'dist' }, handleConsole);
	}
}

main().catch(e => {
	console.error(e);
	process.exit(1);
});


function handleConsole(err, stdout, stderr) {
	if (err) {
		console.error(err);
	}
	if (stderr) {
		console.error(stderr);
	}
	console.log(stdout);
}