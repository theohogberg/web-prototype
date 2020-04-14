import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import { Hexagon, resize } from 'glomo-boxes'

import Author from '../Articles/Author'
import SectionHeader from '../Headers'
import pascal from 'assets/img/pascal.png'
import Signup from '../Signup'

const BREAKPOINT = 768

class BlogFeedHex extends Component {
   constructor(props) {
      super(props)
      this.state = {
         isFetching: false,
         fetchAuthorSuccess: false,
         fetchFail: false,
         authorData: [],
      }
   }

   componentWillMount() {
      this.fetchData(
         `${process.env.REACT_APP_URL}/users/${this.props.authorID}`
      )
         .then(author => {
            this.setState({
               ...this.state,
               authorData: author,
               isFetching: false,
               fetchAuthorSuccess: true,
            })
            this.imageSizeStyle()
         })
         .catch(err => {
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

   createExcerpt = excerptHtml => {
      const excerpt = excerptHtml.replace(/<\/?p[^>]*>/g, '')
      if (excerpt.length > 150) {
         const trimmed = excerpt.substring(0, 150)
         return `${trimmed}...`
      }
      return excerpt
   }

   render() {
      const { link, title, excerpt, date, minuteRead } = this.props
      const { fetchAuthorSuccess, authorData } = this.state
      if (this.state.isFetching) {
         return null
      }
      return (
         <div className="content featured-blog">
            <SectionHeader
               header="latest blog post"
               className="featured-blog__header"
               color="#fff"
               opacity="1"
            />
            <h4 className="featured-blog__title" style={{ marginTop: '2rem' }}>
               <a href={link}>{title}</a>
            </h4>
            <p className="featured-blog__excerpt" style={{ margin: '1rem 0' }}>
               {this.createExcerpt(excerpt)}
            </p>
            {fetchAuthorSuccess ? (
               <Author
                  name={authorData.name}
                  timestamp={date}
                  minuteRead={minuteRead}
                  image={authorData.avatar_urls['96']}
                  colorTheme="light"
               />
            ) : (
               <Author
                  name=""
                  timestamp=""
                  minuteRead={0}
                  image=""
                  colorTheme="light"
               />
            )}
         </div>
      )
   }
}
BlogFeedHex.propTypes = {
   header: PropTypes.string,
   link: PropTypes.string,
   title: PropTypes.string,
   excerpt: PropTypes.string,
   authorName: PropTypes.string,
   timestamp: PropTypes.string,
   minuteRead: PropTypes.number,
   authorImage: PropTypes.string,
}
export default BlogFeedHex
