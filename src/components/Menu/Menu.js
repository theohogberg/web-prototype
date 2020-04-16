import React, { Component } from 'react'
import { Link } from 'gatsby'
import Hamburger from './Hamburger'

class Menu extends Component {
   constructor(props) {
      super(props)
      this.state = {
         open: null,
         links: [
            { to: '/', name: 'home' },
            { to: '/about', name: 'about' },
            { to: '/clients', name: 'clients' },
            { to: '/latest', name: 'latest' },
            { to: '/career', name: 'career' },
            { to: '/contact', name: 'contact' },
         ]
      }
   }

   freeze = e => {
         if (
            !document
            .getElementsByClassName('menu-container')[0]
            .contains(e.target)
            ) {
            e.preventDefault()
      }
   }

   disableScroll = () => {
         document.body.style.overflow = 'hidden' // Or toggle using class: document.body.className += "overflow-hidden-class";

         // Only accept touchmove from menu-container
         document.addEventListener('touchmove', this.freeze, false)

         // Prevent background scrolling
         document
         .getElementsByClassName('menu-container')[0]
         .addEventListener('touchmove', function(e) {
            var top = this.scrollTop
            var totalScroll = this.scrollHeight
            var currentScroll = top + this.offsetHeight

            if (top === 0 && currentScroll === totalScroll) {
               e.preventDefault()
            } else if (top === 0) {
               this.scrollTop = 1
            } else if (currentScroll === totalScroll) {
               this.scrollTop = top - 1
            }
         })
   }

   enableScroll = () => {
      document.removeEventListener('touchmove', this.freeze)
      document.body.style.overflow = ''
   }

   close = () => {
      this.setState({ open: false })
      this.enableScroll()
   }

   toggleOpen = () => {
      if (!this.state.open) {
         this.setState({ open: true })
         this.disableScroll()
      } else {
         this.setState({ open: false })
         this.enableScroll()
      }
   }

   render() {
      const navClassName = this.state.open
      ? 'navigation-link active'
      : 'navigation-link'

      return (
         <header className="header">
            <Hamburger open={this.state.open} toggle={this.toggleOpen} />
            <div className={`menu-container ${this.state.open ? 'open' : ''}`}>
               <div className="menu-container__top">
                  <div className="menu-lang" />
               </div>
               <div className="menu-container__middle">
               <nav className="navigation">
               {this.state.links.map((link, index) => {
                  //const delay = `${index} * 0.12ms`
                  return (
                     <div className={navClassName} key={index}>
                        <Link onClick={this.close} path={link.to}>
                           {link.name.toUpperCase()}
                        </Link>
                     </div>
                  )
               })}
               </nav>
               </div>
            </div>
         </header>
      )
   }
}
export default Menu
