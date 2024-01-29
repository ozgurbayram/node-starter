import { IsNotEmpty } from "class-validator";

export class CreateAdvertRequest {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  body: string;

  @IsNotEmpty()
  route: {
    depareture: {
      latitude: number;
      longitude: number;
    };
    destination: {
      latitude: number;
      longitude: number;
    };
  };
}
