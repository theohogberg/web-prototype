import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'glomo-boxes'
import InstaIcon from 'assets/img/instagramLogo.svg'
import heartIcon from 'assets/img/heart.svg'
import commentIcon from 'assets/img/comment.svg'
import videoIcon from 'assets/img/video.svg'
import Media from '../Media'

export default class InstagramFeed extends Component {
   constructor(props) {
      super(props)
      this.state = {
         message: null,
         error: null,
         isFetching: true,
         posts: null,
      }
   }
   componentWillMount() {
      this.setState({
         isFetching: true,
      })
      const header = new Headers({
         'Content-Type': 'application/json',
         Authorization: '69113211202008',
      })
      const url =
         'https://7d3agrjlm4.execute-api.eu-west-1.amazonaws.com/dev/instagram'
      fetch(url, {
         headers: header,
         method: 'POST',
      })
         .then(response => response.json())
         .then(response => {
            this.setState({
               posts: Object.values(response.posts),
               isFetching: false,
            })
         })
         .catch(er => {
            this.setState({
               error: er,
            })
         })
   }
   renderImage = post => {
      return (
         <figure className="insta-image">
            <a target="_blank" rel="noopener" href={post.link}>
               <Media
                  lazy
                  className="instagram-image"
                  src={post.images.low_resolution.url}
               />
               <figcaption className="insta-image-hover">
                  <div className="insta-image-hover__inner">
                     <Media lazy className="heart-icon" src={heartIcon} />
                     <span className="likes">{post.likes.count}</span>
                     <Media lazy className="comment-icon" src={commentIcon} />
                     <span className="comments">{post.comments.count}</span>
                  </div>
               </figcaption>
               $
               {post.type === 'video' && (
                  <Media lazy className="video-icon" src={videoIcon} />
               )}
            </a>
         </figure>
      )
   }
   renderInstaImages = posts => {
      return (
         <div className="scrolling-wrapper">
            {posts.map((post, index) => {
               if (index < 6) {
                  return this.renderImage(post)
               }
            })}
         </div>
      )
   }
   renderTempImages = () => {
      return (
         <div className="scrolling-wrapper">
            <div className="temp-image" />
            <div className="temp-image" />
            <div className="temp-image" />
            <div className="temp-image" />
            <div className="temp-image" />
            <div className="temp-image" />
         </div>
      )
   }
   render() {
      const { message, error, posts, isFetching } = this.state

      return (
         <div className="instagram-feed">
            <div className="instagram-feed__inner">
               <a
                  target="_blank"
                  rel="noopener"
                  href="https://www.instagram.com/glomo.se/"
                  className="top-link"
               >
                  <Media lazy className="instagram-icon" src={InstaIcon} />
                  <p className="account">glomo.se</p>
               </a>
               {isFetching == false
                  ? this.renderInstaImages(posts)
                  : this.renderTempImages()}
               {error && this.renderTempImages()}
            </div>
         </div>
      )
   }
}
