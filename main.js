const {error} = require("./lib/dialogs.js");
const {Text} = require("scenegraph");

function divideTexts(selection) {
  let countText = 0;
  for(let i=0; i < selection.items.length; i++) {
    if(selection.items[i] instanceof Text === true) {
      divideText(selection.items[i], selection);
      countText += 1;
      selection.items[i].removeFromParent();
    }
  }
  if(!countText) {
    alertSelectText();
  }
}

function divideText(node, selection) {

  const texts = node.text.split("\n");
  const height = node.localBounds.height/texts.length;
  const DimX = node.boundsInParent.x;
  const DimY = node.boundsInParent.y;
  const style = node.styleRanges;
  const area = node.areaBox;
  const align = node.textAlign;

  for(let i = 0; i < texts.length; i++) {
    let text = new Text();
    text.text = texts[i];
    text.styleRanges = style;
    text.textAlign = align;
    if(area){
      text.areaBox = { width: area.width, height: height };
    }
    selection.insertionParent.addChild(text);
    const resetX = text.boundsInParent.x;
    const resetY = text.boundsInParent.y;
    text.moveInParentCoordinates(DimX - resetX, DimY + height*i - resetY);
  }
}

function alertSelectText() {
  error("Ooops", "You need to select texts.");
}

module.exports = {
  commands: {
    myPluginCommand: divideTexts
  }
};
