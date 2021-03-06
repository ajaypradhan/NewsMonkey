import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  constructor() {
    super();
    console.log("Hello this a constructor from News component");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    let url =
      "https://newsapi.org/v2/top-headlines?country=in&apiKey=f045e4cce6c14f09bb2c6483492cf059&page=1&pageSize=20";
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
    });
  }

  handlePrevClick = async () => {
    console.log("Previous");
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=f045e4cce6c14f09bb2c6483492cf059&page=${
      this.state.page - 1
    }&pageSize=20`;
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({
      page: this.state.page - 1,
      articles: parseData.articles,
    });
  };

  handleNextClick = async () => {
    console.log("Next");

    if (this.state.page + 1 > Math.ceil(this.state.totalResults / 20)) {
    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=f045e4cce6c14f09bb2c6483492cf059&page=${
        this.state.page + 1
      }&pageSize=20`;
      let data = await fetch(url);
      let parseData = await data.json();
      console.log(parseData);
      this.setState({
        page: this.state.page + 1,
        articles: parseData.articles,
      });
    }
  };
  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center">NewsMonkey Top Headlines</h2>

        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-4" key={element.url}>
                <NewsItem
                  title={element.title}
                  description={
                    element.description
                      ? element.description.slice(0, 88) + "...."
                      : " "
                  }
                  imageUrl={
                    element.urlToImage
                      ? element.urlToImage
                      : "https://akm-img-a-in.tosshub.com/indiatoday/images/breaking_news/202011/news_flash_4_1200x768.jpeg?DmuMUuNzN5AMeLXhgrUpuqyu5njf6KV7&size=770:433"
                  }
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between my-4">
          <button
            disabled={this.state.page <= 1}
            type="button"
            onClick={this.handlePrevClick}
            className="btn btn-dark"
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 > Math.ceil(this.state.totalResults / 20)
            }
            type="button"
            onClick={this.handleNextClick}
            className="btn btn-dark"
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
