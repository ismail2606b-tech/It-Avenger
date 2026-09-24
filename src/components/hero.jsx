import React from 'react'

function hero() {
  return (
    <>
    <div className="hero">
      <div className="hero-content">
        <p className="hero-small-title">Stonger Together</p>
        <h1>JUJUTSU KAISEN</h1>
        <p className="hero-japanese">呪 術 廻 戦</p>
        <p className="hero-description"> 
                      Yuji Itadori,is a high 
          schooler with extraodinary
          strenght,
                   joins a secret
          organization of sorcerers to
          fight curses
                    and protect the
          world from darkness.
           </p>
           <div className="hero-info">
                          <span>⭐ 8.6/10</span>
                          <span>📅 2020</span>
                          <span>🎬 Action</span>
                          <span>2 seasons</span>
                          <span>Action</span>
                          <span>supernatural</span>
                          <span>shounen</span>
      </div>
      <div className="hero-buttons">
        <button className="Watch-btn"> Watch Now</button>

       <button className="list-btn"> Add to List</button>
      </div>
      
      <div className="navbar">
        <div className="logo">
          <img src="images/logo.png" alt="logo" />
           
          
       
        <a href="/">home</a>
        <a href="#">cards</a>
        <a href="#">Popular</a>
        <a href="#">categories</a>
        <div className="nav-actions">
        <span className="search-link">Search</span>
        <button className="login-btn"
        onClick={()=>
          window.open("/login.html", "_blank")}>
          Log In</button>
        
      </div>
      </div>
      </div>
      </div>
      </div>
      <button className="arrow-btn">🔜</button>
      <div className="black-page"></div>
      <div className='poster-section'>
      <h2>Popular anime</h2>
      <div className="poster-grid">
      <img src="images/aot poster (1).jpg" alt="attack on titan"/>
      <img src="images/dragon balls.jpg"alt="dragon ballz"/>
      <img src="images/bleach.jpg"alt="bleach"/>
      <img src="images/naruto.jpg"alt="naruto shippuden"/>
      <img src="images/luffy.jpg"alt="one peice"/>
      <img src="images/demon slayer.jpg"alt="demon slayer"/>
      <img src="images/one punch man.jpg"alt="one punch man"/>
      <img src="images/heroacademia.jpg"alt="hero acadima"/>
      </div>
      </div>
    </>
  )
}

export default hero

