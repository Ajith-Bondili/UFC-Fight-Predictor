# backend/Dockerfile
FROM python:3.11-slim

# 1. set working dir
WORKDIR /app

# 2. copy and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 3. copy the backend sources
COPY . .

# 4. expose and run
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
