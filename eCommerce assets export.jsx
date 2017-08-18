 // Set Units to Pixel
app.preferences.rulerUnits = Units.PIXELS;
var doc = activeDocument;

// Create Folders
var exportDir = new Folder('~/Documents/export');
var highDir = new Folder(exportDir + '/high/');
var lowDir = new Folder(exportDir + '/low/');
var psdDir = new Folder(exportDir + '/psd/');

if(!exportDir.exists) exportDir.create();
if(!highDir.exists) highDir.create();
if(!lowDir.exists) lowDir.create();
if(!psdDir.exists) psdDir.create();

// Save JPG
function saveJPG() {
    // JPG Setting
    var jpgOpts = new JPEGSaveOptions();
    jpgOpts.quality = 12;
    jpgOpts.embedProfileColor= false;
    jpgOpts.matte = MatteType.NONE;

    // Save High 
    var HighFile = new File(highDir + '/' + doc.name.replace('.psd', '') + ".jpg")
    doc.saveAs(HighFile, jpgOpts, true, Extension.LOWERCASE); 

    // Resize
    var orientation = (doc.width > doc.height) ? 'landscape' : 'portrait';
    if(orientation === 'landscape') {
        doc.resizeImage(UnitValue(1700,"px"),null,72,ResampleMethod.BICUBIC);
    } else {
        doc.resizeImage(UnitValue(800,"px"),null,72,ResampleMethod.BICUBIC);
    }

    // Save Low
    var lowFile = new File(lowDir + '/' + doc.name.replace('.psd', '') + ".jpg")
    doc.saveAs(lowFile, jpgOpts, true, Extension.LOWERCASE); 
}

// Flatten PSD
function flatImageAndSave() {
    doc.flatten();
    var psdSaveOpts = new PhotoshopSaveOptions();
    psdSaveOpts.embedProfileColor = true;
    var filePSD = new File(psdDir + '/' +doc.name);
    doc.saveAs(filePSD, psdSaveOpts, true, Extension.LOWERCASE)
}

flatImageAndSave(doc)
saveJPG();