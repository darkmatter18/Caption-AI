FROM python:3.7-slim-stretch

RUN apt-get update && apt-get install -y git python3-dev gcc \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

RUN pip install --upgrade -r requirements.txt

COPY WebBackendEngine /

RUN uvicorn server:app --reload --port 8080

EXPOSE 8080

CMD ["uvicorn", "server:app", "--reload", "--port", "8080"]