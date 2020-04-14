import React, { Component } from 'react'

import { Carousel } from 'glomo-boxes'
import SectionHeader from '../Headers'

export default class Testimonial extends Component {
   render() {
      const testimonials = [
         {
            message:
               '"I can really recommend GLOMO. Not only do they develop to high standards, they interpret business requirements into sensible functional requirements and make proactive useful suggestions. They deliver on time and within budget. Last but not least they are a bunch of nice people to work with."',
            name: 'Luc Van Aken',
            company: 'Napoleon Games',
         },
         {
            message:
               '"GLOMO has gathered knowledge from all over the world to create a dynamic and creative environment for both employees and customers. I felt included from the very first moment and I felt my project was something we created together"',
            name: 'Gisela Nylund',
            company: 'Skanska',
         },
         {
            message:
               '"They really wanted us to succeed as they came back with user experience improvements even though this wasn’t within the scope of the project”',
            name: 'Johan Larsson',
            company: 'PFO',
         },
      ]

      /**
       * TODO
       * Add autoPlay but it's broken currently after entire iteration
       */
      // Removed autoPlay from Carousel element because of bug error
      return (
         <div className="testimonial-wrapper">
            <article>
               <section className="testimonial-inner">
                  <SectionHeader
                     className="testimonial-header"
                     header="Testimonials"
                  />
                  <Carousel
                     height={'auto'}
                     showArrows={false}
                     stopOnHover
                     cssEase={'cubic-bezier(0.215, 0.610, 0.355, 1.000)'}
                     intervalDuration={10000}
                  >
                     {testimonials.map((item, index) => (
                        <div className="testimonial" key={index}>
                           <div className="testimonial-blockquote">
                              <span className="quote">{item.message}</span>
                              <h6>{item.name}</h6>
                              <h6>{item.company}</h6>
                           </div>
                        </div>
                     ))}
                  </Carousel>
               </section>
            </article>
         </div>
      )
   }
}
