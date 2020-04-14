import React, { Component } from 'react'
import Socialmedia from './Socialmedia'
// social media icons
import linkedin from '../../assets/img/linkedin.svg'
import facebook from '../../assets/img/facebook.svg'
import github from '../../assets/img/github.svg'
import instagram from '../../assets/img/instagram.svg'

class Footer extends Component {
   render() {
      const address = 'Birger Jarlsgatan 18, 2nd floor'
      const googleMapLink = 'https://goo.gl/maps/kD6ZC25mC8r'
      const postalnumber = '114 34'
      const postalzone = 'Stockholm'
      const currentYear = new Date().getFullYear()
      return (
         <footer>
            <div className="footer-inner">
               <div className="footer-inner__upper">
                  <div className="footer-address">
                     <div className="address">
                        <h6 className="address__title">ADDRESS</h6>
                        <a target="_blank" href={googleMapLink} rel="noopener noreferrer">
                           <p className="address__field">{`${address}`}</p>
                           <p className="address__field">{`${postalnumber} ${postalzone}`}</p>
                        </a>
                     </div>
                  </div>
                  <div className="footer-socialmedia">
                     <Socialmedia
                        slug="github"
                        link="https://github.com/glomodigital"
                        icon={github}
                     />
                     <Socialmedia
                        slug="linkedin"
                        link="https://www.linkedin.com/company/82130/"
                        icon={linkedin}
                     />
                     <Socialmedia
                        slug="facebook"
                        link="https://www.facebook.com/glomosthlm/"
                        icon={facebook}
                     />
                     <Socialmedia
                        slug="instagram"
                        link="https://www.instagram.com/glomo.se/"
                        icon={instagram}
                     />
                  </div>
               </div>
               <div className="footer-inner__lower">
                  <p className="copyright">
                     {`Copyright © ${currentYear} GLOMO AB is a part of Globalmouth Holding AB. All rights reserved`}
                  </p>
               </div>
            </div>
         </footer>
      )
   }
}
export default Footer
