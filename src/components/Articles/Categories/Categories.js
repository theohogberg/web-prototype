import React, { Component } from 'react'
import PropTypes from 'prop-types'
export default class Categories extends Component {
   constructor(props) {
      super(props)
      this.state = {
         isFetching: false,
         fetchSuccess: false,
         fetchFail: false,
         fetchData: [],
      }
   }
   componentWillMount() {
      this.fetchData(`${process.env.REACT_APP_URL}/categories`)
         .then(data => {
            this.setState({
               ...this.state,
               fetchData: data,
               fetchSuccess: true,
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
   render() {
      const { cat } = this.props
      const { fetchSuccess, fetchData } = this.state
      return (
         <div className="categories">
            <h2 className="categories-title">CATEGORIES</h2>
            <nav className="categories-menu">
               {fetchSuccess ? (
                  <ul className="loaded">
                     <li className={cat === 'all' ? 'active' : ''}>
                        <a href={`/latest`}>All</a>
                     </li>
                     {fetchData.map(category => {
                        if (category.slug !== 'uncategorized') {
                           return (
                              <li
                                 key={fetchData}
                                 className={
                                    cat === category.slug ? 'active' : ''
                                 }
                              >
                                 <a href={`/latest/category/${category.slug}`}>
                                    {category.name}
                                 </a>
                              </li>
                           )
                        }
                     })}
                  </ul>
               ) : (
                  <ul className="loaded-none" />
               )}
            </nav>
         </div>
      )
   }
}

Categories.propTypes = {
   cat: PropTypes.string,
}
