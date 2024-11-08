const redisClient = require('../config/redis');

const cache = (duration) => {
  return async (req, res, next) => {
    const key = `recipe-api:${req.originalUrl}`;
    
    try {
      const cachedData = await redisClient.get(key);
      if (cachedData) {
        return res.json(JSON.parse(cachedData));
      }
      
      res.sendResponse = res.json;
      res.json = async (body) => {
        await redisClient.setEx(key, duration, JSON.stringify(body));
        res.sendResponse(body);
      };
      next();
    } catch (error) {
      next();
    }
  };
};

module.exports = cache;