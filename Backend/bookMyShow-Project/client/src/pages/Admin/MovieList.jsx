import React from 'react'
import {Table} from "antd";
function MovieList() {
  const latestMovies = [
    {
      key: "1",
      poster: "https://example.com/poster1.jpg",
      title: "Dune: Part Two",
      description: "Paul Atreides unites with the Fremen to wage war against House Harkonnen.",
      duration: 166,
      genre: "Sci-Fi",
      language: "English",
      releaseDate: "2024-03-01",
    },
    {
      key: "2",
      poster: "https://example.com/poster2.jpg",
      title: "The Fall Guy",
      description: "A stuntman gets embroiled in a conspiracy surrounding a missing movie star.",
      duration: 126,
      genre: "Action",
      language: "English",
      releaseDate: "2024-05-03",
    },
    {
      key: "3",
      poster: "https://example.com/poster3.jpg",
      title: "Kalki 2898 AD",
      description: "A dystopian sci-fi epic set in a post-apocalyptic future.",
      duration: 182,
      genre: "Sci-Fi",
      language: "Hindi",
      releaseDate: "2024-05-09",
    }
  ];

  const columns = [
    {
      "title": "Poster",
      "dataIndex": "poster",
      "render": (url) => <img src={url} alt="movie poster" width={50}/>
    },
    {
      "title": "Movie Name",
      "dataIndex": "title",
    },
    {
      "title": "Description",
      "dataIndex": "description",
    },
    {
      "title": "Duration (mins)",
      "dataIndex": "duration",
    },
    {
      "title": "Genre",
      "dataIndex": "genre",
    },
    {
      "title": "Language",
      "dataIndex": "language",
    },
    {
      "title": "Release Date",
      "dataIndex": "releaseDate",
    },
    {
      "title":"Action",
      "render": () => <a>Delete</a>
    }
  ]

  return (
    <div>
        <Table columns={columns} dataSource={latestMovies} />
    </div>
  )
}

export default MovieList