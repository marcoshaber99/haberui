import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const RATE_LIMIT = 5;

export async function GET(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const key = `sentiment_analysis:${ip}`;

  const attempts = (await redis.get<number>(key)) || 0;

  return NextResponse.json({
    attemptsLeft: Math.max(0, RATE_LIMIT - attempts),
    isRandom: attempts > RATE_LIMIT,
  });
}
