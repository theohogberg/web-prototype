export const TWITTER_KEY = '1510890282282045'

export const loadTwitterApi = () => {
   window.twttr = (function(d, s, id) {
      var js,
         fjs = d.getElementsByTagName(s)[0],
         t = window.twttr || {}
      if (d.getElementById(id)) return t
      js = d.createElement(s)
      js.id = id
      js.src = 'https://platform.twitter.com/widgets.js'
      fjs.parentNode.insertBefore(js, fjs)

      t._e = []
      t.ready = function(f) {
         t._e.push(f)
      }

      return t
   })(document, 'script', 'twitter-wjs')
}
export const twitterShare = url => {
   const text = encodeURIComponent('')
   const shareUrl =
      'https://twitter.com/intent/tweet?url=' + url + '&text=' + text

   const win = window.open(
      shareUrl,
      'ShareOnTwitter',
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
