import React, { Component } from 'react'

class PreFooter extends Component {
   renderLinkLetters = (str, stagger) => {
      let letter = []
      for (var i = 1; i < str.length + 1; i++) {
         letter.push(
            <span
               style={stagger ? { transitionDelay: `${0.08 * (i + 1)}s` } : {}}
               key={`${str}-${i}`}
            >
               {str.substring(i - 1, i)}
            </span>
         )
      }
      return letter
   }
   removeStagger = e => {
      const link = e.currentTarget
      const htmlCollection = link.getElementsByTagName('span')
      const letters = Array.prototype.slice.call(htmlCollection)
      setTimeout(() => {
         letters.forEach(letter => {
            letter.style.transitionDelay = '0s'
         })
      }, 900)
   }
   addStagger = e => {
      const link = e.currentTarget
      const htmlCollection = link.getElementsByTagName('span')
      const letters = Array.prototype.slice.call(htmlCollection)
      setTimeout(() => {
         letters.map((letter, i) => {
            letter.style.transitionDelay = `${0.08 * (i + 1)}s`
         })
      }, 100)
   }
   render() {
      let line1 = 'Change nothing and nothing changes'
      let line2 = 'GET IN TOUCH'
      let linkText = 'HELLO@GLOMO.SE'
      let link = 'mailto:hello@glomo.se'

      return (
         <div className="pre-footer">
            <div className="pre-footer__background">
               <div className="pre-footer__inner">
                  {line1 && <p className="line1">{line1}</p>}
                  {line2 && <p className="line2">{line2}</p>}
                  {link && (
                     <div className="blend">
                        <p className="link">
                           <a href={link}>{this.renderLinkLetters(linkText)}</a>
                        </p>
                        <p
                           className="link-animation"
                           id="animation-link"
                           onMouseLeave={e => this.addStagger(e)}
                           onMouseEnter={e => this.removeStagger(e)}
                        >
                           <a href={link}>
                              {this.renderLinkLetters(linkText, true)}
                           </a>
                        </p>
                     </div>
                  )}
               </div>
            </div>
         </div>
      )
   }
}
export default PreFooter
