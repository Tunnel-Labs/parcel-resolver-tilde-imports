const { Resolver } = require('@parcel/plugin');
const { createTildeImportExpander } = require('tilde-imports');
const { getMonorepoDirpath } = require('get-monorepo-root');

const expandTildeImport = createTildeImportExpander({
	monorepoDirpath: getMonorepoDirpath(__dirname)
});

module.exports = new Resolver({
	resolve({ specifier, dependency }) {
		if (!specifier.startsWith('~')) {
			return null;
		}

		if (!dependency.resolveFrom) {
			return null;
		}

		const expandedTildeImport = expandTildeImport({
			importSpecifier: specifier,
			importerFilePath: dependency.resolveFrom
		});

		return {
			filePath: expandedTildeImport
		};
	}
});
