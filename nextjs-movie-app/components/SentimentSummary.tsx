import React from 'react';

interface SentimentSummaryProps {
  sentiment: string;
  summary: string;
}

const SentimentSummary: React.FC<SentimentSummaryProps> = ({ sentiment, summary }) => {
  return (
    <div className="sentiment-summary">
      <h2>Audience Sentiment Summary</h2>
      <p>{summary}</p>
      <h3>Overall Sentiment Classification: {sentiment}</h3>
    </div>
  );
};

export default SentimentSummary;