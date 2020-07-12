import React from 'react'
import PropTypes from 'prop-types'

const MessageComponent = ({message, author}) =>(
    <p style={{float: author != 'Me' ? "left" : "right"}}>
        <i>{author}</i>:{message}
    </p>
)
// MessageComponent.PropTypes= {
//     message: PropTypes.string.isRequired,
//     author: PropTypes.string.isRequired
// }

export default MessageComponent