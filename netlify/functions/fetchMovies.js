const axios = require('axios');

exports.handler = async (event, context) => {
  const { endpoint, page = 1, query, genre } = event.queryStringParameters || {};

  const apiKey = process.env.TMDB_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'API key not configured' }),
    };
  }

  let url;
  const baseUrl = 'https://api.themoviedb.org/3/movie';
  const discoverUrl = 'https://api.themoviedb.org/3/discover/movie';

  switch (endpoint) {
    case 'popular':
      url = `${baseUrl}/popular?api_key=${apiKey}&language=en-US&page=${page}`;
      break;
    case 'now_playing':
      url = `${baseUrl}/now_playing?api_key=${apiKey}&language=en-US&page=${page}`;
      break;
    case 'upcoming':
      url = `${baseUrl}/upcoming?api_key=${apiKey}&language=en-US&page=${page}&region=US`;
      break;
    case 'top_rated':
      url = `${baseUrl}/top_rated?api_key=${apiKey}&language=en-US&page=${page}`;
      break;
    case 'search':
      if (!query) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Query parameter required for search' }),
        };
      }
      url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${encodeURIComponent(query)}&page=${page}&include_adult=false`;
      break;
    case 'discover':
      if (!genre) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Genre parameter required for discover' }),
        };
      }
      url = `${discoverUrl}?api_key=${apiKey}&language=en-US&sort_by=revenue.desc&include_adult=false&include_video=false&with_genres=${genre}&with_watch_monetization_types=flatrate`;
      break;
    default:
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid endpoint' }),
      };
  }

  try {
    const response = await axios.get(url);
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      },
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error('Error fetching from TMDB:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data' }),
    };
  }
};