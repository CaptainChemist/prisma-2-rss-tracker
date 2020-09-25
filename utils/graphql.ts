import { gql } from '@apollo/client';

export const LIKE_BUNDLE_MUTATION = gql`
  mutation likeBundleMutation($data: LikeBundleInput) {
    likeBundle(data: $data) {
      id
      name
      description
      likes {
        id
        auth0
      }
      feeds {
        id
        name
        url
      }
      tags {
        id
        name
      }
      author {
        id
        auth0
        nickname
      }
    }
  }
`;

export const LIKE_FEED_MUTATION = gql`
  mutation likeFeedMutation($data: LikeFeedInput) {
    likeFeed(data: $data) {
      id
      name
      url
      likes {
        id
        auth0
      }
      bundles {
        id
        name
      }
      tags {
        id
        name
      }
      author {
        id
        auth0
        nickname
      }
    }
  }
`;

export const CREATE_BUNDLE = gql`
  mutation createBundleMutation($data: BundleCreateInput) {
    createBundle(data: $data) {
      id
      description
      tags {
        id
        name
      }
    }
  }
`;

export const CREATE_FEED = gql`
  mutation createFeedMutation($data: FeedCreateInput) {
    createFeed(data: $data) {
      id
    }
  }
`;

export const BUNDLES_QUERY = gql`
  query {
    bundles {
      id
      name
      description
      likes {
        id
        auth0
      }
      feeds {
        id
        name
        url
      }
      tags {
        id
        name
      }
      author {
        id
        auth0
        nickname
        picture
      }
    }
  }
`;

export const FEEDS_QUERY = gql`
  query {
    feeds {
      id
      name
      url
      likes {
        id
        auth0
      }
      tags {
        id
        name
      }
      author {
        id
        nickname
        picture
      }
      bundles {
        id
        name
      }
    }
  }
`;

export const FIND_FEEDS_QUERY = gql`
  query findFeedsQuery($data: FindFeedsInput) {
    findFeeds(data: $data) {
      id
      name
      url
      likes {
        id
        auth0
      }
      tags {
        id
        name
      }
      author {
        id
        nickname
        picture
      }
      bundles {
        id
        name
      }
    }
  }
`;

export const FIND_FEED_TAGS = gql`
  query findFeedTagsQuery($data: FindFeedTagsInput) {
    findFeedTags(data: $data) {
      id
      name
    }
  }
`;

export const FIND_BUNDLE_TAGS = gql`
  query findBundleTagsQuery($data: FindBundleTagsInput) {
    findBundleTags(data: $data) {
      id
      name
    }
  }
`;
