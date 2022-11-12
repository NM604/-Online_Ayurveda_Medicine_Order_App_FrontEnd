import React from 'react'
import classes from './ErrorCard.module.css'
const ErrorCard = (props) => {
  return (
    <div className={classes.error}>
      <span>{props.error.message}</span>
    </div>
  )
}

export default ErrorCard
