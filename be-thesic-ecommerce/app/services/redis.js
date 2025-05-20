const { createClient } = require('redis');
const config = require('../../app/config/index'
)

class RedisService {
  static instance = null;
  client;
  retries = 5;
  isConnected = false;

  constructor() {
    if (!RedisService.instance) {
      this.client = createClient({
        url:  config?.redis?.url|| 'redis://localhost:6380', 
      });

      this.client.on('error', (err) => {
        console.error('Redis connection error:', err);
      });

      this.connectWithRetry();

      RedisService.instance = this;
    }

    return RedisService.instance;
  }

  async connectWithRetry(delay = 2000) {
    try {
      await this.client.connect();
      this.isConnected = true;
      console.log('Connected to Redis');
    } catch (err) {
      console.error(`Failed to connect to Redis. Retries left: ${retries}`, err);
      if (retries > 0) {
        retries -= 1
        setTimeout(() => this.connectWithRetry(delay), delay);
      } else {
        console.error('Unable to establish Redis connection after multiple retries.');
      }
    }
  }

  // Set a value with an optional expiration time
  async set(key, value, expiration) {
    try {
      if (!this.isConnected) return null
      if (expiration) {
        await this.client.set(key, value, { EX: expiration });
      } else {
        await this.client.set(key, value);
      }
    } catch (error) {
      return null
    }
   
  }

  // Get a value by key
  async get(key) {
    try {
      if (!this.isConnected) return null
      return await this.client.get(key);
    } catch (error) {
      return null
    }
   
  }

  // Delete a key
  async delete(key) {
    try {
      if (!this.isConnected) return null
    await this.client.del(key);
    } catch (error) {
      return null
    }
    
  }

  // Check if a key exists
  async exists(key) {
    try {
      if (!this.isConnected) return null
      const result = await this.client.exists(key);
      return result === 1;
    } catch (error) {
      return null
    }
  
  }

  // Set a key only if it does not already exist
  async setIfNotExists(key, value) {
    try {
      if (!this.isConnected) return null
      const result = await this.client.setNX(key, value);
      return result === 1;
    } catch (error) {
      return null
    }
  
  }

  // Set expiration on a key
  async expire(key, seconds) {
    try {
      if (!this.isConnected) return null
      const result = await this.client.expire(key, seconds);
      return result === 1;
    } catch (error) {
      return null
    }
   
  }

  // Redis should only be closed when the application is shutting down
  async close() {
    if (this.client) {
      console.log('Closing Redis connection...');
      await this.client.quit();
    }
  }
}

// Graceful shutdown on exit
process.on('SIGINT', async () => {
  const redisService = RedisService.instance;
  if (redisService) {
    await redisService.close();
  }
  process.exit(0);
});

module.exports = new RedisService();

