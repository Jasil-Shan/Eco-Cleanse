# Eco Cleanse - Garbage Management System

## Introduction
Welcome to Eco Cleanse, a project aimed at revolutionizing garbage collection and management. This README provides a quick overview of the project, its features, technology stack, and how to get started.

## Project Overview
Eco Cleanse comprises four main modules: User, Admin, Worker, and Driver. Users can easily request waste collection, and our real-time task assignment system ensures efficient operations, similar to popular food delivery apps.

## Technologies Used

### Frontend:

- **React:** Frontend framework for building the user interface.

- **DaisyUI:** React UI framework for designing consistent and responsive components.

- **Tailwind Css:** Library for rendering PDF documents in React applications.

- **formik:** Form library for handling forms.

- **yup:** Schema validation library for form validation.

### Backend:

- **Node.js:** Backend runtime environment.

- **Express:** Web application framework for Node.js.

- **MongoDB:** NoSQL database for storing user data.

- **JWT (JSON Web Token):** Token-based authentication for securing user sessions.

### Additional Tools:

- **axios:** A powerful HTTP client for making requests to the server. It simplifies the process of sending asynchronous HTTP requests and handling responses.

- **Formik:** A form library for React that helps with the management and validation of form state.

- **Yup:** A JavaScript schema builder for value parsing and validation. It works seamlessly with Formik to ensure data integrity in forms.

- **Mapbox and Leaflet:** These tools combine to provide interactive and customizable maps for driver navigation, enhancing the overall user experience.

- **Socket.io:** A library that enables real-time, bidirectional, and event-based communication. It powers the chat feature, allowing seamless communication   between workers and users.

- **Razorpay:** A payment gateway integration for secure and convenient online payments within the Eco Cleanse platform.

- **DALL-E:** An AI image generation model. It enhances the user experience by providing AI-generated images within the application.

## Key Features
1. User-friendly UI for waste collection requests.
2. Real-time task assignment for efficient operations.
3. Interactive maps for driver navigation.
4. Chat feature connecting workers and users.
5. AI-generated images for an enhanced experience.
6. Seamless online payment integration.

## System Flow
1. Users request waste collection.
2. Real-time task assignment considers worker and driver locations.
3. Drivers receive navigation guidance.
4. Workers will recieve garbage details and payment information to verify
5. Workers and users communicate via the chat feature.
6. Online payments are securely processed.

## Admin Panel
The admin panel allows administrators to manage users, workers, and drivers. It also provides access to garbage reports and the ability to block/unblock users.

## Challenges & Solutions
Encountered challenges during development, such as handling real-time location updates, integrating Razorpay, and implementing AI image generation. Solutions were found through diligent problem-solving.

## Future Enhancements
Looking ahead, I plan to add more features, expand to new regions, and incorporate sustainability initiatives for a greener environment.

## Demo
Explore a live demo showcasing key features, including user requests, real-time task assignment, driver navigation, and the chat feature.

## Getting Started
To run the project locally, follow these steps:

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Run the server with `npm start`.

## Conclusion
Eco Cleanse is more than a project; it's a step towards efficient garbage management and a cleaner environment. We believe technology can make a significant impact on environmental challenges. Thank you for exploring Eco Cleanse!

## Questions
Feel free to reach out with any questions or suggestions. We appreciate your interest in Eco Cleanse!
