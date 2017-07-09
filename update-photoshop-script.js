const fs = require('fs');
const fileName = 'eCommerce assets export.jsx';

fs.readdir('/Applications', (err, folders) => {
	folders
	.filter(folder => folder.startsWith('Adobe Photoshop'))
	.map(item => {
		let filePath = `/Applications/${item}/Presets/Scripts/${fileName}`;
		fs.unlink(filePath, (err) => {
			if(err && err.code !== 'ENOENT') throw err;
			fs.createReadStream(fileName).pipe(fs.createWriteStream(filePath));
		})
	});
});