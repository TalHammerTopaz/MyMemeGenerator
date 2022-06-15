'use strict'

/*GLOBAL VARS*/



var gKeywordSearchCountMap = {'funny': 12,'cat': 16, 'baby': 2}

var gImgs = [{id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat']}]

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [    {
                txt: 'I sometimes eat Falafel',
                size: 20,
                align: 'left',
                color: 'red'
                }
        ]
}


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



function getMeme(){
    return gMeme
}


function addLine(){
    gMeme.lines.push(_createline())
    console.log(gMeme)
}

function switchLine(){
    gMeme.selectedLineIdx++
    if(gMeme.selectedLineIdx > gMeme.lines.length-1) gMeme.selectedLineIdx = 0
    console.log(gMeme.selectedLineIdx)
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


function _createline(){
    return {
        txt: 'New Line',
        size: 20,
        align: 'left',
        color: 'red'
        }
}

function _createRandomLine(){
    return {
        txt: memesSentences[getRandomInt(0, memesSentences.length-1)],
        size: getRandomInt(10, 50),
        color: getRandomColor(), 
    }
} 