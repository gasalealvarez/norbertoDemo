import React from 'react'
import Spinner from 'react-bootstrap/Spinner';

export default function Loading() {
  return (
    <div className='divPadre'>
      <div className="divHijo">
        <Spinner className='spinner' animation="border" />
      </div>
    </div>
  )
}
