import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "sensor",
};

export async function GET(request: NextRequest) {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute(
      "SELECT temperature, humidity, light, timestamp FROM sensor ORDER BY timestamp DESC LIMIT 100"
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json(
      { error: "Failed to fetch sensor data" },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

export async function POST(request: NextRequest) {
  let connection;
  try {
    const body = await request.json();
    const { temperature, humidity, lightIntensity } = body;

    if (
      typeof temperature !== "number" ||
      typeof humidity !== "number" ||
      typeof lightIntensity !== "number"
    ) {
      return NextResponse.json(
        { error: "Invalid data format" },
        { status: 400 }
      );
    }

    connection = await mysql.createConnection(dbConfig);
    const query =
      "INSERT INTO sensor (temperature, humidity, light) VALUES (?, ?, ?)";
    const values = [temperature, humidity, lightIntensity];

    await connection.execute(query, values);

    return NextResponse.json(
      { message: "Data inserted successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Database insert error:", error);
    return NextResponse.json(
      { error: "Failed to insert sensor data" },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}
