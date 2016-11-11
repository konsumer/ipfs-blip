import React from 'react'

import KeyForm from '../components/KeyForm'

const NoKey = () => (
  <div className='NoKey'>
    <p>We don't have your key. You can either drag your private file here, or generate a new one.</p>
    <KeyForm />
  </div>
)

export default NoKey
