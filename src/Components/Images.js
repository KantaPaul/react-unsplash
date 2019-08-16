import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Images extends React.Component {
  state = {
    photos: [],
    currenTpage: 1,
    loading: true,
    total: 8,
    search: "",
    searching: false,
    total_res: null,
    total_pages: null
  };
  componentDidMount() {
    fetch(
      "https://api.unsplash.com/photos/?client_id=6b7cd9120e470ca44886aaacd7f00c4cb1beeba4fcecb28d26523d5bfa53c6c1&per_page=" +
        this.state.total
    )
      .then(res => res.json())
      .then(da => JSON.stringify(da))
      .then(da => JSON.parse(da))
      .then(suc => {
        this.setState({
          photos: suc,
          loading: false
        });
      });
  }
  prevPageHadeler = () => {
    fetch(
      "https://api.unsplash.com/photos/?client_id=6b7cd9120e470ca44886aaacd7f00c4cb1beeba4fcecb28d26523d5bfa53c6c1&per_page=" +
        this.state.total +
        "&page=" +
        this.state.currenTpage
    )
      .then(res => res.json())
      .then(da => JSON.stringify(da))
      .then(da => JSON.parse(da))
      .then(suc => {
        this.setState({
          photos: suc,
          loading: false,
          currenTpage: this.state.currenTpage - 1
        });
      });
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  nextPageHadeler = () => {
    fetch(
      "https://api.unsplash.com/photos/?client_id=6b7cd9120e470ca44886aaacd7f00c4cb1beeba4fcecb28d26523d5bfa53c6c1&per_page=" +
        this.state.total +
        "&page=" +
        this.state.currenTpage
    )
      .then(res => res.json())
      .then(da => JSON.stringify(da))
      .then(da => JSON.parse(da))
      .then(suc => {
        this.setState({
          photos: suc,
          loading: false,
          currenTpage: this.state.currenTpage + 1
        });
      });
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  changeHandel = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  submitHandel = e => {
    e.preventDefault();
    fetch(
      "https://api.unsplash.com/search/photos/?client_id=6b7cd9120e470ca44886aaacd7f00c4cb1beeba4fcecb28d26523d5bfa53c6c1&per_page=" +
        this.state.total +
        "&query=" +
        this.state.search +
        "&page=" +
        this.state.currenTpage
    )
      .then(res => res.json())
      .then(da => JSON.stringify(da))
      .then(da => JSON.parse(da))
      .then(suc => {
        this.setState({
          photos: suc.results,
          loading: false,
          searching: true,
          total_res: suc.total,
          total_pages: suc.total_pages
        });
      });
  };
  prevSearchPageHadeler = () => {
    fetch(
      "https://api.unsplash.com/search/photos/?client_id=6b7cd9120e470ca44886aaacd7f00c4cb1beeba4fcecb28d26523d5bfa53c6c1&per_page=" +
        this.state.total +
        "&query=" +
        this.state.search +
        "&page=" +
        this.state.currenTpage
    )
      .then(res => res.json())
      .then(da => JSON.stringify(da))
      .then(da => JSON.parse(da))
      .then(suc => {
        this.setState({
          photos: suc.results,
          loading: false,
          searching: true,
          currenTpage: this.state.currenTpage - 1
        });
      });
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  nextSearchPageHadeler = () => {
    fetch(
      "https://api.unsplash.com/search/photos/?client_id=6b7cd9120e470ca44886aaacd7f00c4cb1beeba4fcecb28d26523d5bfa53c6c1&per_page=" +
        this.state.total +
        "&query=" +
        this.state.search +
        "&page=" +
        this.state.currenTpage
    )
      .then(res => res.json())
      .then(da => JSON.stringify(da))
      .then(da => JSON.parse(da))
      .then(suc => {
        this.setState({
          photos: suc.results,
          loading: false,
          searching: true,
          currenTpage: this.state.currenTpage + 1
        });
      });
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  render() {
    let allImages = [];
    this.state.photos.map(photo => {
      allImages.push(
        <div key={photo.id} className="col-lg-3">
          <div className="card mb-5">
            <Link to={"/photos?id=" + photo.id}>
              <img
                src={photo.urls.regular}
                className="img-fluid card-img-top"
                alt={photo.description}
              />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                {photo.user.portfolio_url ? (
                  <span>
                    <a href={photo.user.links.html} target="_blank">
                      <img
                        className="rounded-circle profile-avatar"
                        src={photo.user.profile_image.medium}
                        alt={photo.user.first_name + " " + photo.user.last_name}
                      />
                    </a>
                    <a
                      className="card-link"
                      href={photo.user.portfolio_url}
                      target="_blank"
                    >
                      {photo.user.first_name + " " + photo.user.last_name}
                    </a>
                  </span>
                ) : (
                  <span className="title-without-link">
                    <a href={photo.user.links.html} target="_blank">
                      <img
                        className="rounded-circle profile-avatar"
                        src={photo.user.profile_image.medium}
                        alt={photo.user.first_name + " " + photo.user.last_name}
                      />
                    </a>
                    {photo.user.first_name + " " + photo.user.last_name}
                  </span>
                )}
              </h5>
              {photo.user.bio && <p>{photo.user.bio}</p>}
              <p className="card-text">
                <small className="text-muted">
                  <strong>Total Photos</strong> {photo.user.total_photos},
                  <strong>Total Likes</strong> {photo.user.total_likes}
                </small>
              </p>
              <a
                href={photo.links.download}
                target="_blank"
                className="btn btn-primary"
              >
                Download Now
              </a>
            </div>
          </div>
        </div>
      );
      return photo;
    });
    return (
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <form
                autoComplete="off"
                method="GET"
                className="mb-5"
                onSubmit={this.submitHandel}
              >
                <input
                  placeholder="Search"
                  className="form-control mb-1"
                  type="text"
                  name="search"
                  value={this.state.search}
                  onChange={this.changeHandel}
                />
                <button className="btn btn-primary">Search</button>
              </form>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              {this.state.searching && (
                <p className="p-3 mb-5 bg-primary text-white">
                  <span className="pr-5">
                    <strong>Total Result - </strong>
                    {this.state.total_res}
                  </span>
                  <span>
                    <strong>Total Pages - </strong>
                    {this.state.total_pages}
                  </span>
                </p>
              )}
            </div>
          </div>
          <div className="row">
            {this.state.loading ? (
              <div className="preloader">loading....</div>
            ) : (
              allImages
            )}
          </div>
          <div className="row">
            <div className="col-lg-12 text-center">
              {this.state.searching ? (
                this.state.total_res > 0 && (
                  <div className="btn-group">
                    <button
                      disabled={this.state.currenTpage <= 1 ? "disabled" : ""}
                      onClick={this.prevSearchPageHadeler}
                      className="btn btn-secondary"
                    >
                      Prev
                    </button>
                    <button
                      disabled={
                        this.state.total_pages === this.state.currenTpage
                          ? "disabled"
                          : ""
                      }
                      onClick={this.nextSearchPageHadeler}
                      className="btn btn-primary"
                    >
                      Next Page {this.state.currenTpage + 1}
                    </button>
                  </div>
                )
              ) : (
                <div className="btn-group">
                  <button
                    disabled={this.state.currenTpage <= 1 ? "disabled" : ""}
                    onClick={this.prevPageHadeler}
                    className="btn btn-secondary"
                  >
                    Prev
                  </button>
                  <button
                    onClick={this.nextPageHadeler}
                    className="btn btn-primary"
                  >
                    Next {this.state.currenTpage + 1}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
}
