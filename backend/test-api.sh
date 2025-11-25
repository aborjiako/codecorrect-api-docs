#!/bin/bash
# Quick API testing script

BASE_URL="https://backend-gilm75uds-bryant-orjiakois-projects.vercel.app"

echo "🧪 Testing EduFlow API"
echo "======================"
echo ""

echo "1️⃣ Testing /api/version endpoint:"
curl -s "$BASE_URL/api/version" | jq . || curl -s "$BASE_URL/api/version"
echo ""
echo ""

echo "2️⃣ Testing /health endpoint:"
curl -s "$BASE_URL/health" | jq . || curl -s "$BASE_URL/health"
echo ""
echo ""

echo "3️⃣ Testing /api/courses endpoint (should require auth):"
curl -s -w "\nHTTP Status: %{http_code}\n" "$BASE_URL/api/courses"
echo ""
echo ""

echo "✅ Test complete!"

