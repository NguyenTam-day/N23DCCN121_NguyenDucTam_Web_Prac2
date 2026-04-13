const { PrismaClient } = require("@prisma/client");
const { Pool } = require("pg");
const { PrismaPg } = require("@prisma/adapter-pg");

// tạo pool (connection pooling)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// tạo adapter
const adapter = new PrismaPg(pool);

// khởi tạo prisma client với adapter
const prisma = new PrismaClient({
  adapter,
});

module.exports = prisma;