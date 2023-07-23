import React from "react";

interface Props {
  title?: string;
  date?: string;
  author?: string;
  source?: string;
  content?: string;
  url?: string;
  urlImage?: string;
}

const NewsCard = ({
  title,
  date,
  author,
  source,
  content,
  url,
  urlImage,
}: Props) => {
  return (
    <>
      <div
        className="card shadow-sm border border-primary m-5 d-flex align-items-center"
        style={{ width: "30rem" }}

      >
        <h5 className="card-title">{title}</h5>
        <img
          src={urlImage}
          className="card-img-top "
          alt="..."
          style={{ width: "150px", height: "150px" }}
        />
        <div className="card-body">
          <p>{date}</p>
          <p className="card-text">{author}</p>
          <p className="card-text">{source}</p>
          <p className="card-text">{content}</p>
          <a href={url}>Read More</a>
        </div>
      </div>
    </>
  );
};

export default NewsCard;
