var http = require('http')
var cheerio = require('cheerio')
var url = 'http://www.imooc.com/learn/348'

function filterChapters(html) {
    let $ = cheerio.load(html)
    let chapters = $('.chapter')
    let courseData = []
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
        courseData.push(chapterData);
    })
    return courseData
}

function printCoursData(courseData) {
    courseData.forEach(item => {
        let chapterTitle = item.chapterTitle
        console.log(chapterTitle + '\n')

        item.videos.forEach(video => {
            console.log('[' +video.id+ ']' +video.title.replace(/(^\s*)|(\s*$)/g, '').split('  ')[0])
        })
    })
}

http.get(url, res => {
    let html = ''
    res.on('data', data=>{
        html += data
    })

    res.on('end', ()=>{
        let courseData = filterChapters(html)
        printCoursData(courseData)
    })
}).on('error', ()=>{
    console.log('获取课程数据出错！');
})
