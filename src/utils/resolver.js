const { Resolver } = require('@parcel/plugin');
const { expandTildeImport } = require('tilde-imports');

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
