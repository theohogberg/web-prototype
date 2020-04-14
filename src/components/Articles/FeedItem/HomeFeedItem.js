import React, { Component } from 'react'
import PropTypes from 'prop-types'
import formatDate from '../../../util/FormatDate'
import Media from 'components/Media'

class HomeFeedItem extends Component {
   state = {
      isFetching: false,
      fetchMediaSuccess: false,
      fetchAuthorSuccess: false,
      fetchCategorySuccess: false,
      fetchFail: false,
      mediaData: [],
      authorData: [],
      categoryData: [],
   }

   async fetchData(url) {
      this.setState({ isFetching: true })
      const res = await fetch(url)
      const body = await res.json()

      if (res.status !== 200) {
         throw new Error(body.message)
      }

      if (Array.isArray(body)) {
         if (body.length < 1) {
            throw new Error('No posts with that slug')
         }
      }

      return body
   }

   parseMarkupToHtml = markup => ({
      __html: markup,
   })

   render() {
      const {
         link,
         image,
         title,
         minuteRead,
         date,
         authorName,
      } = this.props

      return (
         <div className="blog-feed-item">
            <div className={`blog-feed-item`} />

            <div className={`blog-feed-item__wrapper`}>
               <a href={link}>
                  <Media
                     lazy
                     className="image-wrapper"
                     image={image}
                  />

                  <div className="text-wrapper">
                     <div className="articleInfo">
                        <span className="articleInfo__category">GLOMO</span>

                        <span className="articleInfo__time">
                           {`${minuteRead} min read`}
                        </span>
                     </div>

                     <div className="text-wrapper--home">
                        <h4 className="title">{title}</h4>

                        <div className="home-feed-item-author">
                           <span className="home-feed-item-author__name">
                              {authorName}
                           </span>

                           <span className="home-feed-item-author__date">
                              {formatDate(date)}
                           </span>
                        </div>
                     </div>
                  </div>
               </a>
            </div>
         </div>
      )
   }
}

HomeFeedItem.propTypes = {
   authorName: PropTypes.string,
   link: PropTypes.string,
   date: PropTypes.string,
   minuteRead: PropTypes.number,
   image: PropTypes.string,
   title: PropTypes.string,
}

export default HomeFeedItem
