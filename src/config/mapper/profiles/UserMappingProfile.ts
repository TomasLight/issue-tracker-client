import { UserDto } from "@api/models/users/responses/UserDto";
import { User } from "@app/Users/models/User";
import { IMapFunction } from "@utils/mapping/IMapFunction";
import { IMappingProfile } from "@utils/mapping/IMappingProfile";
import { MapFunction } from "@utils/mapping/MapFunction";
import { MappingProfileBase } from "@utils/mapping/MappingProfileBase";

export class UserMappingProfile extends MappingProfileBase implements IMappingProfile {
    public get(): IMapFunction[] {
        return [
            new MapFunction(
                nameof<UserDto>(),
                nameof<User>(),
                UserMappingProfile.mapUserDtoToUser
            ),
        ];
    }

    private static mapUserDtoToUser(dto: UserDto): User {
        const user = MappingProfileBase.autoMap(dto, new User());
        return user;
    }
}
