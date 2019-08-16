import React from "react";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";

export default class SingleImage extends React.Component {
  state = {
    singleContet: "",
    loading: true
  };

  componentDidMount() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let id = params.get("id");
    axios
      .get(
        `https://api.unsplash.com/photos/${id}/?client_id=6b7cd9120e470ca44886aaacd7f00c4cb1beeba4fcecb28d26523d5bfa53c6c1`
      )
      .then(res => {
        this.setState({
          singleContet: res.data,
          loading: false
        });
      });
  }

  dateConverter = data => {
    let monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    let value = new Date(data),
      date = value.getDate(),
      month = value.getMonth(),
      year = value.getFullYear();

    var dateString = date + "-" + monthNames[month + 1] + "-" + year;
    return dateString;
  };

  render() {
    let photos = this.state.singleContet;
    // console.log(photos);
    let cameraInifo = [];
    photos.exif &&
      Object.entries(photos.exif).forEach(([key, value]) => {
        cameraInifo.push(
          value !== null && (
            <li key={key}>
              <strong>{key.replace("_", " ")} : </strong>
              <span className="text-muted">{value}</span>
            </li>
          )
        );
      });
    let tags = [];
    photos.tags &&
      photos.tags.map(tag => {
        tags.push(
          <a
            className="badge badge-dark"
            key={tag.title}
            target="_blank"
            href={"https://unsplash.com/search/photos/" + tag.title}
          >
            {tag.title}
            {tag.title.length > 1 && ","}
          </a>
        );
        return tag;
      });
    let relatedProducts = [];
    photos.related_collections &&
      photos.related_collections.results.map(result => {
        relatedProducts.push(
          <div key={result.id} className="col-lg-4">
            <div className="card">
              <img
                src={result.cover_photo.urls.regular}
                className="card-img-top"
                alt={result.title}
              />
              <div className="card-body">
                <h5>
                  {result.user.portfolio_url ? (
                    <span>
                      <a href={result.user.links.html} target="_blank">
                        <img
                          className="rounded-circle profile-avatar"
                          src={result.user.profile_image.medium}
                          alt={
                            result.user.first_name + " " + result.user.last_name
                          }
                        />
                      </a>
                      <a
                        className="card-link"
                        href={result.user.portfolio_url}
                        target="_blank"
                      >
                        {result.user.first_name + " " + result.user.last_name}
                      </a>
                    </span>
                  ) : (
                    <span className="title-without-link">
                      <a href={result.user.links.html} target="_blank">
                        <img
                          className="rounded-circle profile-avatar"
                          src={result.user.profile_image.medium}
                          alt={
                            result.user.first_name + " " + result.user.last_name
                          }
                        />
                      </a>
                      {result.user.first_name + " " + result.user.last_name}
                    </span>
                  )}
                </h5>
                {result.user.bio && <p>{result.user.bio}</p>}
              </div>
            </div>
          </div>
        );

        return result;
      });
    return (
      <section className="single-photo-area pb-5">
        <div className="py-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                {photos.urls &&
                  (photos.links && (
                    <a target="_blank" href={photos.links.html}>
                      <img
                        src={photos.urls.full}
                        className="img-fluid"
                        alt={photos.description && photos.description}
                      />
                    </a>
                  ))}
              </div>
              <div className="col-lg-4">
                {photos.user && (
                  <img
                    src={photos.user.profile_image.large}
                    className="img-fluid rounded-circle"
                    alt={photos.user && photos.user.first_name}
                  />
                )}
                <h1>
                  {photos.user && photos.user.first_name}{" "}
                  {photos.user && photos.user.last_name}
                </h1>
                <ul className="user-camera-info">{cameraInifo}</ul>

                {photos.user && (
                  <ul className="user-info-list">
                    {photos.user.bio !== null ? (
                      <li>
                        <strong>Bio : </strong>
                        <span className="text-muted">{photos.user.bio}</span>
                      </li>
                    ) : (
                      ""
                    )}
                    <li>
                      <strong>Unsplash Account : </strong>
                      <span className="text-muted">
                        <a target="_blank" href={photos.user.links.html}>
                          {photos.user.links.html}
                        </a>
                      </span>
                    </li>
                    {photos.user.location !== null ? (
                      <li>
                        <strong>Location : </strong>
                        <span className="text-muted">
                          {photos.user.location}
                        </span>
                      </li>
                    ) : (
                      ""
                    )}
                    {photos.user.total_photos !== null ? (
                      <li>
                        <strong>Total Photos : </strong>
                        <span className="text-muted">
                          {photos.user.total_photos}
                        </span>
                      </li>
                    ) : (
                      ""
                    )}
                    {photos.user.total_likes !== null ? (
                      <li>
                        <strong>Total Likes : </strong>
                        <span className="text-muted">
                          {photos.user.total_likes}
                        </span>
                      </li>
                    ) : (
                      ""
                    )}
                    {photos.user.total_collections !== null ? (
                      <li>
                        <strong>Total Collections : </strong>
                        <span className="text-muted">
                          {photos.user.total_collections}
                        </span>
                      </li>
                    ) : (
                      ""
                    )}
                    {photos.user.portfolio_url !== null ? (
                      <li>
                        <strong>Portfolio Url : </strong>
                        <span className="text-muted">
                          <a target="_blank" href={photos.user.portfolio_url}>
                            {photos.user.portfolio_url}
                          </a>
                        </span>
                      </li>
                    ) : (
                      ""
                    )}
                    {photos.user.twitter_username !== null ? (
                      <li>
                        <strong>Twitter : </strong>
                        <span className="text-muted">
                          {photos.user.twitter_username.indexOf(
                            "https://twitter.com/"
                          ) !== -1 ? (
                            <a
                              target="_blank"
                              href={
                                "https://twitter.com/" +
                                photos.user.twitter_username.split("/")[2]
                              }
                            >
                              {photos.user.twitter_username.indexOf("/") !== -1
                                ? photos.user.twitter_username.split("/")[2]
                                : photos.user.twitter_username}
                            </a>
                          ) : (
                            <a
                              target="_blank"
                              href={
                                "https://twitter.com/" +
                                photos.user.twitter_username
                              }
                            >
                              {photos.user.twitter_username}
                            </a>
                          )}
                        </span>
                      </li>
                    ) : (
                      ""
                    )}
                    {photos.user.instagram_username !== null ? (
                      <li>
                        <strong>Instagram : </strong>
                        <span className="text-muted">
                          {photos.user.instagram_username.indexOf(
                            "https://www.instagram.com/"
                          ) !== -1 ? (
                            <a
                              target="_blank"
                              href={
                                "https://www.instagram.com/" +
                                photos.user.instagram_username.split("/")[3]
                              }
                            >
                              {photos.user.instagram_username.indexOf("/") !==
                              -1
                                ? photos.user.instagram_username.split("/")[3]
                                : photos.user.instagram_username}
                            </a>
                          ) : (
                            <a
                              target="_blank"
                              href={
                                "https://www.instagram.com/" +
                                photos.user.instagram_username
                              }
                            >
                              {photos.user.instagram_username}
                            </a>
                          )}
                        </span>
                      </li>
                    ) : (
                      ""
                    )}
                  </ul>
                )}
                <ul className="user-info-list">
                  {photos.description && photos.description !== null ? (
                    <li>
                      <strong>Description : </strong>
                      <span className="text-muted">{photos.description}</span>
                    </li>
                  ) : (
                    ""
                  )}
                  {photos.created_at && photos.description !== null ? (
                    <li>
                      <strong>Created : </strong>
                      <span className="text-muted">
                        {this.dateConverter(photos.created_at)}
                      </span>
                    </li>
                  ) : (
                    ""
                  )}
                  {photos.updated_at && (
                    <li>
                      <strong>Last Update : </strong>
                      <span className="text-muted">
                        {this.dateConverter(photos.updated_at)}
                      </span>
                    </li>
                  )}
                  {photos.likes && photos.likes !== null ? (
                    <li>
                      <strong>Likes : </strong>
                      <span className="text-muted">{photos.likes}</span>
                    </li>
                  ) : (
                    ""
                  )}
                  {photos.views && photos.views !== null ? (
                    <li>
                      <strong>Total Views : </strong>
                      <span className="text-muted">{photos.views}</span>
                    </li>
                  ) : (
                    ""
                  )}
                  {photos.downloads && photos.downloads !== null ? (
                    <li>
                      <strong>Downloads : </strong>
                      <span className="text-muted">{photos.downloads}</span>
                    </li>
                  ) : (
                    ""
                  )}
                </ul>
                <div className="tag-wraper">
                  {photos.tags && photos.tags.length > 1 ? (
                    <strong>Tags : </strong>
                  ) : (
                    <strong>Tag : </strong>
                  )}
                  {tags}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title mb-5 text-center">
                <h2>Related Products</h2>
              </div>
            </div>
            {relatedProducts}
          </div>
        </div>
      </section>
    );
  }
}
