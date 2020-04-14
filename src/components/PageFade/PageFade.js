import React from 'react'
import { CSSTransition } from 'react-transition-group'

const PageFade = props => (
   <CSSTransition {...props} classNames="fadeTranslate" timeout={500} />
)

export default PageFade
