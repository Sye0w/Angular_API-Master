# Angular API Master

## Project Description

Angular API Master is a comprehensive Angular application that demonstrates proficiency in working with APIs, including data fetching, error handling, authentication, optimization, and environment configuration. This project is built using Angular v17.3.9 and showcases best practices for building scalable and efficient web applications.

## Key Features

- Interaction with JSONPlaceholder API for CRUD operations on posts and comments
- RxJs for state management internally
- Efficient error handling and user-friendly error messages
- Mock authentication using HTTP interceptors for debugging purpose as well
- Inifinite scrolling to enhance user experience
- Pagination for listing posts (optional)
- Simple caching mechanism for optimizing API requests
- Environment-specific configurations
- Lazy loading for optimized performance
- Advanced caching strategy using IndexedDB
- Unit testing for services and components

## Project Structure

The project follows a modular structure with the following key directories:

- `src/app/components`: Contains all the Angular components
- `src/app/model/services`: Houses the API, error handling, and caching services
- `src/app/interceptors`: Contains the authentication interceptor
- `src/environments`: Includes environment-specific configuration files
- `src/app/directives`: Contains custom directives for lazy loading and inifinite scrolling

## Setup and Run Instructions

1. Ensure you have Node.js (v14 or later) and npm installed on your machine.
2. Clone the repository:
   ```
   git clone https://github.com/Sye0w/Angular_API-Master.git
   cd angular_api-master
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Run the development server:
   ```
   ng serve
   ```
5. Open your browser and navigate to `http://localhost:4200`

## Available npm Scripts

- `npm start`: Starts the development server
- `npm run build`: Builds the project for production
- `npm test`: Runs unit tests using Jest


## Environment Configuration

The project includes environment-specific configuration files:

- `src/environments/env.ts`: Default environment (development)
- `src/environments/env.staging.ts`: Development-specific settings
- `src/environments/env.prod.ts`: Production-specific settings

To run the application with a specific environment:

```
ng serve --configuration=production
```

## Testing

Unit tests are written using Jest. Run the tests using:

```
npm  test
```


 


