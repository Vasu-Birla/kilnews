import React from "react";

const NewsListItem = ({ news, onClick }) => {
  return (
    <div
      className="d-flex py-3 border-bottom"
      style={{ cursor: "pointer" }}
      onClick={() => onClick(news._id)}
    >
      {/* Image Section */}
      <div className="flex-shrink-0 me-3">
        <img
          src={news.image || "https://via.placeholder.com/120x80?text=No+Image"}
          alt={news.title}
          style={{
            width: "120px",
            height: "80px",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
      </div>

      {/* Content Section */}
      <div className="d-flex flex-column">
        <h6 className="mb-1" style={{ lineHeight: "1.4" }}>
          {news.title}
        </h6>
        <p className="text-muted small mb-1">
          {new Date(news.createdAt).toLocaleString()}
        </p>
        {news.authorName && (
          <p className="text-muted small mb-1">लेखक: {news.authorName}</p>
        )}
      </div>
    </div>
  );
};

export default NewsListItem;
