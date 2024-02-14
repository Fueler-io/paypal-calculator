import React from 'react'

const CTA = () => {
  return (
    <div>
        <a href="https://fueler.io/upload-your-work" target="_blank" rel="noopener noreferrer">
        <picture className="cta">
            <source srcSet="cta-desktop.png" media="(min-width: 800px)" />
            <img src="cta-mob.png" className='w-full' alt="join fueler img" />
        </picture>
        </a>
    </div>
  )
}

export default CTA