
import { Customer } from './customer.model'; // import the Customer model (adjust the path)

declare module 'express-session' {
    interface SessionData {
        user: Customer;  // Assuming 'Customer' is the type of your user object
    }
}