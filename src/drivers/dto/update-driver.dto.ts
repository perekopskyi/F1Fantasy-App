
import { CreateDriverDto } from './create-driver.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateDriverDto extends PartialType(CreateDriverDto) { }
