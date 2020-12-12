# docker build --no-cache -t pepitoenpeligro/dss-p4 .
# docker build -t pepitoenpeligro/dss-p4 .
# docker run -it pepitoenpeligro/dss-p4
FROM tomcat:8.5.61-jdk11-openjdk



RUN mkdir -p /app
RUN apt-get update
RUN apt-get install maven -y

COPY . /app

WORKDIR /app
RUN mvn clean compile package
RUN cp /app/target/jpacruc.war /usr/local/tomcat/webapps/
WORKDIR /usr/local/tomcat/bin


EXPOSE 8080

CMD ./catalina.sh run
