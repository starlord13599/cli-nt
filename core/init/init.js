const { createFiles, createFolders } = require('./src/folderAndFile');
const { installPackages } = require('./src/packages');
const { updateConfig, initConfig, initMigrations, initModel, initSeeders } = require('./src/sequelizeConfig');
const { propmtQuestions } = require('./src/question');

//asyncly runs all the functions
async function main(configs, folders, files, nodeModules) {
	try {
		await createFolders(folders);
		await createFiles(files);
		await installPackages(nodeModules);
		await initConfig();
		await initMigrations();
		await initSeeders();
		await initModel();
		await updateConfig(configs);
		return true;
	} catch (error) {
		throw new Error(error);
	}
}

//clizard init
async function init() {
	const folders = require('../../data/folders.json');
	const files = require('../../data/files.json');
	const nodeModules = [ 'sequelize', 'express', 'ejs', 'express-ejs-layouts' ];

	configs = await propmtQuestions();
	return await main(configs, folders, files, nodeModules);
}

module.exports = { init };