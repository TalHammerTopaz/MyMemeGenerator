'use strict'

/*GLOBAL VARS*/

const MEMES_STORAGE_KEY = 'memesGalleryDB'

const memesSentences = [
    'I never eat falafel',
    'DOMS DOMS EVERYWHERE',
    'Stop Using i in for loops',
    'Armed in knowledge',
    'Js error "Unexpected String"',
    'One does not simply write js',
    'I`m a simple man i see vanilla JS, i click like!',
    'JS, HTML,CSS?? Even my momma can do that',
    'May the force be with you',
    'I know JS',
    'JS Where everything is made up and the rules dont matter',
    'Not sure if im good at programming or good at googling',
    'But if we could',
    'JS what is this?',
    'Write hello world , add to cv 7 years experienced',
  ]




var gMeme = createMeme()


var gMove = {
            isMove: false,
            diffX:0,
            diffY:0,
            }


var gMemesGallery =_loadMemesFromStoarge() ? _loadMemesFromStoarge() : []


/////////////////////////////////////////

function getMeme(){
    return gMeme
}



function getMemeGallery(){
    return gMemesGallery
}

function createMeme(){
    return {
        selectedImgId: 5,
        selectedLineIdx: 0,
        lines: [_createline()]
        }
}

//set meme to edit:
function setMeme(idx){
    gMeme = gMemesGallery[idx]
}

//set line style: fint, fill, stroke
function setStyle(style){
    if (style.fill !== undefined) gMeme.lines[gMeme.selectedLineIdx].fill = style.fill
    if (style.stroke !== undefined) gMeme.lines[gMeme.selectedLineIdx].stroke = style.stroke
    if (style.fontFamily !== undefined) gMeme.lines[gMeme.selectedLineIdx].fontFamily= style.fontFamily
}

//change font size:
function changeFontSize(d){
    gMeme.lines[gMeme.selectedLineIdx].fontSize +=d*10
}

function addLine(value=0){
    gMeme.lines.push(_createline(value))
    console.log(gMeme)
}

//selectLine:
function switchLine(){
    gMeme.selectedLineIdx++
    if(gMeme.selectedLineIdx > gMeme.lines.length-1) gMeme.selectedLineIdx = 0
    return gMeme.lines[gMeme.selectedLineIdx].txt
}


//changing position of line with up/down btns
function setlinestart(d){
    gMeme.lines[gMeme.selectedLineIdx].posLine.y += d*10
}

function generateRandomMeme(){
    gMeme.selectedImgId = getRandomInt(1, 18)
    gMeme.lines=[]
    var lineCount = getRandomInt(1, 2)
    for (let i=0; i<lineCount; i++){
        gMeme.lines.push(_createRandomLine())
    } 
   
}

//calculate max size for txt
function maxSize(txt){
    const maxSize =  (gCanvas.width / txt.length)*2
    return maxSize
}

//delete line from gMeme
function deleteline(){
    gMeme.lines.splice(gMeme.selectedLineIdx,1)
}


//save meme to meme-gallery
function saveMeme(url){
    gMeme.url = url
    gMemesGallery.push(gMeme)
    _saveMemesToStoarge(gMemesGallery)
    
}

//edit saved meme
function editMeme(url, idx){
    gMeme.url = url
    gMemesGallery[idx] = gMeme
    _saveMemesToStoarge(gMemesGallery)
    
}


function lineClicked(clickedPos) {
    if(gMove.isMove) {
        gMove.isMove =!gMove.isMove
        return
    }
    
    for (let i=0; i<gMeme.lines.length; i++){  
        var posX = gMeme.lines[i].posLine.x
        var posY = gMeme.lines[i].posLine.y
        console.log('posX, posY', posX, posY)
        console.log('clickedPos', clickedPos)
        console.log( posX, gCanvas.width-8, posY-32,  posY+8 )
        if (clickedPos.x > posX-2 && clickedPos.x <  posX+420 &&  
            clickedPos.y > posY-40 &&  clickedPos.y < posY+8) 
            { console.log('yes')
            gMeme.selectedLineIdx = i
            gMove.isMove = true
            gMove.diffX= clickedPos.x - gMeme.lines[i].posLine.x
            gMove.diffY = clickedPos.y - gMeme.lines[i].posLine.y
        }
        
    }
    
}


function isMoving(){
    return gMove.isMove
}

function moveLine(pos){
    gMeme.lines[gMeme.selectedLineIdx].posLine.x =  pos.x - gMove.diffX
    gMeme.lines[gMeme.selectedLineIdx].posLine.y = pos.y - gMove.diffY
    
}


// create meme line
function _createline(value=''){
   
    var line = {
        posLine: {x:10, y:50},
        txt: 'Say something',
        align: 'left',
        fill: "#A3DBE6",
        stroke: "#2f4f4f",
        fontFamily:'Arial',
        fontSize: 40,
    }

    if(value) line.txt = value
    if(gMeme && gMeme.lines.length) line.posLine.y = gCanvas.height-gMeme.lines.length*70 
    return line
}

//rendom line on flexible
function _createRandomLine(){
    var newline = _createline()
    newline.txt = memesSentences[getRandomInt(0, memesSentences.length-1)]
    newline.fill = getRandomColor()
    newline.stroke = getRandomColor()
    newline.fontSize = getRandomInt(20, 60)
    return newline

} 

//save to storage
function _saveMemesToStoarge(val){
    saveToStorage(MEMES_STORAGE_KEY, val)
}

//load from storage
function _loadMemesFromStoarge(){
    return loadFromStorage(MEMES_STORAGE_KEY)
}