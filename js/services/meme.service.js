'use strict'

/*GLOBAL VARS*/

const MEMES_STORAGE_KEY = 'memesGalleryDB'

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

function getCurrLine(){
    return  gMeme.lines[gMeme.selectedLineIdx]
}


//set line style: fint, fill, stroke
function setStyle(style){
    if (style.fill !== undefined) getCurrLine().fill = style.fill
    if (style.stroke !== undefined) getCurrLine().stroke = style.stroke
    if (style.fontFamily !== undefined) getCurrLine().fontFamily= style.fontFamily
}


//change font size:
function changeFontSize(d){
    getCurrLine().fontSize +=d*10
}

function addLine(value=0){
    gMeme.lines.push(_createline(value))
    console.log(gMeme)
}

//selectLine:
function switchLine(){
    gMeme.selectedLineIdx++
    if(gMeme.selectedLineIdx > gMeme.lines.length-1) gMeme.selectedLineIdx = 0
    return getCurrLine().txt
}


//changing position of line with up/down btns
function setlinestart(d){
    getCurrLine().posLine.y += d*10
}

function generateRandomMeme(){
    gMeme.selectedImgId = getRandomInt(1, 18)
    gMeme.lines=[]
    const lineCount = getRandomInt(1, 2)
    for (let i=0; i<lineCount; i++){
        gMeme.lines.push(_createRandomLine())
    } 
   
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

function toggleMoving(){
    gMove.isMove =!gMove.isMove
}



function lineClicked(clickedPos) {

    gMeme.lines.forEach((line, i) =>{
        var txtLength = mesureTxt(line.txt)
    
        var posX = line.posLine.x
        var posY =line.posLine.y
        
        if (clickedPos.x > posX-2 && clickedPos.x <  posX+txtLength &&  
            clickedPos.y > posY-40 &&  clickedPos.y < posY+8) {
            gMeme.selectedLineIdx = i
            gMove.isMove = true
            gMove.diffX= clickedPos.x - line.posLine.x
            gMove.diffY = clickedPos.y - line.posLine.y
        }
    })
    
}


function isMoving(){
    return gMove.isMove
}

function moveLine(pos){
    getCurrLine().posLine.x =  pos.x - gMove.diffX
    getCurrLine().posLine.y = pos.y - gMove.diffY
    
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

    if(gMeme && gMeme.lines.length) line.posLine.y = gMeme.lines.length*20 + 50
    if(value) line.txt = value
    return line
}

//rendom line on flexible
function _createRandomLine(){
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

    const newline = _createline()
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