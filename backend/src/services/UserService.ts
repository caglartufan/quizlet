import UserDAO from '../DAO/UserDAO';
import UserDTO from '../DTO/UserDTO';
import ERRORS from '../messages/errors';
import FIELDS from '../messages/fields';
import { TransformedError } from '../utils/RequestBodyValidator';
import { BadRequestError } from '../utils/ErrorHandler';

export default class UserService {
    private static instance: UserService;

    static getInstance() {
        if (!this.instance) {
            this.instance = new UserService();
        }

        return this.instance;
    }

    async signUpUser(userDTO: UserDTO) {
        // Check if the given username or email is already in use and throw appropriate BadRequestError
        // with generated errors if there's a duplicate value
        const transformedError: TransformedError = {};
        const alreadyExistingUserWithGivenEmail = await UserDAO.findUserWithGivenEmail(userDTO.email);

        if(alreadyExistingUserWithGivenEmail?.email === userDTO.email) {
            transformedError['email'] = FIELDS.email['unique'];
        }

        if(Object.keys(transformedError).length > 0) {
            throw new BadRequestError(ERRORS.invalidUserInputPleaseTryAgain, transformedError);
        }

        const user = await UserDAO.createUser(userDTO);

        return user;
    }

    private constructor() {}
}
