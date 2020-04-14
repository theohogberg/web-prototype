import React, { Component } from 'react'
import PropTypes from 'prop-types'
import formatDate from '../../../util/FormatDate'
import Media from 'components/Media'

class ReadMoreItem extends Component {
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

   UNSAFE_componentWillMount() {
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
                           console.log(err)
                           this.setState({ isFetching: false, fetchFail: true })
                        })
                  })
                  this.setState({
                     ...this.state,
                     isFetching: false,
                  })
               })
               .catch(err => {
                  console.log(err)
                  this.setState({ isFetching: false, fetchFail: true })
               })
         })
         .catch(err => {
            console.log(err)
            this.setState({ isFetching: false, fetchFail: true })
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

   render() {
      if (this.state.fetchFail) {
         return null
      }
      const { link, title, timestamp } = this.props

      return (
         <div className="read-more-item">
            <a className="read-more-link" href={link}>
               <div className={`read-more-item__wrapper`}>
                  <Media
                     className="image-wrapper"
                     component="div"
                     lazy
                     image={this.state.mediaData.source_url}
                  />

                  <div className="text-wrapper">
                     {this.state.fetchCategorySuccess ? (
                        <div className="read-more-categories">
                           {this.state.categoryData.map(category => {
                              return <span key={category}>{category.name}</span>
                           })}
                        </div>
                     ) : (
                           <div className="read-more-categories" />
                        )}

                     <h4 className="title">
                        <span dangerouslySetInnerHTML={{ __html: title }} />
                     </h4>

                     {this.state.fetchAuthorSuccess ? (
                        <div className="read-more-author">
                           <span className="read-more-author__name">
                              {this.state.authorData.name}
                           </span>

                           <span className="read-more-author__date">
                              <p>{formatDate(timestamp)}</p>
                           </span>
                        </div>
                     ) : (
                           <div className="read-more-author" />
                        )}
                  </div>
               </div>
            </a>
         </div>
      )
   }
}

ReadMoreItem.propTypes = {
   link: PropTypes.string,
   imageID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
   authorID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
   categories: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.array,
   ]),
   title: PropTypes.string,
   timestamp: PropTypes.string,
}

export default ReadMoreItem
