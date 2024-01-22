FROM node:latest

LABEL name="Adolfo Alvarado"

LABEL email="adolfo.alvaradocontreras1760@stu.mtec.edu"

LABEL cohort="17"

LABEL animal="I forgot the animal"

LABEL discription="an application will help users keep track of their golf games with the use of some api's that will load the necessary information for the course users may be playing on"

WORKDIR /app

COPY . .

EXPOSE 5000 8080

RUN npm install