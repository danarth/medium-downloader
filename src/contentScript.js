/* global chrome */
const getUIButton = () =>
  '<button class="button button--large button--dark button--chromeless is-touchIconFadeInPulse u-baseColor--buttonDark button--withIcon button--withSvgIcon" title="Download this story as a PDF" aria-label="Download this story as a PDF">' +
        '<span class="button-defaultState">' +
        '<span class="svgIcon svgIcon--29px">' +
        '<svg class="svgIcon-use" width="29" height="29" viewBox="0 0 29 29">' +
        '<g transform="matrix(0.0443619,0,0,0.0443619,4.048336,4.048336)">' +
        '<path d="m 457.7,230.15 c -7.5,0 -13.5,6 -13.5,13.5 v 122.8 c 0,33.4 -27.2,60.5 -60.5,60.5 h -296.2 c -33.4,0 -60.5,-27.2 -60.5,-60.5 v -124.8 c 0,-7.5 -6,-13.5 -13.5,-13.5 -7.5,0 -13.5,6 -13.5,13.5 v 124.8 c 0,48.3 39.3,87.5 87.5,87.5 h 296.2 c 48.3,0 87.5,-39.3 87.5,-87.5 v -122.8 c 0,-7.4 -6,-13.5 -13.5,-13.5 z" />' +
        '<path d="m 226.1,346.75 c 2.6,2.6 6.1,4 9.5,4 3.4,0 6.9,-1.3 9.5,-4 l 85.8,-85.8 c 5.3,-5.3 5.3,-13.8 0,-19.1 -5.3,-5.3 -13.8,-5.3 -19.1,0 l -62.7,62.8 v -273.9 c 0,-7.5 -6,-13.5 -13.5,-13.5 -7.5,0 -13.5,6 -13.5,13.5 v 273.9 l -62.8,-62.8 c -5.3,-5.3 -13.8,-5.3 -19.1,0 -5.3,5.3 -5.3,13.8 0,19.1 z" />' +
        '</g>' +
        '</svg>' +
        '</span>' +
        '</span>' +
        '</button>'

const getDownloadButton = () => {
  const tempContainer = document.createElement('div')
  tempContainer.innerHTML = getUIButton()
  const button = tempContainer.firstChild

  button.addEventListener('click', () => {
    chrome.runtime.sendMessage({
      action: 'DOWNLOAD_PDF',
      html: document.documentElement.innerHTML
    }, (response) => { })
  })

  return button
}

const isArticle = () =>
  document.querySelectorAll('aside.js-postLeftSidebar').length > 0 &&
        document.querySelectorAll('div.postActionsBar').length > 0

const injectDownloadButtons = () => {
  const sidebar = document.querySelectorAll('aside.js-postLeftSidebar > div > ul')[0]
  const actionsBar = document.querySelectorAll('div.postActionsBar div.postActions > div > div > div > div')[0]

  const sidebarListItem = document.createElement('li')
  sidebarListItem.className = 'u-textAlignCenter u-marginVertical10'
  sidebarListItem.appendChild(getDownloadButton())
  sidebar.appendChild(sidebarListItem)

  actionsBar.appendChild(getDownloadButton())
}

const start = () => {
  if (isArticle()) {
    injectDownloadButtons()
  }
}

start()
