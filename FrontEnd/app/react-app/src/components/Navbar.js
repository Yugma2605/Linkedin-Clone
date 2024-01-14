import React from "react";
// import react-dom from "react-dom";

function Navbar() {
  return (
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
      <a class="navbar-brand" href="#">
        Linked<i class="fa-brands fa-linkedin fa-xl"></i>
      </a>
      <form class="form-inline my-2 my-lg-0">
        
        
      <div class="search-container">
        <input type="text" class="search-input" placeholder="Search..."/>
        <div class="search-icon"></div>
      </div>
        {/* <div class="input-icons">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input class="form-control mr-sm-2" type="search" placeholder="    Search" aria-label="Search"/>
      
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </div> */}
        
    </form>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="d-flex ms-auto order-5">
          <li class="nav-item active">
            <a class="nav-link" href="#">
              <i className="fa-solid fa-newspaper fa-xl"></i>
              <br />
              <div class="navbar-right"> Articles </div>
              <span class="sr-only">(current)</span>
            </a>
          </li>
          <li class="nav-item active">
            <a class="nav-link" href="#">
              <i class="fa-solid fa-person fa-xl"></i>
              <br />
              People <span class="sr-only">(current)</span>
            </a>
          </li>
          <li class="nav-item active">
            <a class="nav-link" href="#">
              <i class="fa-solid fa-school fa-xl"></i>
              <br />
              Learning <span class="sr-only">(current)</span>
            </a>
          </li>
          <li class="nav-item active">
            <a class="nav-link" href="#">
              <i class="fa-solid fa-suitcase fa-xl"></i>
              <br />
              Jobs <span class="sr-only">(current)</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
