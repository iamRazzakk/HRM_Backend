import app from "./app";
import config from "./config";
import { errorLogger, logger } from "./shared/logger";
import { PrismaClient } from "@prisma/client";
import colors from "colors";
// Initialize Prisma client
const prisma = new PrismaClient();

//uncaught exception
process.on('uncaughtException', error => {
  errorLogger.error('UnhandleException Detected', error);
  process.exit(1);
});

let server: any;

async function main() {
  try {
    // Test Database connection
    await prisma.$connect();
    logger.info(colors.green('🚀 Database connected successfully'));


    const port =
      typeof config.port === 'number' ? config.port : Number(config.port);

    server = app.listen(port, config.ip_address as string, () => {
      logger.info(colors.yellow(`♻️  Application listening on port:${config.port}`));
    });
  } catch (error) {
    errorLogger.error(colors.red('🤢 Failed to connect Database'));
    process.exit(1);
  }

  // Handle unhandled rejections
  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorLogger.error('UnhandleRejection Detected', error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

main();

// SIGTERM (for graceful shutdown)
process.on('SIGTERM', () => {
  logger.info('SIGTERM IS RECEIVED');
  if (server) {
    server.close();
  }
});
