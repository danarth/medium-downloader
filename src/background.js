/* global Blob, chrome, fetch, FormData */
import parse from 'medium-parser'
import slugify from 'slugify'

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  let articleName
  switch (request.action) {
    case 'DOWNLOAD_PDF':
      parse(request.html).then(post => {
        articleName = slugify(post.title, {lower: true})
        const blob = new Blob([post.markdown], {type: 'application/octet-stream'})
        const formData = new FormData()
        formData.append('file', blob, 'markdown.md')
        return fetch('http://www.markdowntopdf.com/app/upload', {
          method: 'post',
          body: formData
        })
      })
        .then(response => response.json())
        .then(json => {
          const url = 'http://www.markdowntopdf.com/app/download/' + json.foldername + '/' + json.urlfilename
          chrome.downloads.download({
            url,
            filename: (articleName || 'medium-article') + '.pdf'
          })
          sendResponse({message: 'Blob received!'})
        })
      break
    default:
      sendResponse({message: 'Didn\'t understand the request'})
      break
  }
  return true
})
