import React from 'react'
import { connect } from 'react-redux'

const NoKey = () => (
  <div className='NoKey'>
    NO KEY
  </div>
)

const mapStateToProps = (store) => ({
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(NoKey)
