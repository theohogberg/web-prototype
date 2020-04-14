import React, { Component } from 'react'
import ReadMoreItem from './ReadMoreItem'

class ReadMore extends Component {
   constructor(props) {
      super(props)
      this.state = {
         isFetching: false,
         fetchFail: false,
         postsData: [],
      }
   }
   componentWillMount() {
      this.fetchData(
         `${process.env.REACT_APP_URL}/posts?exclude=${this.props.id}`
      )
         .then(posts => {
            const rand = this.shuffle(posts)
            const slice = rand.slice(0, 3)
            this.setState({
               ...this.state,
               postsData: slice,
               isFetching: false,
            })
         })
         .catch(err => {
            this.setState({ isFetching: false, fetchFail: true })
         })
   }
   shuffle = array => {
      var currentIndex = array.length,
         temporaryValue,
         randomIndex

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
         // Pick a remaining element...
         randomIndex = Math.floor(Math.random() * currentIndex)
         currentIndex -= 1

         // And swap it with the current element.
         temporaryValue = array[currentIndex]
         array[currentIndex] = array[randomIndex]
         array[randomIndex] = temporaryValue
      }

      return array
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
      const { isFetching, fetchFail, postsData, postMedia } = this.state

      return (
         <div className="article-read-more">
            {!isFetching ? (
               <div className="read-more">
                  <h6 className="read-more__title">Read More</h6>
                  <div className="read-more__list">
                     {postsData.map((post, index) => {
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
                        } = post
                        return (
                           <div key={index} className="read-more__list-item">
                              <ReadMoreItem
                                 key={id}
                                 timestamp={date}
                                 link={`/latest/${slug}`}
                                 authorID={author}
                                 imageID={featured_media}
                                 categories={categories}
                                 title={title.rendered}
                                 excerpt={excerpt.rendered}
                              />
                              <div className="divider" />
                           </div>
                        )
                     })}
                  </div>
               </div>
            ) : (
                  <div className="read-more" />
               )}
         </div>
      )
   }
}
ReadMore.propTypes = {}
export default ReadMore
