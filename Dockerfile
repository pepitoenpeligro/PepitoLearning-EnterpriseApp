# docker build --no-cache -t pepitoenpeligro/dss-p4 .
FROM tomcat:8.5.61-jdk11-openjdk

COPY . .

RUN mvn clean compile package

CMD sh
