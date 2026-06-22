

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image, Spinner, Button, Card } from "react-bootstrap";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { getTrendingTopic, getNewsById } from "../../../Services/authApi";
import { useNavigate } from "react-router-dom";

const CombinedSportsAndTrending = () => {
  const [matches, setMatches] = useState([]);
  const [loadingMatches, setLoadingMatches] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [activeTab, setActiveTab] = useState("live");
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [isLoadingTrending, setIsLoadingTrending] = useState(true);

  const navigate = useNavigate();

  // Team score formatter
  // const getFormattedTeamScore = (teamName, matchScores) => {
  //   let score = "-To Play";
  //   let overs = "";

  //   if (!matchScores || matchScores.length === 0) return { score, overs };

  //   let teamScoreEntry = null;
  //   for (let i = matchScores.length - 1; i >= 0; i--) {
  //     const s = matchScores[i];
  //     if (s.inning && s.inning.toLowerCase().includes(teamName.toLowerCase())) {
  //       teamScoreEntry = s;
  //       break;
  //     }
  //   }

  //   if (teamScoreEntry) {
  //     if (teamScoreEntry.r !== undefined && teamScoreEntry.w !== undefined) {
  //       score = `${teamScoreEntry.r}/${teamScoreEntry.w}`;
  //       overs = teamScoreEntry.o ? `(${teamScoreEntry.o} ov)` : "";
  //     } else if (teamScoreEntry.r) {
  //       score = `${teamScoreEntry.r}`;
  //     }
  //   }
  //   return { score, overs };
  // };


  const getFormattedTeamScore = (teamName = "", matchScores = []) => {
  let score = "- To Play";
  let overs = "";

  if (!teamName || !Array.isArray(matchScores) || matchScores.length === 0) {
    return { score, overs };
  }

  let teamScoreEntry = null;

  for (let i = matchScores.length - 1; i >= 0; i--) {
    const s = matchScores[i];

    if (
      s?.inning &&
      typeof s.inning === "string" &&
      s.inning.toLowerCase().includes(teamName.toLowerCase())
    ) {
      teamScoreEntry = s;
      break;
    }
  }

  if (teamScoreEntry) {
    if (teamScoreEntry.r !== undefined && teamScoreEntry.w !== undefined) {
      score = `${teamScoreEntry.r}/${teamScoreEntry.w}`;
      overs = teamScoreEntry.o ? `(${teamScoreEntry.o} ov)` : "";
    } else if (teamScoreEntry.r !== undefined) {
      score = `${teamScoreEntry.r}`;
    }
  }

  return { score, overs };
};


  // Fetch Trending Topics
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await getTrendingTopic();
        if (res.success) {
          setTrendingTopics(res.data);
        }
      } catch (err) {
        console.error("Trending fetch error:", err);
      } finally {
        setIsLoadingTrending(false);
      }
    };
    fetchTrending();
  }, []);

  // Fetch Matches
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await fetch(
          "https://api.cricapi.com/v1/currentMatches?apikey=3a2d36c8-c02e-4e70-9c78-04b2e8ada6cd&offset=0"
        );
        const data = await res.json();
        if (data.status === "success") setMatches(data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingMatches(false);
      }
    };
    fetchMatches();
  }, []);

  // Auto Slide
  useEffect(() => {
    if (matches.length > 1 && activeTab === "live") {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % matches.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [matches, activeTab]);

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % matches.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + matches.length) % matches.length);

  const currentMatch = matches[currentIndex];

  // Handle Trending Topic Click with slug
  const handleTopicClick = (topic) => {
    if (!topic.news || topic.news.length === 0) {
      alert("No news linked for this topic");
      return;
    }

    // Use the slug of the first news in the topic
    const firstNewsSlug = topic.news[0]?.slug_en;
    if (!firstNewsSlug) {
      alert("Slug not found for this topic");
      return;
    }

    // Navigate using slug
    navigate(`/news/${firstNewsSlug}`, { state: { topicName: topic.name } });
  };

  return (
    <Container className="py-4">

      {/* Trending Topics */}
      <div className="mb-3">
        <div className="d-flex align-items-center mb-3">
          <div
            style={{
              width: "3px",
              height: "16px",
              backgroundColor: "#C00000",
              marginRight: "8px",
            }}
          />
          <h4
            className="fw-bold m-0"
            style={{ fontSize: "22px", lineHeight: "1.3", color: "#000" }}
          >
            🔥 Trending Topics
          </h4>
          <div
            style={{
              flex: 1,
              height: "2px",
              backgroundColor: "#C00000",
              marginLeft: "12px",
            }}
          />
        </div>

        <div className="p-2">
          {isLoadingTrending ? (
            <div className="text-center">
              <Spinner animation="border" size="sm" />
            </div>
          ) : (
            <div className="d-flex flex-wrap gap-2">
              {trendingTopics.length > 0 ? (
                trendingTopics.map((topic) => (
                  <Button
                    key={topic._id}
                    variant="outline-danger"
                    size="sm"
                    className="rounded-pill px-3"
                    onClick={() => handleTopicClick(topic)}
                  >
                    {topic.name}
                  </Button>
                ))
              ) : (
                <p className="text-muted small m-0">

                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Sports Section */}
      <Card className="border-0 shadow-sm mx-auto" style={{ maxWidth: "420px", borderRadius: "12px", overflow: "hidden" }}>
        <div className="d-flex justify-content-around text-white fw-bold small" style={{ background: "#dc3545", padding: "6px 0" }}>
          {["live","upcoming","recent"].map(tab => (
            <div key={tab} onClick={() => setActiveTab(tab)} style={{ cursor: "pointer", borderBottom: activeTab === tab ? "2px solid #fff" : "none", padding: "2px 6px" }}>
              {tab === "live" ? "• Live" : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </div>
          ))}
        </div>

        <Card.Body className="text-center p-3">
          <p className="small text-muted m-0">{currentMatch?.series || "Series"}</p>
          <p className="fw-bold small text-danger mb-2">{currentMatch?.status || "Status"}</p>
          <Row className="align-items-center">
            <Col className="text-center">
              <Image src={currentMatch?.teamInfo?.[0]?.img} roundedCircle width={40} height={40} />
              <h6 className="fw-bold mt-1 small">{currentMatch?.teams?.[0]}</h6>
              <span className="fw-bold">{getFormattedTeamScore(currentMatch?.teams?.[0], currentMatch?.score).score}</span>
              <p className="small text-muted mb-0">{getFormattedTeamScore(currentMatch?.teams?.[0], currentMatch?.score).overs}</p>
            </Col>
            <Col xs="auto">
              <div className="bg-danger text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: "30px", height: "30px", fontSize: "0.75rem" }}>VS</div>
            </Col>
            <Col className="text-center">
              <Image src={currentMatch?.teamInfo?.[1]?.img} roundedCircle width={40} height={40} />
              <h6 className="fw-bold mt-1 small">{currentMatch?.teams?.[1]}</h6>
              <span className="fw-bold">{getFormattedTeamScore(currentMatch?.teams?.[1], currentMatch?.score).score}</span>
              <p className="small text-muted mb-0">{getFormattedTeamScore(currentMatch?.teams?.[1], currentMatch?.score).overs}</p>
            </Col>
          </Row>
          <p className="fw-bold small mt-2 mb-2">
            {currentMatch?.teams?.[0]} - {getFormattedTeamScore(currentMatch?.teams?.[0], currentMatch?.score).score} |{" "}
            <span className="text-danger">{currentMatch?.teams?.[1]} - {getFormattedTeamScore(currentMatch?.teams?.[1], currentMatch?.score).score}</span>
          </p>
          <div className="d-flex justify-content-center gap-3 mt-2">
            <Button variant="outline-danger" size="sm" className="rounded-circle" onClick={handlePrev}><FaArrowLeft /></Button>
            <Button variant="outline-danger" size="sm" className="rounded-circle" onClick={handleNext}><FaArrowRight /></Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CombinedSportsAndTrending;
