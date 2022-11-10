import React from 'react'
import classes from './ErrorCard.module.css'
const ErrorCard = (props) => {
  console.log(props.error.response.data.errorMessage);
  return (
    <div className={classes.error}>
      <span>{props.error.response.data.errorMessage}</span>
    </div>
  )
}

export default ErrorCard
