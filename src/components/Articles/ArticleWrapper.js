import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { resize, Button } from 'glomo-boxes'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './ArticleWrapper.scss'
import LeftArrow from 'assets/img/left_arrow.svg'
import RightArrow from 'assets/img/right_arrow.svg'
import Article from './Article/Article'
import FeedItem from './FeedItem/FeedItem'
import HomeFeedItem from './FeedItem/HomeFeedItem'
import Placeholder from '../Placeholder/Placeholder'
import Media from 'components/Media'
import Loader from 'components/Loader'

const BREAKPOINT = 980

export default class ArticleWrapper extends Component {
   constructor(props) {
      super(props)
      this.state = {
         isDesktop: !(window.innerWidth < BREAKPOINT),
         isFetching: true,
         fetchSuccess: false,
         fetchFail: false,
         _isMounted: false,
         articleData: [],
         articleTypes: {
            single: this.renderSingleArticle,
            feed: this.renderArticles,
            hex: this.renderArticleHex,
            category: this.renderArticles,
            home: this.renderHomeArticles,
         },
         per_page: 2,
         page_total: null,
      }
   }

   UNSAFE_componentWillMount() {
      const { articleType } = this.props

      if (articleType === 'category') {
         const slug = this.props.match.params.slug
         this.fetchCategoryArticles(slug)
            .then(post => {
               this.setState({
                  isFetching: false,
                  fetchSuccess: true,
                  articleData: post,
               })
            })
            .catch(err => {
               console.log('Fetching category articles failed', err)
               this.setState({ isFetching: false, fetchFail: true })
            })
         return
      }
      if (articleType !== 'single') {
         this.fetchArticles()
            .then(post => {
               this.setState({
                  isFetching: false,
                  fetchSuccess: true,
                  articleData: post,
               })
            })
            .catch(err => {
               console.log('Fetching articles failed', err)
               this.setState({ isFetching: false, fetchFail: true })
            })
         return
      }
      const slug = this.props.match.params.slug
      this.fetchSingleArticle(slug)
         .then(post => {
            this.setState({
               isFetching: false,
               fetchSuccess: true,
               articleData: post,
            })
         })
         .catch(err => {
            console.log('Fetching single articles failed', err)
            this.setState({ isFetching: false, fetchFail: true })
         })
   }

   componentDidMount() {
      document.addEventListener('resize', this.resize)
   }

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

   loadMorePosts = () => {
      this.setState({ ...this.state, per_page: this.state.per_page + 3 })
   }

