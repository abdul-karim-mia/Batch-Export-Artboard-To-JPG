/**
 * @@@BUILDINFO@@@ Batch-Artboard-To-JPG-Script.jsx 1.0.0 Feb 17 2024 12:34:56 GMT+0000
 */
/*
<javascriptresource>
<about>$$$/JavaScripts/BatchArtboardToJPG/About=Batch Artboard To JPG - By Abdul Karim Mia.^r^rCopyright 2023 Abdul Karim Mia.^r^rStreamline the export of artboards from PSD files to high and low-quality JPG images.^r</about>
<category>Abdul's Scripts</category>
</javascriptresource>

Batch-Artboard-To-JPG-Script
This Adobe Photoshop script automates the export process of artboards from PSD files to high and low-quality JPG images.

Date: Feb 17 2024
Author: Abdul Karim Mia
Mail: akmia51@gmail.com
Website: [https://www.abdulkarimmia.com/]
GitHub: [https://github.com/abdul-karim-mia]

Release Notes:
- 1.0.0: Initial version
  - Streamlines the export of artboards to JPG images
  - User-friendly interface for input and output selection
  - Options for subfolders, suffixes, and customizable quality settings
  - Tested on Photoshop CS2 to Photoshop CC 2024

How to Use:
1. Open the script in Adobe Photoshop.
2. Select the input folder containing PSD files.
3. Choose the output folder for the exported JPG images.
4. Customize export settings, including subfolder options, suffixes, and quality.
5. Click "Export" to start the batch processing.

Note: Ensure that Adobe Photoshop is running before executing the script.

Feel free to contribute, report issues, or suggest enhancements! Happy exporting!

Donate (optional):
If you find this script helpful, you can support the author:
- via PayPal: [https://paypal.me/akmia51]

NOTICE:
This script is provided "as is" without warranty of any kind.
Free to use, not for sale.
Released under the GNU General Public License (GPL).
https://opensource.org/licenses/gpl-license

Check other scripts by the author:
[https://github.com/abdul-karim-mia]
*/

// THEUI
// =====
var theUi = new Window("dialog", undefined, undefined, {
    closeButton: false
});
theUi.text = "Batch Artboard To JPG";
theUi.orientation = "column";
theUi.alignChildren = ["center", "top"];
theUi.spacing = 10;
theUi.margins = 16;
var setFile = File(app.preferencesFolder + '/' + theUi.text + '.jsx');

// INPTS
// =====
var inpts = theUi.add("panel", undefined, undefined, {
    name: "inpts"
});
inpts.text = "Inputs";
inpts.orientation = "column";
inpts.alignChildren = ["left", "top"];
inpts.spacing = 10;
inpts.margins = 10;

// INPUTGROUP
// ==========
var inputGroup = inpts.add("group", undefined, {
    name: "inputGroup"
});
inputGroup.orientation = "column";
inputGroup.alignChildren = ["left", "center"];
inputGroup.spacing = 10;
inputGroup.margins = 0;

var text = inputGroup.add("statictext", undefined, undefined, {
    name: "text"
});
text.text = "Input Folder";

var imagePath = inputGroup.add('edittext {properties: {name: "imagePath"}}');
imagePath.helpTip = "Select Image Folder";
imagePath.text = "~";
imagePath.preferredSize.width = 500;

var brwsImage = inputGroup.add("button", undefined, undefined, {
    name: "brwsImage"
});
brwsImage.helpTip = "Select Image Folder";
brwsImage.text = "Browse";
brwsImage.alignment = ["right", "center"];
brwsImage.onClick = function() {
    var fol = Folder.selectDialog(brwsImage.helpTip, imagePath.text);
    if (fol != null) {
        imagePath.text = decodeURI(fol);
        saveSet()
    }
}
// INPUTGROUP1
// ===========
var inputGroup1 = inpts.add("group", undefined, {
    name: "inputGroup1"
});
inputGroup1.orientation = "column";
inputGroup1.alignChildren = ["left", "center"];
inputGroup1.spacing = 10;
inputGroup1.margins = 0;

var text1 = inputGroup1.add("statictext", undefined, undefined, {
    name: "text1"
});
text1.text = "Output Folder";

var savePath = inputGroup1.add('edittext {properties: {name: "savePath"}}');
savePath.helpTip = "Select Output Folder";
savePath.text = "~";
savePath.preferredSize.width = 500;

var brwsCSV = inputGroup1.add("button", undefined, undefined, {
    name: "brwsCSV"
});
brwsCSV.helpTip = "Select Output Folder";
brwsCSV.text = "Browse";
brwsCSV.alignment = ["right", "center"];
brwsCSV.onClick = function() {
    var fol = Folder.selectDialog(brwsCSV.helpTip, savePath.text);
    if (fol != null) {
        savePath.text = decodeURI(fol);
        saveSet()
    }
}
// NAMEOPG
// =======
var nameOPG = inpts.add("group", undefined, {
    name: "nameOPG"
});
nameOPG.orientation = "row";
nameOPG.alignChildren = ["center", "center"];
nameOPG.spacing = 10;
nameOPG.margins = 0;
nameOPG.alignment = ["center", "top"];

