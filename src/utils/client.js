import  sanityClient from "@sanity/client";

export default sanityClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2021-10-21', // use current UTC date - see "specifying API version"!
  token: process.env.REACT_APP_SANITY_TOKEN, // or leave blank for unauthenticated usage
  useCdn: false, // `false` if you want to ensure fresh data
  ignoreBrowserTokenWarning: true,
});
