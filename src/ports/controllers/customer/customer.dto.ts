import { IsString, IsEmail, IsOptional, IsEnum, IsMongoId } from 'class-validator';


import { Role } from '../../../Role';



export class CreateCustomerDTO {
    @IsString()
    name!: string;

    @IsString()
    @IsOptional()
    passwordHash?: string;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsEnum(Role)
    role?: Role;

    @IsOptional()
    metadata?: {
        googleId?: string;
        facebookId?: string;
        phoneVerified?: boolean;
        emailVerified?: boolean;
        provider: 'google' | 'facebook' | 'phone' | 'local';
        profileImageUrl?: string;
    };

    @IsOptional()
    preferences?: {
        communicationMethod?: 'email' | 'sms' | 'phone';
        theme?: 'light' | 'dark';
        notificationPreferences?: {
            orderUpdates?: boolean;
            promotions?: boolean;
            reminders?: boolean;
        };
    };

    @IsOptional()
    @IsMongoId()
    orders?: string[];  // Array of order IDs associated with the customer
}

// DTO for updating an existing customer
export class UpdateCustomerDTO {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    passwordHash?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsEnum(Role)
    role?: Role;

    @IsOptional()
    metadata?: {
        googleId?: string;
        facebookId?: string;
        phoneVerified?: boolean;
        emailVerified?: boolean;
        provider?: 'google' | 'facebook' | 'phone' | 'local';
        profileImageUrl?: string;
    };

    @IsOptional()
    preferences?: {
        communicationMethod?: 'email' | 'sms' | 'phone';
        theme?: 'light' | 'dark';
        notificationPreferences?: {
            orderUpdates?: boolean;
            promotions?: boolean;
            reminders?: boolean;
        };
    };

    @IsOptional()
    @IsMongoId()
    orders?: string[];
}
