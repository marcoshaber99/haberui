import { NextResponse } from "next/server";
import OpenAI from "openai";
import { Redis } from "@upstash/redis";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const RATE_LIMIT = 5;
const RATE_LIMIT_TTL = 60 * 60 * 24; // 24 hours in seconds

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const key = `sentiment_analysis:${ip}`;

  // Get and increment attempts atomically
  const attempts = await redis.incr(key);

  // Set expiry on first attempt
  if (attempts === 1) {
    await redis.expire(key, RATE_LIMIT_TTL);
  }

  // Return random sentiment if rate limited
  if (attempts > RATE_LIMIT) {
    // Simulate analysis delay (between 0.5 and 1.5 seconds)
    await new Promise((resolve) =>
      setTimeout(resolve, 500 + Math.random() * 1000)
    );

    return NextResponse.json({
      score: Math.random() * 2 - 1,
      attemptsLeft: 0,
      isRandom: true,
    });
  }

  const { text } = await req.json();

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a sentiment analysis tool. Respond with a number between -1 and 1, where -1 is very negative, 0 is neutral, and 1 is very positive.",
        },
        {
          role: "user",
          content: `Analyze the sentiment of this text: "${text}"`,
        },
      ],
      max_tokens: 5,
    });

    const score = Number.parseFloat(response.choices[0].message.content || "0");

    return NextResponse.json({
      score,
      attemptsLeft: RATE_LIMIT - attempts,
      isRandom: false,
    });
  } catch (error) {
    console.error("OpenAI API error:", error);
    return NextResponse.json(
      { error: "Failed to analyze sentiment" },
      { status: 500 }
    );
  }
}
