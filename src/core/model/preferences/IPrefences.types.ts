export interface IPreferences {
    communicationMethod: 'email' | 'sms' | 'phone';  // Preferred communication method
    theme: 'light' | 'dark';                        // Preferred theme
    notificationPreferences: {
        orderUpdates: boolean;                       // Notify customer about order updates
        promotions: boolean;                         // Notify customer about promotions
        reminders: boolean;                     // Notify customer about reminders for appointments
    }
}