var subFol = nameOPG.add("checkbox", undefined, undefined, {
    name: "subFol"
});
subFol.text = "Sub Folder with File Name";
subFol.value = true;
subFol.onClick = saveSet;
var sufix = nameOPG.add("checkbox", undefined, undefined, {
    name: "sufix"
});
sufix.text = "Add PSD Name As Suffix";
sufix.onClick = saveSet;
// SAVETYPEG
// =========
var saveTypeG = inpts.add("group", undefined, {
    name: "saveTypeG"
});
saveTypeG.orientation = "row";
saveTypeG.alignChildren = ["left", "center"];
saveTypeG.spacing = 10;
saveTypeG.margins = 0;
saveTypeG.alignment = ["center", "top"];
var highJPG = saveTypeG.add("checkbox", undefined, undefined, {
    name: "highJPG"
});
highJPG.text = "High Qualiity JPG";
highJPG.value = true;
highJPG.onClick = saveSet;
var lowJPG = saveTypeG.add("checkbox", undefined, undefined, {
    name: "lowJPG"
});
lowJPG.text = "Low Quality JPG";
lowJPG.onClick = function() {
    lowG.enabled = lowJPG.value;
    saveSet();
}
// LOWG
// ====
var lowG = saveTypeG.add("group", undefined, {
    name: "lowG"
});
lowG.enabled = lowJPG.value;
lowG.orientation = "row";
lowG.alignChildren = ["left", "center"];
lowG.spacing = 10;
lowG.margins = 0;

var webQ = lowG.add('edittext {justify: "center", properties: {name: "webQ"}}');
webQ.text = "40";
webQ.min = 1;
webQ.max = 100;
webQ.onChange = function() {
    var qua = parseInt(this.text, 10);
    if (isNaN(qua)) {
        webQ.text = this.max;
    }
    if (qua > this.max) {
        this.text = this.max
    } else if (qua < this.min) {
        this.text = this.min
    }
    saveSet();
}
webQ.preferredSize.width = 50;

var docSizeT = lowG.add("statictext", undefined, undefined, {
    name: "docSizeT"
});
docSizeT.text = "Max W/H";

var docSize = lowG.add('edittext {justify: "center", properties: {name: "docSize"}}');
docSize.text = "1000";
docSize.preferredSize.width = 70;


// OPTIONSG
// ========
var optionsG = theUi.add("group", undefined, {
    name: "optionsG"
});
optionsG.orientation = "row";
optionsG.alignChildren = ["left", "center"];
optionsG.spacing = 10;
optionsG.margins = 0;

var ok = optionsG.add("button", undefined, undefined, {
    name: "ok"
});
ok.text = "Export";

var cancel = optionsG.add("button", undefined, undefined, {
    name: "cancel"
});
cancel.text = "Cancel";
if (setFile.exists) {
    $.evalFile(setFile)
}

