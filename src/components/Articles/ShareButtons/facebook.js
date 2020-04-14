export const FACEBOOK_KEY = '1510890282282045'

export const loadFbApi = () => {
   window.fbAsyncInit = function() {
      window.FB.init({
         appId: FACEBOOK_KEY,
         cookie: true,
         xfbml: true,
         version: 'v2.11',
      })
   }

   // Load the SDK asynchronously
   ;(function(d, s, id) {
      var js,
         fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) return
      js = d.createElement(s)
      js.id = id
      js.src = '//connect.facebook.net/en_US/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
   })(document, 'script', 'facebook-jssdk')
}
export const facebookShare = url => {
   console.log('test')
   window.FB.ui(
      {
         method: 'share',
         href: url,
      },
      function(response) {}
   )
}
