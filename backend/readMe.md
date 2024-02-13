# inventoTrack_backend

`inventoTrack_backend` is a backend service designed to manage and track inventory. It's built with Node.js and packaged in a Docker container for easy deployment and scalability. The service exposes an API on port 7001, allowing for interaction with the inventory data.

## Installation

### Docker Setup

1. Install [Docker](https://www.docker.com/get-started) on your machine.

2. Pull the Docker image from Docker Hub:

```bash
docker pull pulaksarmah/inventotrack_backend:1
```

3. Run the Docker container:

```bash
docker run -p 7001:7001 pulaksarmah/inventotrack_backend:1
```

## Docker Compose Setup

1. clone the repository and navigate to the root directory of the project.

2. Run the following command to start the service:

```bash
docker-compose up --build
```

## Manual Setup

1. Install [Node.js](https://nodejs.org/en/download/) on your machine.

2. Clone the repository and navigate to the root directory of the project.

3. Install the dependencies:

```bash
npm install
```

4. Start the service:

```bash
npm start
```

## Usage

Onece the server is running, you can interact with the API on `http://localhost:7001`.

### API Endpoints

The API endpoints can be tested using a postman collection. you can access the collection [here](https://www.postman.com/gold-water-240561/workspace/public-apis/request/14836883-a76baab8-68f8-431c-8113-833110b68297?tab=body)
