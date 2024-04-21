import React from 'react'
import { CFooter } from '@coreui/react'

const Footer = () => {
  return (
    <CFooter className="px-4">
      <div>
        <a href="/admin" target="_blank" rel="noopener noreferrer">
          VieLocaLure
        </a>
        <span className="ms-1">&copy; 2024 All rights reserved.</span>
      </div>
    </CFooter>
  )
}

export default React.memo(Footer)