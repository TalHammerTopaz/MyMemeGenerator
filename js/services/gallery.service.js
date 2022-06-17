'use strict'

var gKeywordSearchCountMap = {'funny': 13,'cat': 6, 'baby': 19, 'bad': 5, 'cute':12, 
                            'animal': 8, 'president': 7,
                            'movie': 9, 'dog': 13,  }

var gImgs = [
                {id: 1, url: 'img/1.jpg', keywords: ['bad', 'akward', 'man', 'president'], ratio:1 },
                {id: 2, url: 'img/2.jpg', keywords: ['cute', 'dog', 'animal'], ratio: 417/627},
                {id: 3, url: 'img/3.jpg', keywords: ['cute', 'baby', 'animal', 'dog'],ratio:1},
                {id: 4, url: 'img/4.jpg', keywords: ['cute', 'cat', 'animal'], ratio:1},
                {id: 5, url: 'img/5.jpg', keywords: ['funny', 'baby', 'success', 'happy'], ratio: 417/627},
                {id: 6, url: 'img/6.jpg', keywords: ['funny', 'akward', 'man'], ratio:1},
                {id: 7, url: 'img/7.jpg', keywords: ['funny', 'baby','cute', 'happy'], ratio:1},
                {id: 8, url: 'img/8.jpg', keywords: ['funny', 'akward', 'man', 'movie'], ratio:1},
                {id: 9, url: 'img/9.jpg', keywords: ['funny', 'baby','cute', 'happy'], ratio:416/629 },
                {id: 10, url: 'img/10.jpg', keywords: ['happy', 'man', 'president'], ratio:1},
                {id: 11, url: 'img/11.jpg', keywords: ['akward', 'man', 'sport', 'funny'],ratio:1},  
                {id: 12, url: 'img/12.jpg', keywords: ['akward', 'man', 'interacting'], ratio:1},   
                {id: 13, url: 'img/13.jpg', keywords: ['happy', 'man', 'interacting', 'movie'], ratio:1},   
                {id: 14, url: 'img/14.jpg', keywords: ['man', 'bad', 'movie'], ratio:1},   
                {id: 15, url: 'img/15.jpg', keywords: ['bad', 'man', 'movie', 'interacting'], ratio:393/666},   
                {id: 16, url: 'img/16.jpg', keywords: ['funny', 'man', 'movie'], ratio:1},   
                {id: 17, url: 'img/17.jpg', keywords: ['bad', 'akward', 'man', 'president'], ratio:1},   
                {id: 18, url: 'img/18.jpg', keywords: [ 'cute', 'funny'], ratio:1},              
            
            ]

var gFilter

function setFilter(value){
    value = value.toLowerCase()
    gFilter = value
    if(gKeywordSearchCountMap[value]) updateCoutMap(value)
    console.log(gKeywordSearchCountMap)
    return gFilter
}

function getImagesToRender(){
    if(!gFilter) return gImgs
    var imgs = gImgs.filter ( img => img.keywords.includes(gFilter))
    console.log(imgs)
    return imgs
}


function getSearchWordsMap(){
    return gKeywordSearchCountMap
}

function updateCoutMap(key){
    key = key.toLowerCase()
    gKeywordSearchCountMap[key]++
}

function getRatio(id){
    console.log(id, 'id')
    const img = gImgs.find(img => img.id === id)
    console.log('img', img)
    console.log('img.ratio', img.ratio)
    return img.ratio
}