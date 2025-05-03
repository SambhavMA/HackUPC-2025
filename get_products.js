import axios from 'axios';
import qs from 'qs';
import OpenAI from 'openai';
import {
  OAUTH2_CLIENT,
  OAUTH2_SECRET,
  OAUTH2_SCOPE,
  OAUTH2_ACCESSTOKEN_URL,
  PRODUCT_SEARCH_URL,
  OPENAI_API_KEY
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
    const imageUrl = "https://classicfella.com/cdn/shop/files/TShirt_White_Trans_0.5x_8537c1fa-10c5-4246-b7fb-55ff5b3a9eb1.png";
    const url = `${PRODUCT_SEARCH_URL}?image=${encodeURIComponent(imageUrl)}`;

    var response = await axios({
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

  var product_names = response.data.map(product => product.name);
  console.log(product_names);

  // Initialize OpenAI client
  const openai = new OpenAI({
    apiKey: OPENAI_API_KEY
  });

  for (const product_name of product_names) {
    const query = "suggest one casual outfit from brands Massimo Duti, Pull & Bear and Zara with " + product_name + " as the main item, brand Zara. Do not output anything else besides the result, which is in the format \"[first item in the fit, second item in the fit, 3rd item in the fit, ...]\", for example: [\"ZW COLLECTION CROP POPLIN SHIRT\", \"Zara white blouse\", \"Zara black shoes\", \"Zara braclet\"]";

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "user", content: query }
        ],
        temperature: 0.7,
      });

      console.log(`\nOutfit suggestion for ${product_name}:`);
      console.log(completion.choices[0].message.content);
    } catch (error) {
      console.error(`Error getting outfit suggestion for ${product_name}:`, error.message);
    }
  }
}

main();

