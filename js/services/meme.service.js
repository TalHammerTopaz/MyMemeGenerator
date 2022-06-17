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




var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [    {
                posLine: {x:10, y:50} ,
                txt: 'meme line',
                align: 'left',
                fill: "#A3DBE6",
                stroke: "#2f4f4f",
                fontFamily:'Arial',
                fontSize: 40,
                }
        ]
}

var gMove = {
            isMove: false,
            diffX:0,
            diffY:0,
            }


var gMemesGallery =_loadMemesFromStoarge() ? _loadMemesFromStoarge() : []


function getMeme(){
    return gMeme
}



function getMemeGallery(){
    return gMemesGallery
}

function resetMeme(){
    return {
        selectedImgId: 5,
        selectedLineIdx: 0,
        lines: [_createline()]
        }
}

function setMeme(idx){
    gMeme = gMemesGallery[idx]
    console.log(gMeme)

}


function setStyle(style){
    console.log(style.fill)
    if (style.fill !== undefined) gMeme.lines[gMeme.selectedLineIdx].fill = style.fill
    if (style.stroke !== undefined) gMeme.lines[gMeme.selectedLineIdx].stroke = style.stroke
    if (style.fontFamily !== undefined) gMeme.lines[gMeme.selectedLineIdx].fontFamily= style.fontFamily
    console.log(gMeme)
}

function changeFontSize(d){
    gMeme.lines[gMeme.selectedLineIdx].fontSize +=d*10
}

function addLine(value= 'meme line'){
    gMeme.lines.push(_createline(value))
    console.log(gMeme)
}

function switchLine(){
    gMeme.selectedLineIdx++
    if(gMeme.selectedLineIdx > gMeme.lines.length-1) gMeme.selectedLineIdx = 0
    return gMeme.lines[gMeme.selectedLineIdx].txt
}

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
    console.log(gMeme)
   
}


function _createline(value){
   
    var lineStart = gMeme.lines.length? gCanvas.height-gMeme.lines.length*70: 50
    return {
        posLine: {x:10, y:lineStart},
        txt: value,
        align: 'left',
        fill: "#A3DBE6",
        stroke: "#2f4f4f",
        fontFamily:'Arial',
        fontSize: 40,
        }
}

function _createRandomLine(){
    var newline = _createline()
    newline.txt = memesSentences[getRandomInt(0, memesSentences.length-1)]
    newline.fill = getRandomColor()
    newline.stroke = getRandomColor()
    newline.fontSize = getRandomInt(20, 60)
    return newline

} 

function maxSize(txt){
    const maxSize =  (gCanvas.width / txt.length)*2
    return maxSize
}

function deleteline(){
    gMeme.lines.splice(gMeme.selectedLineIdx,1)
}

function saveMeme(url){
    console.log(gMemesGallery)
    gMeme.url = url
    gMemesGallery.push(gMeme)
    console.log( gMemesGallery)
    _saveMemesToStoarge(gMemesGallery)

}


function editMeme(url, idx){
    console.log(gMemesGallery)
    gMeme.url = url
    gMemesGallery[idx] = gMeme
    console.log( gMemesGallery)
    _saveMemesToStoarge(gMemesGallery)

}


function _saveMemesToStoarge(val){
    saveToStorage(MEMES_STORAGE_KEY, val)
}

function _loadMemesFromStoarge(){
    return loadFromStorage(MEMES_STORAGE_KEY)
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
    console.log('pos', pos)
    gMeme.lines[gMeme.selectedLineIdx].posLine.x =  pos.x - gMove.diffX
    gMeme.lines[gMeme.selectedLineIdx].posLine.y = pos.y - gMove.diffY
   
}