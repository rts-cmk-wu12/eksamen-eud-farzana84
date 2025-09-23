export default function fetchErrors(response) {
    if (!response.ok) {
      switch (response.status) {
        case 400:
          throw new Error("Bad request");
        case 401:
          throw new Error("Unauthorized , please log in again");
        case 403:
          throw new Error("Forbidden , you have no access");
        case 404:
          throw new Error("Not found, resource does not exist");
        case 500:
          throw new Error("Server error, please try again later");
        default:
          throw new Error(`Request failed with status ${response.status}`);
      }
    }
  }