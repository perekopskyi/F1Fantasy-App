import { Driver } from '../drivers/entities/driver.entity';
import { SessionEntity } from '../session/session.entity';
import { Team } from '../teams/entities/team.entity';
import { UserEntity } from '../users/entities/user.entity';

const entities = [Driver, Team, UserEntity, SessionEntity];

export { Driver, Team, UserEntity };

export default entities;
