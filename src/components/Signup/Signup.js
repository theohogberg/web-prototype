import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { IconButton } from 'glomo-boxes'
import arrowRight from 'assets/img/arrow_forward_white.svg'

export default class Signup extends Component {
   constructor(props) {
      super(props)
      this.state = {
         message: null,
         error: null,
         isFetching: false,
      }
   }
   statusCheck = () => {
      this.setState({
         isFetching: true,
      })
      const email = this.email.value
      const postBody = JSON.stringify({
         email: email,
      })
      const header = new Headers({
         'Content-Type': 'application/json',
      })
      const url =
         'https://l2o0vkvxk3.execute-api.eu-west-1.amazonaws.com/dev/status'
      fetch(url, {
         headers: header,
         method: 'POST',
         body: postBody,
      })
         .then(response => response.json())
         .then(response => {
            const status = response.status
            if (status === 'subscribed') {
               this.setState({
                  error: null,
                  isFetching: false,
                  message:
                     "This email is already subscribed. We'll be in touch!",
               })
            } else if (status === 'unsubscribed') {
               this.update()
            } else {
               this.signup()
            }
         })
         .catch(error => {})
   }
   update = () => {
      const email = this.email.value

      const postBody = JSON.stringify({
         email: email,
         status: 'pending',
      })
      const header = new Headers({
         'Content-Type': 'application/json',
      })
      const url =
         'https://l2o0vkvxk3.execute-api.eu-west-1.amazonaws.com/dev/update'

      fetch(url, {
         headers: header,
         method: 'POST',
         body: postBody,
      })
         .then(response => response.json())
         .then(response => {
            const status = response.status
            if (status === 'missing') {
               this.email.classList.add('error')
               setTimeout(() => {
                  this.email.classList.remove('error')
               }, 1000)
            } else {
               this.setState({
                  error: null,
                  isFetching: false,
                  message:
                     'You have unsubscribed before, so we send a confirmation email to your inbox, Please confirm there.',
               })
               this.email.value = ''
            }
         })
         .catch(error => {
            this.setState({
               message: null,
               error:
                  'Something whent wrong with the signup, please try again later.',
               isFetching: false,
            })
            this.email.classList.add('error')
            setTimeout(() => {
               this.email.classList.remove('error')
            }, 1000)
         })
   }
   signup = () => {
      const email = this.email.value

      const postBody = JSON.stringify({
         email: email,
         status: 'subscribed',
      })
      const header = new Headers({
         'Content-Type': 'application/json',
      })
      const url =
         'https://l2o0vkvxk3.execute-api.eu-west-1.amazonaws.com/dev/signup'

      fetch(url, {
         headers: header,
         method: 'POST',
         body: postBody,
      })
         .then(response => response.json())
         .then(response => {
            const status = response.status
            if (status === 'missing') {
               this.email.classList.add('error')
               setTimeout(() => {
                  this.email.classList.remove('error')
               }, 1000)
            } else if (status === 'subscribed') {
               this.setState({
                  error: null,
                  message:
                     "Thank you for signing up for the GLOMO newsletter. We'll be in touch!",
               })
               this.email.value = ''
            }
            this.setState({
               isFetching: false,
            })
         })
         .catch(error => {
            this.setState({
               message: null,
               error:
                  'Something whent wrong with the signup, please try again later.',
               isFetching: false,
            })
            this.email.classList.add('error')
            setTimeout(() => {
               this.email.classList.remove('error')
            }, 1000)
         })
   }
   render() {
      const { message, error } = this.state
      return (
         <div className="signup">
            <div className="signup__text">
               <p
                  className={`text ${message ? 'closed' : ''} ${
                     error ? 'closed' : ''
                  }`}
               >
                  Sign up to receive special insights, tips and reports that
                  will help you on your digital journey
               </p>
               <p
                  className={`message ${message ? 'open' : ''} ${
                     error ? 'closed' : ''
                  }`}
               >
                  {message}
               </p>
               <p
                  className={`error ${error ? 'open' : ''} ${
                     message ? 'closed' : ''
                  }`}
               >
                  {error}
               </p>
            </div>
            <div className={'form'}>
               <input
                  aria-label="Add your email"
                  type="email"
                  name="EMAIL"
                  className={`required email input${
                     this.state.isFetching ? ' submitting' : ''
                  }`}
                  placeholder="Enter your email…"
                  ref={input => {
                     this.email = input
                  }}
               />
               <IconButton
                  cssEase="ease-in"
                  disabled={false}
                  processing={false}
                  size={48}
                  transitionDuration={300}
                  value="Subscribe"
                  id="subscribe"
                  name="subscribe"
                  onMouseDown={e => {
                     e.preventDefault()
                     this.statusCheck()
                  }}
                  className={this.state.isFetching ? 'submitting' : ''}
               >
                  {this.state.isFetching ? (
                     <svg id="load" x="0px" y="0px" viewBox="0 0 150 150">
                        <circle
                           id="loading-inner"
                           cx="75"
                           cy="75"
                           r="60"
                           fill="#FFF"
                        />
                     </svg>
                  ) : (
                     <img src={arrowRight} alt="arrow right" />
                  )}
               </IconButton>
            </div>
         </div>
      )
   }
}
