import React from "react";
import placeholderImage from "../../assets/placeholder.jpg";

const NewsList = ({ newsData, onNewsClick }) => {
  if (!newsData || newsData.length === 0) {
    return <p>कोई खबर उपलब्ध नहीं है।</p>;
  }

  return (
    <div className="mt-3">
      {newsData.map((news) => (
        <div
          className="d-flex py-3 border-bottom"
          key={news._id}
          style={{ cursor: "pointer" }}
          onClick={() => onNewsClick(news._id)}
        >
          <img
            src={news?.image || placeholderImage}
            alt={news?.title || "news"}
            onError={(e) => (e.currentTarget.src = placeholderImage)}
            style={{ width: "120px", height: "80px", objectFit: "cover", borderRadius: "8px" }}
            className="me-3"
          />
          <div>
            <h6 className="mb-1">{news?.title}</h6>
            <p className="text-muted small mb-1">
              {new Date(news?.createdAt).toLocaleString()}
            </p>
            {news?.authorName && (
              <p className="text-muted small mb-0">लेखक: {news.authorName}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsList;
