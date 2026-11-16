import app from './app';
import { config } from './config';

const start = async () => {
  try {
    app.listen(config.port, () => {
      console.log(`🚀 Imperial Tours Qatar API running on port ${config.port}`);
      console.log(`   Environment: ${config.nodeEnv}`);
      console.log(`   Health: http://localhost:${config.port}/api/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

start();