   async fetchCategoryArticles(slug) {
      this.setState({ isFetching: true })
      // fetch category id
      const catURL = `${process.env.REACT_APP_URL}/categories?slug=${slug}`
      const catResult = await fetch(catURL)
      const catBody = await catResult.json()

      const id = catBody[0].id

      const url = `${process.env.REACT_APP_URL}/posts?categories=${id}`
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

   async fetchSingleArticle(slug) {
      this.setState({ isFetching: true })
      const url = `${process.env.REACT_APP_URL}/posts?slug=${slug}`
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

   async fetchArticles() {
      const url = `${process.env.REACT_APP_URL}/posts?orderBy=date&per_page=60`
      const res = await fetch(url)
      const body = await res.json()

      if (res.status !== 200) {
         throw new Error(body.message)
      }

      if (Array.isArray(body)) {
         if (body.length < 1) {
            throw new Error('There are no posts to fetch')
         }
      }
      this.setState({ page_total: body.length })
      return body
   }

   articleReadTimeByContent = content => {
      const wordCount = content.split(' ')
      return Math.ceil(wordCount.length / 200)
   }

   renderSingleArticle = () => {
      if (this.state.isFetching) {
         return
      }
      const { articleData } = this.state
      const {
         id,
         title,
         excerpt,
         slug,
         content,
         date,
         author,
         featured_media,
      } = articleData[0]

      return (
         <Article
            {...this.props}
            id={id}
            imageFullWidth
            slug={slug}
            date={date}
            title={title.rendered}
            lead={excerpt.rendered}
            text={content.rendered}
            authorID={author}
            imageID={featured_media}
            setMetaTags={this.props.setMetaTags}
            minuteRead={this.articleReadTimeByContent(content.rendered)}
         />
      )
   }

   renderArticleFeedItem = (articleData, isFeatured) => {
      const {
         id,
         title,
         link,
         categories,
         excerpt,
         date,
         slug,
         author,
         featured_media,
         content,
      } = articleData
      return (
         <FeedItem
            key={id}
            featured={isFeatured}
            link={`/latest/${slug}`}
            authorID={author}
            imageID={featured_media}
            backgroundPosition={'center'}
            categories={categories}
            title={title.rendered}
            excerpt={excerpt.rendered}
            authorName="Fake Name"
            image="https://www.ethz.ch/en/campus/events/_jcr_content/par/twocolumn_1/par_left/fullwidthimage/image.imageformat.lightbox.1927430127.jpg"
            timestamp={date}
            minuteRead={this.articleReadTimeByContent(content.rendered)}
         />
      )
   }

   renderHomeArticleFeedItem = articleData => {
      const {
         id,
         title,
         link,
         categories,
         excerpt,
         date,
         slug,
         author,
         featured_media,
         content,
      } = articleData

      //  Checking the key since some posts have wp:featuredmedia under different key names.
      const embeddedData =
         typeof articleData._embedded === 'undefined'
            ? '_links'
            : '_embedded'

      const featuredMedia = articleData[embeddedData]['wp:featuredmedia'][0]
      const acfData = articleData && articleData.acf;
      const blogImage = acfData && acfData.blogImage;
      const authorName = acfData && acfData.author;

      return (
         <HomeFeedItem
            key={id}
            link={`/latest/${slug}`}
            image={blogImage || featuredMedia}
            categories={categories}
            title={title.rendered}
            excerpt={excerpt.rendered}
            minuteRead={this.articleReadTimeByContent(content.rendered)}
            date={date}
            authorName={authorName || articleData[embeddedData].author[0].name}
         />
      )
   }

   renderArticles = () => {
      const buttonStyle = {
         width: '80%',
         margin: '2rem 10% 17px 10%',
         height: '46px',
         fontSize: '18px',
         backgroundImage:
            'linear-gradient(0deg,#0f1a33,#111d39,#12203e,#142344,#16264a)',
      }

      return (
         <div className="blog-feed">
            <div className="posts">
               {this.state.isFetching && <Loader isFetching />}

               {this.state.articleData.map((article, idx) => {
                  if (idx <= this.state.per_page) {
                     return this.renderArticleFeedItem(article, false)
                  }
               })}

               {this.state.per_page < this.state.page_total && (
                  <div className="posts__more">
                     <Button
                        onMouseDown={() => {
                           this.loadMorePosts()
                        }}
                        onTouchStart={() => {
                           this.loadMorePosts()
                        }}
                        color={'#fff'}
                        className="load-more-post-btn"
                        backgroundColor={'#003439'}
                        style={buttonStyle}
                     >
                        Load more posts
                     </Button>

                     <span className="posts__more__numbers">
                        Showing <b>{this.state.per_page + 1}</b> of
                        <b>{this.state.page_total}</b>
                     </span>
                  </div>
               )}
            </div>
         </div>
      )
   }

   renderHomeArticles = () => {
      if (this.state.isFetching) {
         return (
            <div className="placeholder-wraps-all">
               {this.state.isDesktop ? (
                  [...Array(3)].map((_, i) => <Placeholder key={i} />)
               ) : (
                     <Placeholder />
                  )}
            </div>
         )
      }

      const slidesNumber = this.state.isDesktop ? 3 : 1

      const NextArrow = ({ className, style, onClick }) => (
         <div className={className} style={style} onClick={onClick}>
            <Media component="img" lazy src={RightArrow} alt="right arrow" />
         </div>
      )

      const PrevArrow = ({ className, style, onClick }) => (
         <div className={className} style={style} onClick={onClick}>
            <Media component="img" lazy src={LeftArrow} alt="left arrow" />
         </div>
      )

      const settings = {
         dots: this.state.isDesktop,
         infinite: true,
         speed: 500,
         slidesToShow: slidesNumber,
         slidesToScroll: slidesNumber,
         swipeToSlide: true,
         arrows: true,
         nextArrow: <NextArrow />,
         prevArrow: <PrevArrow />,
      }
      return (
         <div className="blog-feed-home">
            <Slider {...settings} className="slider-style">
               {this.state.articleData.map((article, idx) => {
                  return this.renderHomeArticleFeedItem(article)
               })}
            </Slider>
         </div>
      )
   }

   renderRedirect = () => <Redirect to="/latest" />

   render() {
      return (
         <div>
            {this.state.fetchFail
               ? this.renderRedirect()
               : this.state.articleTypes[this.props.articleType]()}
         </div>
      )
   }
}

ArticleWrapper.propTypes = {
   id: PropTypes.string,
   articleType: PropTypes.string,
}
