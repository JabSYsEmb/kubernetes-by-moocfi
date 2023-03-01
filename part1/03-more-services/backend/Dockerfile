FROM python:alpine3.17

WORKDIR /home/project

COPY ./requirements.txt .

RUN pip install --no-cache-dir --upgrade -r requirements.txt

EXPOSE 9999

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "9999"]
