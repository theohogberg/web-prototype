/* eslint-disable react/no-danger */
import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'
import Parser from 'html-react-parser'
import NewsFeed from 'components/NewsFeed'
import Author from '../Author'
import Divider from '../Divider'
import HomeLink from '../HomeLink'
import ReadMore from '../ReadMore'
import PreFooter from 'components/PreFooter'
import Loader from 'components/Loader'
import Media from 'components/Media'
import ShareButtons from '../ShareButtons/ShareButtons'

const BREAKPOINT = 768

class Article extends Component {
   constructor(props) {
      super(props)
      this.state = {
         isDesktop: !(window.innerWidth < BREAKPOINT),
         windowWidth: window.innerWidth,
         imageStyle: {},
         isFetching: true,
         fetchMediaSuccess: false,
         fetchAuthorSuccess: false,
         fetchFail: false,
         mediaData: [],
         authorData: [],
      }
   }

   componentDidMount() {
      this.fetchData(`${process.env.REACT_APP_URL}/media/${this.props.imageID}`)
         .then(media => {
            this.setState(prevState => ({
               ...prevState,
               mediaData: media,
               fetchMediaSuccess: true,
            }))

            this.fetchData(
               `${process.env.REACT_APP_URL}/users/${this.props.authorID}`
            )
               .then(author => {
                  this.setState(prevState => ({
                     ...prevState,
                     authorData: author,
                     isFetching: false,
                     fetchAuthorSuccess: true,
                  }))
                  this.imageSizeStyle()
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

      window.addEventListener('resize', this.resize)
      this.resize(); // Stops incorrect image size on first load
   }

   componentDidUpdate() {
      const para = document.getElementById('articleTextParagraph')
      const images = para.getElementsByTagName('img')
      const figures = para.getElementsByTagName('figure')

      for (let i = 0; i < images.length; i++) {
         images[i].width = 0
         images[i].height = 0
      }

      for (let y = 0; y < figures.length; y++) {
         figures[y].style.width = 'auto'
      }
   }

   componentWillUnmount() {
      window.removeEventListener('resize', this.resize)
   }

   resize = () => {
      if (window.innerWidth >= BREAKPOINT) {
         this.setState({ isDesktop: true, windowWidth: window.innerWidth })
      } else if (window.innerWidth < BREAKPOINT) {
         this.setState({ isDesktop: false, windowWidth: window.innerWidth })
      }

      this.imageSizeStyle()
   }

   imageSizeStyle = () => {
      const container = document.getElementById('article-image-container')
      const image = document.getElementById('article-image')

      this.setState(prevState => ({ ...prevState, imageStyle: { width: '99%' } }))

      if (container && this.state.fetchMediaSuccess) {
         if (image.offsetHeight < container.offsetHeight) {
            this.setState(prevState => ({
               ...prevState,
               imageStyle: { height: '100%', width: 'auto' },
            }))
         } else if (image.offsetWidth < container.offsetWidth) {
            this.setState(prevState => ({
               ...prevState,
               imageStyle: { height: 'auto', width: '100%' },
            }))
         }
      }
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

   renderBlogMarkup = input => {
      return { __html: input }
   }

   render() {
      const { imageFullWidth, slug, title, text, date, minuteRead } = this.props
      const {
         fetchMediaSuccess,
         fetchAuthorSuccess,
         mediaData,
         authorData,
         isFetching,
      } = this.state

      return (
         <div className="article-page">
            <HomeLink />

            <Helmet title={Parser(title)}>
               <meta
                  property="og:url"
                  content={`https://glomo.se/latest/${slug}`}
               />
               <meta property="og:title" content={Parser(title)} />
               <meta property="og:type" content="article" />
               <meta property="og:description" content={Parser(title)} />
               <meta
                  property="og:image"
                  content={this.state.mediaData.source_url}
               />
            </Helmet>

            {isFetching && <Loader isFetching />}

            <article className="article">
               <section className="article-inner">
                  <div className="article-author">
                     {fetchAuthorSuccess ? (
                        <Author
                           name={authorData.name}
                           timestamp={date}
                           minuteRead={minuteRead}
                           image={authorData.avatar_urls['96']}
                           colorTheme="dark"
                        />
                     ) : (
                           <Author
                              name=""
                              timestamp=""
                              minuteRead={0}
                              image=""
                              colorTheme="dark"
                           />
                        )}
                  </div>

                  {this.state.isDesktop && (
                     <div className="blog-title">
                        <h1
                           className="article-title"
                           dangerouslySetInnerHTML={this.renderBlogMarkup(
                              title
                           )}
                        />
                     </div>
                  )}
               </section>

               <section
                  className={
                     imageFullWidth ? 'article-full-width' : 'article-inner'
                  }
               >
                  <div
                     className="article-image-container"
                     id={'article-image-container'}
                  >
                     {fetchMediaSuccess ? (
                        <Media
                           component="img"
                           lazy
                           className="article-image"
                           src={mediaData.source_url}
                           alt={mediaData.alt_text}
                           id="article-image"
                           style={this.state.imageStyle}
                        />
                     ) : (
                           <div
                              className="article-image-temp"
                              id="article-image"
                           />
                        )}
                  </div>
               </section>

               {!this.state.isDesktop && (
                  <section className="article-inner">
                     <div className="blog-title">
                        <h1
                           className="article-title"
                           dangerouslySetInnerHTML={this.renderBlogMarkup(
                              title
                           )}
                        />
                     </div>
                  </section>
               )}

               <ShareButtons url={`https://glomo.se/latest/${slug}`} />

               <section className="article-inner">
                  <div
                     className="text-paragraph"
                     id="articleTextParagraph"
                     dangerouslySetInnerHTML={this.renderBlogMarkup(text)}
                  />
                  <Divider />
               </section>

               <ReadMore id={this.props.id} />
            </article>

            <NewsFeed />

            <PreFooter
               backgroundColor="#f2d6d3"
               color=" #5B646F"
               line1="Change nothing and nothing changes"
               line2="GET IN TOUCH WITH US"
               linkText="HELLO@GLOMO.SE"
               link="mailto:hello@glomo.se"
            />
         </div>
      )
   }
}

Article.propTypes = {
   imageID: PropTypes.number,
   id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
   slug: PropTypes.string,
   imageFullWidth: PropTypes.bool,
   title: PropTypes.string,
   text: PropTypes.string,
   authorID: PropTypes.number,
   date: PropTypes.string,
   minuteRead: PropTypes.number,
}

export default Article
