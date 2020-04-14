import React, { Component } from 'react'

import { ShowcaseReel } from 'glomo-boxes'
import SectionHeader from '../Headers'

import triple8 from 'assets/img/cases/Triple8.jpg'
import bingolotto from 'assets/img/cases/Bingolotto.jpg'
import skanska from 'assets/img/logos/Skanska.jpg'
import crowdcraft from 'assets/img/cases/Crowdcraft.jpg'
import datumlotteriet from 'assets/img/cases/Datumlotteriet.jpg'
import instantBetting from 'assets/img/cases/InstantBetting.jpg'
import kambi from 'assets/img/cases/Kambi.jpg'
import agria from 'assets/img/cases/Agria.jpg'
import telia from 'assets/img/cases/Telia.jpg'

export default class Showcase extends Component {
   render() {
      return (
         <div>
            <article>
               <section>
                  <SectionHeader color="#000" header="our work" />
               </section>
               <section
                  style={{ gridColumn: '1 / span 12', overflow: 'hidden' }}
               >
                  <ShowcaseReel
                     reelItems={[
                        {
                           imagePath: skanska,
                           title: 'Skanska',
                           excerpt:
                              'A platform providing a digitalised end to end process for interior design selection, purchase and installation.',
                        },
                        {
                           imagePath: kambi,
                           title: 'Kambi',
                           excerpt:
                              'Sports betting widgets and a development toolkit reducing production time and lowering costs.',
                        },
                        {
                           imagePath: crowdcraft,
                           title: 'Hultafors Group',
                           excerpt:
                              'MyCrowdCraft.com, an online community and interactive tool to increase discussion and interaction.',
                        },
                        {
                           imagePath: instantBetting,
                           title: 'Instant Betting',
                           excerpt:
                              'A prototype of a mobile app gamifying sports betting to drive player engagement.',
                        },
                        {
                           imagePath: agria,
                           title: 'Agria',
                           excerpt:
                              'A digital self-service solution allowing users to buy pet insurance and generating leads.',
                        },
                        {
                           imagePath: triple8,
                           title: '888sports',
                           excerpt:
                              'Sports betting widgets to increase player engagement and drive client acquisition.',
                        },
                        {
                           imagePath: datumlotteriet,
                           title: 'Kombispel',
                           excerpt:
                              'Web and mobile e-commerce solution for lottery tickets.',
                        },
                        {
                           imagePath: telia,
                           title: 'Telia Company ',
                           excerpt: `An internal news app for Telia's employees increasing accessibility of information across the business.`,
                        },
                        {
                           imagePath: bingolotto,
                           title: 'Bingolotto',
                           excerpt:
                              'Bingolotto in a web app. A collection of digital bingo, lottery and scratch card games.',
                        },
                     ]}
                  />
               </section>
            </article>
         </div>
      )
   }
}
