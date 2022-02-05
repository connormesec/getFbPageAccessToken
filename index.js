//This script will generate a page user access token that will never expire, use it to access page data from Facebook pages that you have access to

import axios from "axios";

const appId = "Your App ID here"; //app ID can be found in basic settings at https://developers.facebook.com/apps/
const appSecret = "Your App Secret here"; //app secret can be found in basic settings at https://developers.facebook.com/apps/
const pageId = "Your Page ID here"; //page Id can be found in the url of the page ex. the page ID of https://www.facebook.com/MSUhockey is 'MSUhockey'

//shortLivedUserAccessToken can be retrieved from the graph api explorer, make sure it is a user token and has the following permissions; pages_show_list, pages_read_user_content, and public_profile
const shortLivedUserAccessToken = "Your short lived access token here";

getLongLivedAccessToken().then((longLivedAccessToken) =>
  getPageAccessToken(longLivedAccessToken)
);

async function getLongLivedAccessToken() {
  let url = `https://graph.facebook.com/oauth/access_token?grant_type=fb_exchange_token&client_id=${appId}&client_secret=${appSecret}&fb_exchange_token=${shortLivedUserAccessToken}`;
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  let response = await axios.get(url, { headers }).catch((error) => {
    console.error(error);
  });
  console.log(
    `Your long lived user access token is: ${response.data.access_token}`
  );
  return response.data.access_token;
}

async function getPageAccessToken(longLivedAccessToken) {
  let url = `https://graph.facebook.com/${pageId}?fields=access_token&access_token=${longLivedAccessToken}`;
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  let response = await axios.get(url, { headers }).catch((error) => {
    console.error(error);
  });
  console.log(`Your page access token is: ${response.data.access_token}`);
  return response.data;
}