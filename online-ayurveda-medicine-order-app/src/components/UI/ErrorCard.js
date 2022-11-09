import React from 'react'
import classes from './ErrorCard.module.css'
const ErrorCard = () => {
  return (
    <div className={classes.error}>
      <span>Network Error</span>
    </div>
  )
}

export default ErrorCard