ok.onClick = function() {
    var inputFolder = Folder(imagePath.text);
    var outputFolder = Folder(savePath.text);
    var qua = parseInt(webQ.text, 10);
    var maxSize = parseInt(docSize.text, 10);
    if (!inputFolder.exists) {
        alert(brwsImage.helpTip, theUi.text);
        return;
    }
    if (!outputFolder.exists) {
        alert(brwsCSV.helpTip, theUi.text);
        return;
    }
    var psds = inputFolder.getFiles(/\.(psd|psb|psdt)$/i);
    if (psds.length <= 0) {
        alert('Selected Folder Dont Any PSD Files\n' + brwsImage.helpTip, theUi.text);
        return;
    }
    var prog = new Window("palette");
    prog.text = "Exporting Progress";
    prog.preferredSize.width = 500;
    prog.orientation = "column";
    prog.alignChildren = ["center", "top"];
    prog.spacing = 10;
    prog.margins = 16;

    var psdT = prog.add("statictext", undefined, undefined, {
        name: "psdT"
    });
    psdT.text = 'Exporting Files From ' + psds[0].displayName;
    psdT.justify = "center";
    psdT.alignment = ["fill", "top"];
    var psdP = prog.add("progressbar", undefined, undefined, {
        name: "psdP"
    });
    psdP.maxvalue = psds.length;
    psdP.value = 0;
    psdP.preferredSize.height = 15;
    psdP.alignment = ["fill", "top"];

    var imgT = prog.add("statictext", undefined, undefined, {
        name: "imgT"
    });
    imgT.justify = "center";
    imgT.alignment = ["fill", "top"];
    var imgP = prog.add("progressbar", undefined, undefined, {
        name: "imgP"
    });
    imgP.maxvalue = 100;
    imgP.value = 0;
    imgP.preferredSize.height = 15;
    imgP.alignment = ["fill", "top"];
    theUi.close();
    try {
        prog.show();
        for (var p = 0; p < psds.length; p++) {
            psdP.value++;
            imgP.value = 0;
            psdT.text = 'Opening ' + psds[p].displayName;
            prog.update();
            var doc = app.open(psds[p]);
            var docName = doc.name;
            psdT.text = 'Exporting Files From ' + docName;
            var artbs = doc.layerSets;
            imgP.maxvalue = artbs.length;
            if (artbs.length <= 0) {
                doc.close(SaveOptions.DONOTSAVECHANGES);
                continue;
            }
            imgT.text = 'Creating Folders ';
            prog.update();
            if (subFol.value) {
                var newSaveFolder = Folder(outputFolder + '/' + docName.split('.').slice(0, -1).join('.'));
                if (!newSaveFolder.exists) newSaveFolder.create();
            } else {
                var newSaveFolder = outputFolder;
            }
            if (highJPG.value && lowJPG.value) {
                var highFolder = Folder(newSaveFolder + '/High Resolution');
                var lowFolder = Folder(newSaveFolder + '/Low Resolution');
                if (!highFolder.exists) highFolder.create();
                if (!lowFolder.exists) lowFolder.create();
            } else {
                var highFolder = Folder(newSaveFolder);
                var lowFolder = Folder(newSaveFolder);
            }
            for (var a = 0; a < artbs.length; a++) {
                imgP.value++;
                doc.activeLayer = artbs[a];
                var artName = doc.activeLayer.name;
                imgT.text = 'Exporting ' + artName;
                prog.update();
                if (isArtBoard()) {
                    dupLayer();
                    var newDoc = activeDocument;
                    var docWid = doc.width.as('px');
                    var docHei = doc.height.as('px');
                    var savFileName = artName;
                    if (sufix.value) {
                        savFileName += '_' + docName.split('.').slice(0, -1).join('.')
                    }
                    if (highJPG.value) {
                        imgT.text = 'Exporting High Quality JPG';
                        prog.update();
                        saveAsJPG(highFolder + '/' + savFileName);
                    }
                    if (lowJPG.value) {
                        if (!isNaN(maxSize)) {
                            imgT.text = 'Resizing For Low Quality JPG Max Size:- ' + maxSize;
                            prog.update();
                            if (docWid > docHei) {
                                newDoc.resizeImage(UnitValue(maxSize, 'px'), null, null, ResampleMethod.AUTOMATIC);
                            } else {
                                newDoc.resizeImage(null, UnitValue(maxSize, 'px'), null, ResampleMethod.AUTOMATIC);
                            }
                        }
                        imgT.text = 'Exporting Low Quality JPG';
                        prog.update();
                        saveForWebAsJpeg(lowFolder + '/' + savFileName, qua);
                    }
                    newDoc.close(SaveOptions.DONOTSAVECHANGES);
                }
            }
            doc.close(SaveOptions.DONOTSAVECHANGES);
        }
    } catch (x_x) {
        alert(x_x.message);
        while (app.documents.length) {
            app.documents[0].close(SaveOptions.DONOTSAVECHANGES);
        }
    } finally {
        prog.close();
    }
}


theUi.show();

function saveSet() {
    setFile.open('w');
    setFile.write('imagePath.text="' + imagePath.text + '";savePath.text="' + savePath.text + '";subFol.value=' + subFol.value + ';sufix.value=' + sufix.value + ';highJPG.value=' + highJPG.value + ';lowJPG.value=' + lowJPG.value + ';lowG.enabled=' + lowG.enabled + ';webQ.text=' + webQ.text + ';docSize.text="' + docSize.text + '";');
    setFile.close();
}

function dupLayer() {
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putClass(charIDToTypeID('Dcmn'));
    desc1.putReference(charIDToTypeID('null'), ref1);
    desc1.putString(charIDToTypeID('Nm  '), app.activeDocument.name);
    var ref2 = new ActionReference();
    ref2.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
    desc1.putReference(charIDToTypeID('Usng'), ref2);
    desc1.putInteger(charIDToTypeID('Vrsn'), 5);
    executeAction(charIDToTypeID('Mk  '), desc1, DialogModes.NO);
};

function isArtBoard() {
    var ref = new ActionReference();
    ref.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
    return executeActionGet(ref).getBoolean(stringIDToTypeID("artboardEnabled"));
}

function saveForWebAsJpeg(fileName, quality) {
    var saveOptions = new ExportOptionsSaveForWeb();
    saveOptions.format = SaveDocumentType.JPEG;
    saveOptions.quality = quality;
    var saveFile = new File(fileName + '.jpg');
    app.activeDocument.exportDocument(saveFile, ExportType.SAVEFORWEB, saveOptions);
}

function saveAsJPG(fullName) {
    var jpg_Opt = new JPEGSaveOptions();
    jpg_Opt.quality = 12;
    jpg_Opt.embedColorProfile = true;
    app.activeDocument.saveAs(File(fullName + '.jpg'), jpg_Opt, true);
}
