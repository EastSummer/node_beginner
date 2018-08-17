var http = require('http')
// var Promise = require('Promise')
var cheerio = require('cheerio')
var baseUrl = 'http://www.imooc.com/learn/'
var videoIds = [348, 259, 197, 134, 75]

function filterChapters(html) {
    let $ = cheerio.load(html)
    let chapters = $('.chapter')
    let title = $('#main .path span').text()
    let courseData = {
        title: title,
        videos: []
    }
    chapters.each((index,element) => {
        let chapter = $(element)
        let chapterTitle = chapter.find('h3').text()
        let videos = chapter.find('.video').children('li')
        let chapterData = {
            chapterTitle: chapterTitle,
            videos: []
        }
        videos.each((index,element) => {
            let video = $(element).find('a')
            let videoTitle = video.text()
            let id = video.attr('href').split('video/')[1]
            chapterData.videos.push({
                title: videoTitle,
                id: id
            })
        })
        courseData.videos.push(chapterData);
    })
    return courseData
}

function printCoursData(cousesData) {
    cousesData.forEach(courseData => {
        console.log('### ' +courseData.title+ '\n')

        courseData.videos.forEach(item => {
            console.log(item.chapterTitle + '\n')

            item.videos.forEach(video => {
                console.log('[' +video.id+ ']' +video.title.replace(/(^\s*)|(\s*$)/g, '').split('  ')[0])
            })
        })

    })
}

function getPageAsync(url) {
    return new Promise((resolve, reject) => {
        console.log('正在爬取' + url);
        
        http.get(url, res => {
            let html = ''
            res.on('data', data=>{
                html += data
            })
        
            res.on('end', ()=>{
                resolve(html)
            })
        }).on('error', (e)=>{
            reject(e)
            console.log('获取课程数据出错！');
        })
    })
}

var fetchCourseArray = []

videoIds.forEach(id => {
    fetchCourseArray.push( getPageAsync(baseUrl + id) )    
})

Promise.all(fetchCourseArray)
    .then(pages => {
        let cousesData = []
        pages.forEach(html => {
            let couses = filterChapters(html)
            cousesData.push(couses)
        })
        printCoursData(cousesData)
    })

