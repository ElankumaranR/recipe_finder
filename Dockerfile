# Use Node.js image
FROM node:16-alpine

# Install concurrently to run frontend and backend at the same time
RUN npm install -g concurrently

# Set up the working directory for frontend
WORKDIR /app

# Copy frontend code and install dependencies
COPY ./frontend/package.json ./frontend/package-lock.json ./frontend/
RUN cd frontend && npm install

# Set up the working directory for backend
COPY ./backend/package.json ./backend/package-lock.json ./backend/
RUN cd backend && npm install

# Copy the rest of the code
COPY ./frontend ./frontend
COPY ./backend ./backend

# Expose ports for frontend and backend
EXPOSE 3000
EXPOSE 5000

# Use concurrently to start both frontend and backend
CMD concurrently "npm run start --prefix ./frontend" "npm run start --prefix ./backend"
