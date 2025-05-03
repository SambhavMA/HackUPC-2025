import axios from 'axios';
import qs from 'qs';
import {
  OAUTH2_CLIENT,
  OAUTH2_SECRET,
  OAUTH2_SCOPE,
  OAUTH2_ACCESSTOKEN_URL,
  PRODUCT_SEARCH_URL
} from './credentials.js';

const data = qs.stringify({
  grant_type: 'client_credentials',
  scope: OAUTH2_SCOPE
});

async function getJWT() {
  try {
    const response = await axios.post(OAUTH2_ACCESSTOKEN_URL, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'OpenPlatform/1.0',
      },
      auth: {
        username: OAUTH2_CLIENT,
        password: OAUTH2_SECRET,
      }
    });

    const JWT_TOKEN = response.data.id_token;
    console.log('JWT Token:', JWT_TOKEN);
    return JWT_TOKEN;
  } catch (error) {
    console.error('Token request failed:', error.response?.data || error.message);
    throw error;
  }
}

async function main() {
  const JWT_TOKEN = await getJWT();
  try {
    const imageUrl = "https://m.media-amazon.com/images/I/716rNGyuoqL._AC_SX679_.jpg";
    const url = `${PRODUCT_SEARCH_URL}?image=${encodeURIComponent(imageUrl)}`;

    const response = await axios({
      method: 'get',
      url: url,
      headers: {
        'User-Agent': 'OpenPlatform/1.0',
        'Authorization': `Bearer ${JWT_TOKEN}`,
        'Content-Type': 'application/json',
      }
    });

    console.log('Product search results:', response.data);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
}

main();
