import React, { Component } from 'react'
import { Carousel } from 'glomo-boxes'
import controller from '../../utils/scrollmagic.js'
import * as ScrollMagic from 'scrollmagic'
import { ShowcaseTileGroup, resize } from 'glomo-boxes'
import tile_one from '../../assets/img/tiles/tile_one.jpg'
import tile_two from '../../assets/img/tiles/tile_two.jpg'
import tile_three from '../../assets/img/tiles/tile_three.jpg'
import tile_four from '../../assets/img/tiles/tile_four.jpg'

const BREAKPOINT = 769

export default class ShowcaseTilesWrapper extends Component {
   _isMounted = false
   constructor(props) {
      super(props)
      this.state = {
         isDesktop: !(window.innerWidth < BREAKPOINT),
         windowWidth: window.innerWidth,
      }
      this.scene = null
   }
   componentDidMount() {
      document.addEventListener('resize', this.resize)
      if (!this.state.isDesktop) {
         ;[
            ...document.getElementsByClassName('showcase-tile-inner-content'),
         ].map((element, index, array) => {
            new ScrollMagic.Scene({
               triggerElement: element,
               offset: -100,
               duration: 300,
               reverse: true,
            })
               .setClassToggle(element, 'showcase-tile-inner-content--active')
               .addTo(controller) // assign the scene to the controller
         })
      }
   }
   componentDidUpdate() {}

   componentWillUnmount() {
      document.removeEventListener('resize', this.resize)
   }

   resize = () => {
      if (window.innerWidth >= BREAKPOINT) {
         this.setState({ isDesktop: true, windowWidth: window.innerWidth })
      } else if (window.innerWidth < BREAKPOINT) {
         this.setState({ isDesktop: false, windowWidth: window.innerWidth })
      }
   }
   render() {
      return (
         <div className="showcase-tiles-wrapper">
            <ShowcaseTileGroup
               tileColor="#181818"
               fullWidthShowcase="https://d2humkxjjbigvl.cloudfront.net/AdobeStock_170396411_1.mp4"
               video={true}
               loadingNode={
                  <svg id="load" x="0px" y="0px" viewBox="0 0 150 150">
                     <circle id="loading-inner" cx="75" cy="75" r="60" />
                  </svg>
               }
               tileItems={[
                  {
                     tileColor: '#181818',
                     contentColor: '#fff',
                     title: 'Insight & Strategy',
                     subTitle: '01',
                     excerpt:
                        'From an introductory paragraph to the final product, Glomo provides you with strategic guidance to help you meeting your business goals!',
                     image: tile_one,
                  },
                  {
                     tileColor: '#181818',
                     contentColor: '#fff',
                     title: 'Design & Prototyping',
                     subTitle: '02',
                     excerpt:
                        'Design led innovation and usable prototypes is part of our service to ensure your product has more than just a good looking design.',
                     image: tile_two,
                  },
                  {
                     tileColor: '#181818',
                     contentColor: '#fff',
                     title: 'Development & Quality Assurance',
                     subTitle: '03',
                     excerpt:
                        'Some say it`s the toughest of all, we love the challenge! Whether you need one resource or a whole team, our genius developers, testers and project managers work with the latest technologies, tools and frameworks.',
                     image: tile_three,
                  },
                  {
                     tileColor: '#181818',
                     contentColor: '#fff',
                     title: 'Hosting & Support',
                     subTitle: '04',
                     excerpt:
                        'Our work doesn`t stop once your site goes live so we provide the updates and enhancements you need to keep growing.',
                     image: tile_four,
                  },
               ]}
            />
         </div>
      )
   }
}
