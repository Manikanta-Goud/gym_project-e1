# Use official Maven/Java 17 image for the build stage
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copy the pom.xml and source code
COPY pom.xml .
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Use specialized Java 17 runtime for the production stage
FROM eclipse-temurin:17-jre
WORKDIR /app

# Copy the built jar file
COPY --from=build /app/target/*.jar app.jar

# Expose the port your Spring Boot app uses (usually 8080)
EXPOSE 8080

# Run the jar file
ENTRYPOINT ["java", "-jar", "app.jar"]
