import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {

    let {title,description, imageUrl, newsUrl, date, author, source} = this.props;

    return (
      
        <div className="card">
          <div className='d-flex justify-content-end' style={{position:'absolute', right:'0'}}>
          <span style={{}} class="badge rounded-pill bg-danger">
            {source}         
            </span>
          </div>
           
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
          <h5 className="card-title">{title}...           
          </h5>
          <p className="card-text">{description}...</p>
          <p className='card-text'><small className='text-muted'>By {author} on {new Date(date).toGMTString()}</small></p>
          <a href={newsUrl} rel="noreferral" target='_blank' className="btn btn-primary">Read More</a>
          </div>
        </div>
      
    )
  }
}

export default NewsItem