export default {
  API_ENDPOINT:
    process.env.NODE_ENV === "production"
      ? `http://localhost:8000/api`
      : // ? `https://shielded-woodland-46596.herokuapp.com/api`
        `http://localhost:8000/api`,
};
