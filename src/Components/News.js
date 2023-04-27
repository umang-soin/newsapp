import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 10,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    console.log("Hello I am constructor from News Component");

    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };

    document.title = `News Monkey - ${this.capitalizeFirstLetter(
      this.props.category
    )}`;
  }

  capitalizeFirstLetter = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  async updateNews() {

    this.props.setProgress(10);

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    this.setState({ loading: true });
    
    let data = await fetch(url);
    this.props.setProgress(30);

    let parsedData = await data.json();
    this.props.setProgress(70);
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });

    this.props.setProgress(100);
  }

  async componentDidMount() {
    // this.setState({loading: true});
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9dcb1766f98a4c5cb36085d8c8842dfa&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading: false
    // });

    // console.log(this.state.totalResults);
    this.updateNews();
  }

  handlePreviousClick = async () => {   
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

  handleNextClick = async () => {    
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };

  fetchMoreData = async () => {
    this.setState({
      page: this.state.page + 1,
    });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;

    this.setState({ loading: true });

    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    });
  };

  render() {
    console.log("render");
    return (
      <>
        <div className="container my-3">
          <h1 className="text-center" style={{ margin: "35px 0px" }}>
            News Monkey Top Headlines
          </h1>

          {/* {this.state.loading && <Spinner/>} */}

          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spinner />}
          >
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      newsUrl={element.url}
                      title={element.title.slice(0, 45)}
                      description={
                        element.description != null
                          ? element.description.slice(0, 88)
                          : "Desc Not Exist"
                      }
                      imageUrl={element.urlToImage}
                      date={element.publishedAt}
                      source={element.source.name}
                      author={element.author}
                    />
                  </div>
                );
              })}
            </div>
          </InfiniteScroll>

          {/* {!this.state.loading && this.state.articles.map((element) => {
              return (
              <div className="col-md-4" key={element.url}>
                <NewsItem newsUrl={element.url} title={element.title.slice(0,45)} description={element.description != null? element.description.slice(0,88):'Desc Not Exist'} imageUrl={element.urlToImage} date={element.publishedAt} source={element.source.name} author={element.author}/>
                </div>
              )
            })} */}
        </div>
        {/* <div className="container my-3 d-flex justify-content-between">
          <button disabled={this.state.page <= 1} onClick={this.handlePreviousClick} className="btn btn-primary">&#8592; Previous</button>
          <button disabled={Math.ceil(this.state.totalResults/this.props.pageSize) < (this.state.page + 1)} onClick={this.handleNextClick} className="btn btn-success">Next &#8594;</button>
        </div>       */}
      </>
    );
  }
}

export default News;
