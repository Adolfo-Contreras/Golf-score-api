FROM node:latest

LABEL name="Adolfo Alvarado"

LABEL email="adolfo.alvaradocontreras1760@stu.mtec.edu"

WORKDIR /Golf-score-api

COPY . .

EXPOSE 5000

RUN npm install