import { IsString } from "class-validator";

export class CreateFaqDTO {
  @IsString()
  question!: string;
  @IsString()
  answer!: string;
}

// DTO for updating an existing faq
export class UpdateFaqDTO {
  @IsString()
  question!: string;
  @IsString()
  answer!: string;
}
