export const LINKEDIN_KEY = '1510890282282045'

export const loadLinkedinApi = () => {}

export const linkedinShare = url => {
   var title = 'Replace this with a title.'
   var text = 'Replace this with your share copy.'
   const shareUrl =
      'http://www.linkedin.com/shareArticle?mini=true&url=' +
      encodeURIComponent(url)

   const win = window.open(
      shareUrl,
      'ShareOnLinkedin',
      getWindowOptions('500', '350')
   )
   win.opener = null // 2
}
const getWindowOptions = function(w, h) {
   // const width = 500
   // const height = 350
   // const left = window.innerWidth / 2 - width / 2
   // const top = window.innerHeight / 2 - height / 2
   const wLeft = window.screenLeft ? window.screenLeft : window.screenX
   const wTop = window.screenTop ? window.screenTop : window.screenY

   const left = wLeft + window.innerWidth / 2 - w / 2
   var top = wTop + window.innerHeight / 2 - h / 2

   return [
      'resizable,scrollbars,status',
      'height=' + h,
      'width=' + w,
      'left=' + left,
      'top=' + top,
   ].join()
}
