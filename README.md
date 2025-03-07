# Elia: AI-Powered GIS Assistant

**Elia** stands for **Enhanced Location Intelligence Assistant**. It is a demonstration project designed to showcase how artificial intelligence, specifically **Google's Gemini LLM**, can be integrated with geospatial technologies like **ArcGIS Server** and **Google Maps** to enhance geospatial workflows.

Elia is more than just a tool—it's an assistant that simplifies complex geospatial data by combining the power of modern AI with intuitive user interaction.

---

## **What is Elia?**

Elia is an application that bridges the gap between GIS (Geographic Information Systems) and AI. It aims to:
- Explore how **Google's Gemini LLM** can function as a geospatial assistant.
- Integrate **ArcGIS Server** to analyze and describe geospatial data layers.
- Provide users with a dynamic interface that visualizes geospatial data on **Google Maps**.

---

# ELIA-UI

This the the front-end of the ELIA application, build on react and javascript. That's right no typescript just be good with your data handling :D

---

## **Setting up your dev environment**
- First make sure you have the azure cli tools: 
    - `https://learn.microsoft.com/en-us/cli/azure/install-azure-cli`
- Then make sure you have docker-hub installed (docker.com)
- clone this repo
- setup the a .env
    ```
    VITE_API_URL="http://127.0.0.1:8000"
    ENV_STATE=global
    DB_NAME=elia-api-db
    DB_HOST=localhost
    DB_PORT=5432 
    DB_SSL=prefer 
    DB_USER=postgres
    DB_PASSWORD=pa55word
    FRONTEND_URL=http://127.0.0.1:8080
    JWT_SECRET=1234secret1234
    ```
- using your azure cli tools login so you can access the container registry
    - `az acr login --name eliaregistry`
- now using the docker-compose to create your database and backend containers
    - `docker-compose up -d`
- the backend is setup, now just run the below to get your front-end env running
    ```
    npm install
    npm run dev
    ```