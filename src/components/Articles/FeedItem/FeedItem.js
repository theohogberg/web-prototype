import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Author from '../Author'
import Media from 'components/Media'

class FeedItem extends Component {
   constructor(props) {
      super(props)
      this.state = {
         isFetching: false,
         fetchMediaSuccess: false,
         fetchAuthorSuccess: false,
         fetchCategorySuccess: false,
         fetchFail: false,
         mediaData: [],
         authorData: [],
         categoryData: [],
      }
   }

   componentWillMount() {
      // fetch images
      this.fetchData(`${process.env.REACT_APP_URL}/media/${this.props.imageID}`)
         .then(media => {
            this.setState({
               ...this.state,
               mediaData: media,
               fetchMediaSuccess: true,
            })
            // fetch author
            this.fetchData(
               `${process.env.REACT_APP_URL}/users/${this.props.authorID}`
            )
               .then(author => {
                  this.setState({
                     ...this.state,
                     authorData: author,
                     fetchAuthorSuccess: true,
                  })
                  this.imageSizeStyle()
                  // fetch categories
                  this.props.categories.map(category => {
                     this.fetchData(
                        `${process.env.REACT_APP_URL}/categories/${category}`
                     )
                        .then(cat => {
                           this.setState({
                              ...this.state,
                              categoryData: [...this.state.categoryData, cat],
                              fetchCategorySuccess: true,
                           })
                        })
                        .catch(err => {
                           if (err) {
                              this.setState({
                                 isFetching: false,
                                 fetchFail: true,
                              })
                           }
                        })
                  })
                  this.setState({
                     ...this.state,
                     isFetching: false,
                  })
               })
               .catch(err => {
                  if (err) {
                     this.setState({ isFetching: false, fetchFail: true })
                  }
               })
         })
         .catch(err => {
            if (err) {
               this.setState({ isFetching: false, fetchFail: true })
            }
         })
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

   imageSizeStyle = () => {
      const container = document.getElementById('article-image-container')
      const image = document.getElementById('article-image')
      this.setState({ ...this.state, imageStyle: { width: '99%' } })
      if (container && this.state.fetchMediaSuccess) {
         if (image.offsetHeight < container.offsetHeight) {
            this.setState({
               ...this.state,
               imageStyle: { height: '100%', width: 'auto' },
            })
         } else if (image.offsetWidth < container.offsetWidth) {
            this.setState({
               ...this.state,
               imageStyle: { height: 'auto', width: '100%' },
            })
         }
      }
   }

   render() {
      if (this.state.fetchFail) {
         return null
      }
      const {
         featured,
         link,
         backgroundPosition,
         title,
         excerpt,
         timestamp,
         minuteRead,
      } = this.props
      const { authorData, mediaData, isFetching } = this.state

      return (
         <div className={`blog-feed-item${featured ? '-featured' : ''}`}>
            <div
               className={`blog-feed-item${
                  featured ? '-featured' : ''
                  }__header`}
            />
            <div
               className={`blog-feed-item${
                  featured ? '-featured' : ''
                  }__wrapper`}
            >
               <a href={link}>
                  <Media
                     className="image-wrapper"
                     lazy
                     image={mediaData.source_url}
                  />
               </a>

               <div className="text-wrapper">
                  <h4 className="title">
                     <a href={link}>
                        <span dangerouslySetInnerHTML={{ __html: title }} />
                     </a>
                  </h4>

                  <div
                     className="excerpt"
                     dangerouslySetInnerHTML={this.parseMarkupToHtml(excerpt)}
                  />
                  <Author
                     name={authorData.name}
                     timestamp={timestamp}
                     minuteRead={minuteRead}
                     image={isFetching ? '' : authorData.avatar_urls['96']}
                     colorTheme={featured ? 'light' : 'dark'}
                  />
               </div>
            </div>
         </div>
      )
   }
}
FeedItem.propTypes = {
   featured: PropTypes.bool,
   link: PropTypes.string,
   categories: PropTypes.array,
   imageID: PropTypes.number,
   authorID: PropTypes.number,
   backgroundPosition: PropTypes.string,
   title: PropTypes.string,
   excerpt: PropTypes.string,
   timestamp: PropTypes.string,
   minuteRead: PropTypes.number,
}
export default FeedItem
